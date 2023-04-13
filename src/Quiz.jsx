import { Card, CardOverflow, Stack, Typography, Button, Grid } from "@mui/joy";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { increaseScore } from "./redux/slice";

const Quiz = ({ quiz, setQuizDone }) => {
  const [questionNum, setQuestionNum] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const totalQuestions = quiz.questions.length;
  const dispatch = useDispatch();
  const question = quiz.questions[questionNum];

  const questionElement = (
    <Card
      color={correct === 0 ? "neutral" : correct === 1 ? "success" : "danger"}
      variant="soft"
    >
      <CardOverflow
        sx={{
          display: "flex",
          gap: 1.5,
          py: 1.5,
          px: "var(--Card-padding)",
          bgcolor: "background.level1",
        }}
      >
        <Typography level="body5">Question {questionNum + 1}</Typography>
      </CardOverflow>
      <Typography m={2} level="h6">
        {question.question}
      </Typography>
    </Card>
  );

  useEffect(() => {
    if (correct !== 0) {
      setTimeout(() => {
        setCorrect(0);
        if (questionNum < totalQuestions - 1) {
          setQuestionNum(questionNum + 1);
        } else {
          setQuizDone(true);
        }
        setDisabled(false);
      }, 1000);
    }
  }, [correct, questionNum, totalQuestions, setQuizDone]);

  const clickAnswer = (weight) => {
    if (weight > 0) {
      setCorrect(correct + 1);
      dispatch(increaseScore());
    } else {
      setCorrect(correct - 1);
    }
    setDisabled(true);
  };

  const answerArr = question.answers.map((answer) => {
    return (
      <Button
        key={answer.id}
        onClick={() => {
          clickAnswer(answer.weight);
        }}
        disabled={disabled}
      >
        {answer.answer}
      </Button>
    );
  });

  const answerElement = (
    <Card>
      <Stack m={2} spacing={2}>
        {answerArr}
      </Stack>
    </Card>
  );
  return (
    <Grid justifyContent="center" alignItems="center" container>
      <Grid xs={12} md={4}>
        <Stack m={2} spacing={2}>
          <Typography level="h5">{quiz.title}</Typography>
          {questionElement}
          {answerElement}
        </Stack>
      </Grid>
    </Grid>
  );
};
export default Quiz;
