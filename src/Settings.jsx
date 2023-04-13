import {
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Switch,
  Typography,
} from "@mui/joy";

import { useColorScheme } from "@mui/joy/styles";

const Settings = ({ open, setOpen }) => {
  const { mode, setMode } = useColorScheme();
  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
    >
      <ModalDialog>
        <ModalClose />
        <Typography level="h5">Settings</Typography>
        <Stack m={2} spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography level="body1">Dark Mode</Typography>
            <Switch
              checked={mode === "dark"}
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            />
          </Stack>
        </Stack>
      </ModalDialog>
    </Modal>
  );
};

export default Settings;
