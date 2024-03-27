import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";

export default function ConfirmDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <p>Are you sure you want to deactivate your account?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onConfirm} color="error">
          Confirm
        </Button>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
