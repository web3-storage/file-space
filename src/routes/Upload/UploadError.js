import React, { useState } from "react";
import { useUploader } from "@w3ui/react-uploader";
import { useKeyring } from "@w3ui/react-keyring";
import FilePicker from "../../components/FilePicker/FilePicker";
import { Link } from "react-router-dom";

export default function UploadError() {
  return (
    <div>
      <h1 className="">Ups! Something did go wrong! Please try again later!</h1>
      <p>
        <Link to="/upload">Go back to uploads</Link>
      </p>
    </div>
  );
}
