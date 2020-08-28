import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "./modal";
import { deleteTask } from "../services/Firestore";

const Delete = ({ taskId, refresh }) => {
  const [openModal, setOpenModal] = useState(false);

  const onContinue = async () => {
    setOpenModal(false);

    await deleteTask(taskId);
    await refresh();
  };

  return (
    <>
      <DeleteIcon
        style={{
          fontSize: "0.9rem",
          color: "grey",
          margin: "0 2px",
          cursor: "pointer",
        }}
        onClick={() => setOpenModal(!openModal)}
      />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onContinue={onContinue}
      />
    </>
  );
};

export default Delete;
