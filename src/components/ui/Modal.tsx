"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  variant?: "default" | "danger";
  loading?: boolean;
}

function Modal({
  open,
  onClose,
  title,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  variant = "default",
  loading = false,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 m-auto w-full max-w-md rounded-xl border border-border bg-surface-card
        p-0 shadow-lg backdrop:bg-navy/40"
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="p-6">
        <h2 className="mb-2 text-lg font-semibold text-navy">{title}</h2>
        <div className="text-sm text-text-secondary">{children}</div>
      </div>

      <div className="flex justify-end gap-3 border-t border-border px-6 py-4">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        {onConfirm && (
          <Button
            variant={variant === "danger" ? "danger" : "primary"}
            onClick={onConfirm}
            loading={loading}
          >
            {confirmLabel}
          </Button>
        )}
      </div>
    </dialog>
  );
}

export { Modal };
