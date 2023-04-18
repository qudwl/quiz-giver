import { Button, Stack, Typography } from "@mui/joy";
import ScoreCounter from "./ScoreCounter";
import { setLastScore } from "./db";
import { useDispatch, useSelector } from "react-redux";
import { changeQuizState } from "./redux/slice";

const QuizResult = ({ setQuizDone, setQuizNum, quizNum }) => {
  const curScore = useSelector((state) => state.slice.currentScore);
  const dispatch = useDispatch();
  return (
    <Stack alignItems="center" m={2} spacing={2}>
      <Typography level="h4">Quiz Result</Typography>
      <ScoreCounter />
      <Button
        onClick={() => {
          setLastScore(quizNum, curScore).then(() => {
            setQuizDone(false);
            setQuizNum(-1);
            dispatch(
              changeQuizState({ played: true, score: curScore, id: quizNum })
            );
          });
        }}
      >
        Home
      </Button>
    </Stack>
  );
};

export default QuizResult;
