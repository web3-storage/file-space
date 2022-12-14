import React, { useState } from "react";
import { useUploader } from "@w3ui/react-uploader";
import FilePicker from "../../components/FilePicker/FilePicker";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

export default function UploadNew() {
  const [{ storedDAGShards }, uploader] = useUploader();
  const [status, setStatus] = useState("");

  const [files, setFiles, dataCid, setDataCid] = useOutletContext(); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();

  if (!uploader) return null;

  const handleUploadSubmit = async (filesToUpload) => {
    setFiles(filesToUpload);
    try {
      setStatus("uploading");
      const cid = await uploader.uploadDirectory(filesToUpload);
      setDataCid(cid.toString());
      setStatus("done");
      navigate("/upload/success");
    } catch (err) {
      console.error(err);
      navigate("./error");
    }
  };

  if (status === "uploading") {
    return <Uploading files={files} storedDAGShards={storedDAGShards} />;
  }

  return (
    <div>
      <h1 className="tc pa4"> Pick the file(s) you want to share:</h1>
      <div className="mw7 db">
        <FilePicker onPickFiles={handleUploadSubmit}></FilePicker>
      </div>
    </div>
  );
}

const Uploading = ({ files, storedDAGShards }) => (
  <div className="flex items-center">
    <div className="spinner mr3 flex-none" />
    <div className="flex-auto">
      <h1 className="tc">Uploading your file(s).</h1>
      <div className="tc">
        <Loader />
      </div>
      <p className="">
        Hold tight, once the upload is finished you will get a link you can
        share.
      </p>
    </div>
  </div>
);
