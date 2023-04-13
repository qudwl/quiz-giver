import { Typography, Stack } from "@mui/joy";
import { useSelector } from "react-redux";

const ScoreCounter = () => {
  const score = useSelector((state) => state.slice.currentScore);
  const total = useSelector((state) => state.slice.totalQuestions);
  return (
    <Stack direction="row">
      <Typography>{score}</Typography>
      <Typography>/</Typography>
      <Typography>{total}</Typography>
    </Stack>
  );
};

export default ScoreCounter;
