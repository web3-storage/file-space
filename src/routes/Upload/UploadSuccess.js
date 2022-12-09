import React from "react";
import { useHref, useNavigate, useOutletContext } from "react-router-dom";
import CopyText from "../../components/CopyText/CopyText";

export default function UploadSuccess() {
  const [files, setFiles, dataCid, setDataCid] = useOutletContext();
  const navigate = useNavigate();

  const link = `${window.location.protocol}//${window.location.host}${useHref(
    `/download/${dataCid}`
  )}`;
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
