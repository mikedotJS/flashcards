import mongoose from "mongoose";

const uri =
	process.env.MONGODB_URI ?? "";
const clientOptions = {
	serverApi: { version: "1" as const, strict: true, deprecationErrors: true },
};

export const connectDB = async () => {
	try {
		await mongoose.connect(uri, clientOptions);
		console.log("MongoDB connected");
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

const flashcardSchema = new mongoose.Schema({
	question: { type: String, required: true },
	answer: { type: String, required: true },
	interval: { type: Number, required: true, default: 1 },
	repetitions: { type: Number, required: true, default: 0 },
	easeFactor: { type: Number, required: true, default: 2.5 },
	nextReview: { type: Date, required: true, default: Date.now },
	category: { type: String, required: true },
});

export const Flashcard = mongoose.model("Flashcard", flashcardSchema);

export interface IFlashcard {
	question: string;
	answer: string;
	interval: number;
	repetitions: number;
	easeFactor: number;
	nextReview: Date;
	category: string;
}
