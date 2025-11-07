import { useCallback } from "react";
import { ButtonProps } from "@mui/material";
import { atom, useSetAtom } from "jotai";

export const globalModalAtom = atom<ModalAtomType>({
  primary: {
    open: false,
  },
  secondary: {
    open: false,
  },
  tertiary: {
    open: false,
  },
});

type ModalAtomType = {
  primary: ModalInfo;
  secondary: ModalInfo;
  tertiary: ModalInfo;
};

type ModalInfo = {
  open: boolean;

  title?: string;
  subTitle?: string;
  content?: React.ReactNode;

  isConfirm?: boolean;
  onConfirm?: () => void;
  confirmTitle?: string;
  confirmColor?: ButtonProps["color"];

  cancelTitle?: string;

  onClose?: () => void;

  disableNativeClose?: boolean;
  hideCloseButton?: boolean;

  form?: boolean;
  onSubmit?: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading?: boolean;
};

export type ModalType = keyof ModalAtomType;

export function useGlobalModal() {
  const setAtom = useSetAtom(globalModalAtom);

  const open = useCallback(
    (modalInfo: Omit<ModalInfo, "open">, modalType?: ModalType) => {
      setAtom((prev) => {
        if (modalType) {
          return { ...prev, [modalType]: { open: true, ...modalInfo } };
        }

        if (!prev.primary.open) {
          return { ...prev, primary: { open: true, ...modalInfo } };
        }
        if (!prev.secondary.open) {
          return { ...prev, secondary: { open: true, ...modalInfo } };
        }
        if (!prev.tertiary.open) {
          return { ...prev, tertiary: { open: true, ...modalInfo } };
        }

        return prev;
      });
    },
    [setAtom]
  );

  const close = useCallback(
    (modalType?: ModalType) => {
      setAtom((prev) => {
        if (modalType) {
          return { ...prev, [modalType]: { open: false } };
        }

        if (prev.tertiary.open) {
          return { ...prev, tertiary: { open: false } };
        }
        if (prev.secondary.open) {
          return { ...prev, secondary: { open: false } };
        }
        if (prev.primary.open) {
          return { ...prev, primary: { open: false } };
        }
        return prev;
      });
    },
    [setAtom]
  );

  const loading = useCallback(
    (value: boolean, modalType?: ModalType) => {
      setAtom((prev) => {
        if (modalType) {
          return {
            ...prev,
            [modalType]: { ...prev[modalType], isLoading: value },
          };
        }

        if (prev.tertiary.open) {
          return { ...prev, tertiary: { ...prev.tertiary, isLoading: value } };
        }
        if (prev.secondary.open) {
          return {
            ...prev,
            secondary: { ...prev.secondary, isLoading: value },
          };
        }
        if (prev.primary.open) {
          return { ...prev, primary: { ...prev.primary, isLoading: value } };
        }
        return prev;
      });
    },
    [setAtom]
  );

  return { open, close, loading };
}
