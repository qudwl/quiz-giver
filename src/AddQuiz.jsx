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

const AddQuiz = ({ open, setOpen }) => {
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
                    console.log(e);
                    setLoading(true);
                    setTimeout(() => {
                      setOpen(false);
                      setLoading(false);
                    }, 2000);
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
                <Input />
                <Button
                  onClick={() => {
                    setLoading(true);
                    setTimeout(() => {
                      setOpen(false);
                      setLoading(false);
                    }, 2000);
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
