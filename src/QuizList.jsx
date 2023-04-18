import {
  Button,
  Card,
  CardOverflow,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import { useDispatch } from "react-redux";
import { resetScore, setTotalQuestions, deleteQuiz } from "./redux/slice";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const QuizList = ({ quizzes, setQuizNum }) => {
  let key = 0;
  const dispatch = useDispatch();
  const quizArr = quizzes.map((quiz) => {
    const date = new Date(quiz.time);
    return (
      <Grid xs={12} md={4} key={key}>
        <Card>
          <Stack
            direction={{ xs: "column", md: "row" }}
            m={2}
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography textAlign="center" level="h6">
              {quiz.title}
            </Typography>
            <Typography level="body3">
              {date.toLocaleDateString(undefined, options)}
            </Typography>
          </Stack>
          <Link
            overlay
            onClick={() => {
              setQuizNum(key++);
              dispatch(setTotalQuestions(quiz.questions.length));
              dispatch(resetScore());
            }}
          />
          {quiz.played && (
            <CardOverflow
              variant="soft"
              sx={{
                display: "flex",
                gap: 1.5,
                py: 1.5,
                px: "var(--Card-padding)",
                bgcolor: "background.level1",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography level="body3">
                Last Score: {quiz.score} / {quiz.questions.length}
              </Typography>
              <Button
                variant="soft"
                color="danger"
                onClick={() => {
                  dispatch(deleteQuiz(quiz.id - 1));
                }}
              >
                Delete
              </Button>
            </CardOverflow>
          )}
        </Card>
      </Grid>
    );
  });
  return (
    <Stack spacing={2} columns={{ xs: 4, md: 12 }} m={2}>
      <Grid container>{quizArr}</Grid>
    </Stack>
  );
};

export default QuizList;
