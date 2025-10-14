"use client";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Button, IconButton, Modal, Stack, Typography } from "@mui/material";
import { useAtom } from "jotai";

import theme from "@/shared/mui/theme";
import { globalModalAtom, ModalType } from "../_atoms/globalModal";

type GlobalModalProps = {
  modalType?: ModalType;
};

export default function GlobalModal({
  modalType = "primary",
}: GlobalModalProps) {
  const [atom, setAtom] = useAtom(globalModalAtom);

  const modalInfo = atom[modalType];

  const handleClose = () => {
    setAtom((prev) => ({ ...prev, [modalType]: { open: false } }));
    modalInfo.onClose?.();
  };

  return (
    <Modal
      open={modalInfo.open}
      onClose={(event, reason) => {
        if (!(modalInfo.disableNativeClose && reason) && !modalInfo.isLoading) {
          handleClose();
        }
      }}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        component={modalInfo.form ? "form" : "div"}
        onSubmit={modalInfo.onSubmit}
        sx={{
          position: "relative",
          bgcolor: "white",
          p: "12px 16px",
          gap: "8px",
          borderRadius: "8px",

          minWidth: "360px",
          [theme.breakpoints.down("lg")]: {
            minWidth: "300px",
          },
        }}
      >
        {modalInfo.title && (
          <Typography fontWeight={700}>{modalInfo.title}</Typography>
        )}
        {modalInfo.subTitle && (
          <Typography sx={{ color: "gray.700" }}>
            {modalInfo.subTitle}
          </Typography>
        )}
        {modalInfo.content}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: "4px",
            mt: "24px",
          }}
        >
          {modalInfo.isConfirm && (
            <Button
              size="xsmall"
              variant="outlined"
              color="inherit"
              onClick={handleClose}
              disabled={modalInfo.isLoading}
            >
              {modalInfo.cancelTitle || "취소"}
            </Button>
          )}
          <Button
            size="xsmall"
            type={modalInfo.form ? "submit" : "button"}
            onClick={modalInfo.onConfirm}
            loading={modalInfo.isLoading}
          >
            {modalInfo.confirmTitle || "확인"}
          </Button>
        </Stack>
        {!modalInfo.hideCloseButton && (
          <IconButton
            sx={{ position: "absolute", top: "4px", right: "4px" }}
            onClick={handleClose}
            disabled={modalInfo.isLoading}
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        )}
      </Stack>
    </Modal>
  );
}
