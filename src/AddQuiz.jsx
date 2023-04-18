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

const getQuizFromOnline = async (url) => {
  const res = fetch(url).then((res, err) => {
    if (err) {
      console.log(err);
      return false;
    }
    return res;
  });
  if (!res) return false;
  const data = await res.json();
  addQuiz(data);
  return true;
};

const AddQuiz = ({ open, setOpen }) => {
  const [url, setUrl] = useState("");
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog>
        <ModalClose />
        <Typography level="h5">Add Quiz</Typography>
        {!loading ? (
          <Stack my={3} spacing={3}>
            <FormControl>
              <FormLabel>Add File</FormLabel>
              <Stack my={1}>
                <Button onClick={() => ref.current.click()}>Upload</Button>
                <input
                  onChange={(e) => {
                    setLoading(true);
                    e.target.files[0].text().then((res) => {
                      const data = JSON.parse(res);
                      addQuiz();
                      setLoading(false);
                      setOpen(false);
                    });
                  }}
                  ref={ref}
                  hidden
                  type="file"
                />
              </Stack>
            </FormControl>
            <FormControl>
              <FormLabel>Enter URL</FormLabel>
              <Stack my={1} direction="row" spacing={2}>
                <Input value={url} onChange={(res) => setUrl(res)} />
                <Button
                  onClick={() => {
                    setLoading(true);
                    getQuizFromOnline(url).then((res) => {
                      if (res) {
                        setOpen(false);
                        setLoading(false);
                        setUrl("");
                      } else {
                        setLoading(false);
                        setUrl("Error!");
                      }
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
        )}
      </ModalDialog>
    </Modal>
  );
};

export default AddQuiz;
