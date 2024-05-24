# Flashcard API

This project provides a simple API for managing flashcards, including creating, reviewing, and fetching flashcards. The API is built using the Hono framework and MongoDB for data storage.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Get Due Flashcards](#get-due-flashcards)
  - [Review Flashcard](#review-flashcard)
  - [Get All Flashcards](#get-all-flashcards)
  - [Create Flashcard](#create-flashcard)
  - [Bulk Create Flashcards](#bulk-create-flashcards)
- [Types](#types)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/flashcard-api.git
   cd flashcard-api
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up your MongoDB connection in `src/db.ts`:

   ```typescript
   const uri = "your_mongodb_connection_string";
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

Once the server is running, you can interact with the API using tools like `curl`, `Postman`, or any HTTP client.

## API Endpoints

### Get Due Flashcards

- **URL:** `/flashcards/due`
- **Method:** `GET`
- **Description:** Fetches all flashcards that are due for review.
- **Response:**
  ```json
  [
    {
      "_id": "flashcard_id",
      "question": "What is the capital of France?",
      "answer": "Paris",
      "interval": 1,
      "repetitions": 0,
      "easeFactor": 2.5,
      "nextReview": "2023-10-01T00:00:00.000Z"
    }
  ]
  ```

### Review Flashcard

- **URL:** `/flashcards/review`
- **Method:** `POST`
- **Description:** Reviews a flashcard and updates its scheduling parameters.
- **Request Body:**
  ```json
  {
    "id": "flashcard_id",
    "userAnswer": "Paris"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "flashcard_id",
    "question": "What is the capital of France?",
    "answer": "Paris",
    "interval": 2,
    "repetitions": 1,
    "easeFactor": 2.6,
    "nextReview": "2023-10-02T00:00:00.000Z"
  }
  ```

### Get All Flashcards

- **URL:** `/flashcards`
- **Method:** `GET`
- **Description:** Fetches all flashcards.
- **Response:**
  ```json
  [
    {
      "_id": "flashcard_id",
      "question": "What is the capital of France?",
      "answer": "Paris",
      "interval": 1,
      "repetitions": 0,
      "easeFactor": 2.5,
      "nextReview": "2023-10-01T00:00:00.000Z"
    }
  ]
  ```

### Create Flashcard

- **URL:** `/flashcards`
- **Method:** `POST`
- **Description:** Creates a new flashcard.
- **Request Body:**
  ```json
  {
    "question": "What is the capital of France?",
    "answer": "Paris"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "flashcard_id",
    "question": "What is the capital of France?",
    "answer": "Paris",
    "interval": 1,
    "repetitions": 0,
    "easeFactor": 2.5,
    "nextReview": "2023-10-01T00:00:00.000Z"
  }
  ```

### Bulk Create Flashcards

- **URL:** `/flashcards/bulk`
- **Method:** `POST`
- **Description:** Creates multiple flashcards in bulk.
- **Request Body:**
  ```json
  {
    "flashcards": [
      {
        "question": "What is the capital of France?",
        "answer": "Paris"
      },
      {
        "question": "What is 2 + 2?",
        "answer": "4"
      }
    ]
  }
  ```
- **Response:**

  ```json
  [
    {
      "_id": "flashcard_id_1",
      "question": "What is the capital of France?",
      "answer": "Paris",
      "interval": 1,
      "repetitions": 0,
      "easeFactor": 2.5,
      "nextReview": "2023-10-01T00:00:00.000Z"
    },
    {
      "_id": "flashcard_id_2",
      "question": "What is 2 + 2?",
      "answer": "4",
      "interval": 1,
      "repetitions": 0,
      "easeFactor": 2.5,
      "nextReview": "2023-10-01T00:00:00.000Z"
    }
  ]
  ```

## Types

### Flashcard

A flashcard object has the following structure:

```typescript
interface Flashcard {
  id: string;
  question: string;
  answer: string;
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReview: string;
}
```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please open an issue.
