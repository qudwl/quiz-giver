import { openDB } from "idb";

const createDB = () => {
  const db = openDB("quizzes", 1, {
    upgrade(db) {
      const quizzes = db.createObjectStore("quizzes", {
        keyPath: "id",
        autoIncrement: true,
      });
      quizzes.createIndex("id", "id", { unique: true });
      quizzes.createIndex("title", "title", { unique: false });
      quizzes.createIndex("questions", "questions", { unique: false });
      quizzes.createIndex("time", "time", { unique: false });
      quizzes.createIndex("played", "played", {
        unique: false,
        defaultValue: false,
      });
      quizzes.createIndex("score", "score", {
        unique: false,
        defaultValue: -1,
      });
    },
  });
  return db;
};

const startDB = async () => {
  const db = await createDB();
  const tx = await db.transaction("quizzes", "readwrite");
  const store = await tx.objectStore("quizzes");

  const count = await store.count();

  if (count === 0) {
    store.put({
      id: 1,
      title: "Quiz 1",
      questions: [
        {
          id: 1,
          question: "What is the capital of France?",
          answers: [
            { id: 1, answer: "Paris", weight: 1 },
            { id: 2, answer: "London", weight: 0 },
            { id: 3, answer: "Berlin", weight: 0 },
            { id: 4, answer: "Rome", weight: 0 },
          ],
        },
        {
          id: 2,
          question: "What is the capital of Germany?",
          answers: [
            { id: 1, answer: "Paris", weight: 0 },
            { id: 2, answer: "London", weight: 0 },
            { id: 3, answer: "Berlin", weight: 1 },
            { id: 4, answer: "Rome", weight: 0 },
          ],
        },
        {
          id: 3,
          question: "What is the capital of Italy?",
          answers: [
            { id: 1, answer: "Paris", weight: 0 },
            { id: 2, answer: "London", weight: 0 },
            { id: 3, answer: "Berlin", weight: 0 },
            { id: 4, answer: "Rome", weight: 1 },
          ],
        },
      ],
      time: new Date().toISOString(),
    });
  }
};

const returnQuizzes = async () => {
  const db = await createDB();
  const tx = await db.transaction("quizzes", "readonly");
  const store = await tx.objectStore("quizzes");
  const quizzes = await store.getAll();
  return quizzes;
};

const setLastScore = async (id, score) => {
  const db = await createDB();
  const tx = db.transaction("quizzes", "readwrite");
  const store = tx.objectStore("quizzes");

  const quiz = await store.get(id + 1);
  quiz.score = score;
  quiz.played = true;
  await store.put(quiz);
};

export { createDB, startDB, returnQuizzes, setLastScore };
