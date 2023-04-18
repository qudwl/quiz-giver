import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider } from "@mui/joy/styles";
import Header from "./Header";
import { useEffect, useState } from "react";
import { returnQuizzes, startDB } from "./db";
import QuizList from "./QuizList";
import Quiz from "./Quiz";
import QuizResult from "./QuizResult";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes } from "./redux/slice";
import { Typography } from "@mui/joy";

const App = () => {
  const quizzes = useSelector((state) => state.slice.quizzes);
  const dispatch = useDispatch();
  const [quizNum, setQuizNum] = useState(-1);
  const [quizDone, setQuizDone] = useState(false);
  useEffect(() => {
    startDB();
    returnQuizzes().then((quizzes) => dispatch(setQuizzes(quizzes)));
  }, []);
  return (
    <CssVarsProvider defaultMode="system">
      <CssBaseline />
      <Header inQuiz={quizNum !== -1} />
      {quizNum === -1 ? (
        <QuizList setQuizNum={setQuizNum} quizzes={quizzes} />
      ) : quizDone ? (
        <QuizResult
          quizNum={quizNum}
          setQuizNum={setQuizNum}
          setQuizDone={setQuizDone}
        />
      ) : (
        <Quiz setQuizDone={setQuizDone} quiz={quizzes[quizNum]} />
      )}
      {quizNum === -1 && (
        <Typography
          sx={{
            position: "fixed",
            bottom: "5px",
            width: "100vw",
            textAlign: "center",
          }}
        >
          {quizzes.length} Quizzes
        </Typography>
      )}
    </CssVarsProvider>
  );
};

export default App;
