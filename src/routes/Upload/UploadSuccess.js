import React from "react";
import { useHref, useNavigate, useOutletContext } from "react-router-dom";
import CopyText from "../../components/CopyText/CopyText";
import { useAbsoluteHref } from "../../utils";

export default function UploadSuccess() {
  const [files, setFiles, dataCid, setDataCid] = useOutletContext(); // eslint-disable-line no-unused-vars
  const navigate = useNavigate();

  const link = useAbsoluteHref(`/download/${dataCid}`);

  if (!dataCid) {
    return navigate("/upload");
  }

  return (
    <div>
      <h1 className="">Successfylly hosed to the interplenatary filesystem.</h1>
      <p className="f6 code truncate">{dataCid.toString()}</p>
      Here's the link you can share to download the files:
      <div className="mt2">
        <CopyText text={link} />
      </div>
    </div>
  );
}
