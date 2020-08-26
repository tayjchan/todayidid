import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "./modal";

const Delete = ({ taskId }) => {
  const [openModal, setOpenModal] = useState(false);
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
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default Delete;
