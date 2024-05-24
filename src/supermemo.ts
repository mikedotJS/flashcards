import type { IFlashcard } from "./db";

export class SuperMemo {
	public reviewFlashcard(card: IFlashcard, userAnswer: string): IFlashcard {
		const isCorrect = userAnswer === card.answer;
		const userRating = isCorrect ? 5 : 3;

		if (userRating >= 3) {
			if (card.repetitions === 0) {
				card.interval = 1;
			} else if (card.repetitions === 1) {
				card.interval = 6;
			} else {
				card.interval = Math.round(card.interval * card.easeFactor);
			}
			card.repetitions += 1;
		} else {
			card.interval = 1;
			card.repetitions = 0;
		}

		card.easeFactor = Math.max(
			1.3,
			card.easeFactor + 0.1 - (5 - userRating) * 0.08,
		);
		card.nextReview = new Date();
		card.nextReview.setDate(card.nextReview.getDate() + card.interval);

		return card;
	}
}
