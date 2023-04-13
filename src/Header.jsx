import { Button, Sheet, Stack, Typography } from "@mui/joy";
import { useState } from "react";
import AddQuiz from "./AddQuiz";
import Settings from "./Settings";
import ScoreCounter from "./ScoreCounter";

const Header = ({ inQuiz }) => {
  const [openAddQuiz, setOpenAddQuiz] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  return (
    <Sheet
      sx={{
        p: 2,
        gap: 2,
        boxSizing: "border-box",
        bgcolor: "background.surface",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gridColumn: "1 / -1",
        borderBottom: "1px solid",
        borderColor: "divider",
        width: "100vw",
        zIndex: 1100,
      }}
    >
      <Typography level="h3" component="div">
        Quiz Giver
      </Typography>
      {inQuiz && <ScoreCounter />}
      <Stack direction="row" spacing={2}>
        {!inQuiz && (
          <Button
            color="neutral"
            variant="soft"
            onClick={() => setOpenAddQuiz(true)}
          >
            Add
          </Button>
        )}
        <Button
          color="neutral"
          variant="soft"
          onClick={() => {
            setOpenSettings(true);
          }}
        >
          Settings
        </Button>
      </Stack>
      <AddQuiz open={openAddQuiz} setOpen={setOpenAddQuiz} />
      <Settings open={openSettings} setOpen={setOpenSettings} />
    </Sheet>
  );
};

export default Header;
