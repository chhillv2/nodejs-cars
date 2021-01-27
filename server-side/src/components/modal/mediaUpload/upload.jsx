import React from "react";
import { Dropzone } from "../../../components/components";

const UploadModal = ({ type, maxFiles, handleClose, handleCreate }) => {
  return (
    <Dropzone
      type={type}
      maxFiles={maxFiles}
      handleClose={handleClose}
      handleCreate={handleCreate}
    />
  );
};

export default UploadModal;
