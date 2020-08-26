import React from "react";
import { Button } from "./button";

const Modal = ({ open, onContinue, onClose }) => {
  if (open) {
    return (
      <>
        <div
          style={{
            zIndex: 100,
            padding: 16,
            border: "1px solid black",
            backgroundColor: "white",
            width: 300,
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <p>Are you sure you want to delete this task?</p>
          <Button onClick={() => onClose()}>No</Button>
          <Button>Yes</Button>
        </div>
        <div
          onClick={() => onClose()}
          style={{
            position: "absolute",
            zIndex: 99,
            opacity: "0.7",
            width: "100%",
            height: "100vh",
            backgroundColor: "black",
            left: 0,
            top: 0,
          }}
        />
      </>
    );
  }
  return null;
};

export default Modal;
