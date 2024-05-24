import { Hono } from "hono";
import { Flashcard, connectDB } from "./db";
import { SuperMemo } from "./supermemo";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();

connectDB();

const dueFlashcardsRoute = app.get("/flashcards/due", async (c) => {
	const now = new Date();
	const dueFlashcards = await Flashcard.find({ nextReview: { $lte: now } });
	return c.json(dueFlashcards);
});

const reviewFlashcardRoute = app.post(
	"/flashcards/review",
	zValidator(
		"json",
		z.object({
			id: z.string(),
			userAnswer: z.string(),
		}),
	),
	async (c) => {
		const { id, userAnswer } = c.req.valid("json");
		const flashcard = await Flashcard.findById(id);

		if (flashcard) {
			const superMemo = new SuperMemo();
			const updatedCard = superMemo.reviewFlashcard(
				flashcard.toObject(),
				userAnswer,
			);

			flashcard.interval = updatedCard.interval;
			flashcard.repetitions = updatedCard.repetitions;
			flashcard.easeFactor = updatedCard.easeFactor;
			flashcard.nextReview = updatedCard.nextReview;

			await flashcard.save();
			return c.json(flashcard);
		}
	},
);

const getFlashcardsRoute = app.get("/flashcards", async (c) => {
	const flashcards = await Flashcard.find();
	return c.json(flashcards);
});

const createFlashcardRoute = app.post(
	"/flashcards",
	zValidator(
		"json",
		z.object({
			question: z.string(),
			answer: z.string(),
		}),
	),
	async (c) => {
		const { question, answer } = c.req.valid("json");
		const newFlashcard = new Flashcard({ question, answer });
		await newFlashcard.save();
		return c.json(newFlashcard);
	},
);

const bulkCreateFlashcardsRoute = app.post(
	"/flashcards/bulk",
	zValidator(
		"json",
		z.object({
			flashcards: z.array(
				z.object({
					question: z.string(),
					answer: z.string(),
				}),
			),
		}),
	),
	async (c) => {
		const { flashcards } = c.req.valid("json");

		try {
			const insertedFlashcards = await Flashcard.insertMany(flashcards);
			return c.json(insertedFlashcards);
		} catch (error) {
			return c.json(
				{ error: "An error occurred while saving the flashcards" },
				500,
			);
		}
	},
);

export type DueFlashcardsRouteType = typeof dueFlashcardsRoute;
export type ReviewFlashcardRouteType = typeof reviewFlashcardRoute;
export type GetFlashcardsRouteType = typeof getFlashcardsRoute;
export type CreateFlashcardRouteType = typeof createFlashcardRoute;
export type BulkCreateFlashcardsRouteType = typeof bulkCreateFlashcardsRoute;

export default app;
