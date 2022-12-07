import React, { useState } from "react";
import { useUploader } from "@w3ui/react-uploader";
import { useKeyring } from "@w3ui/react-keyring";
import FilePicker from "../../components/FilePicker/FilePicker";

export default function UploadError() {
  return (
    <div>
      <h1 className="near-white">
        Ups! Something did go wrong! Please try again later!
      </h1>
    </div>
  );
}
