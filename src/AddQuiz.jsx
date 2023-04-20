import { useRef, useState } from "react";

import {
  Modal,
  ModalDialog,
  ModalClose,
  Stack,
  Button,
  FormControl,
  FormLabel,
  CircularProgress,
  Typography,
  Input,
} from "@mui/joy";

import { addQuiz } from "./db";
import { formatQuiz } from "./scripts/script";
import { useDispatch } from "react-redux";
import { addQuizSlice } from "./redux/slice"
import store from "./redux/store";

const getQuizFromOnline = async (url) => {
  fetch(url).then((res) => {
    res.json().then((data) => {
      const quizData = formatQuiz(data);
      addQuiz(quizData).then((res) => {
        console.log(res);
        store.dispatch(addQuizSlice(res));
      });
    });
  });
};

const AddQuiz = ({ open, setOpen }) => {
  const [url, setUrl] = useState("");
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <Typography level="h5">Add Quiz</Typography>
        {!loading ? (
          <Stack my={3} spacing={3}>
            <FormControl>
              <FormLabel>Enter URL</FormLabel>
              <Stack my={1} direction="row" spacing={2}>
                <Input value={url} onChange={(res) => setUrl(res.target.value)} />
                <Button
                  onClick={() => {
                    setLoading(true);
                    getQuizFromOnline(url).then((res) => {
                      setOpen(false);
                      setLoading(false);

                      setUrl("");
                    });
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </FormControl>
          </Stack>
        ) : (
          <Stack alignItems="center" justifyContent="center" m={3} spacing={3}>
            <CircularProgress />
          </Stack>
        )
        }
      </ModalDialog >
    </Modal >
  );
};

export default AddQuiz;
