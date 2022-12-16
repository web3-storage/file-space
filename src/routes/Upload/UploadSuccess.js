import React from "react";
import { useOutletContext } from "react-router-dom";
import CopyText from "../../components/CopyText/CopyText";
import { useAbsoluteHref } from "../../utils";

export default function UploadSuccess() {
  const [files, setFiles, dataCid, setDataCid] = useOutletContext(); // eslint-disable-line no-unused-vars

  const link = useAbsoluteHref(`/download/${dataCid}`);

  if (!dataCid) {
    return <div></div>;
  }

  return (
    <div>
      <h1 className="">Successfully hosed to the interplenatary filesystem.</h1>
      <p className="f6 code truncate">{dataCid.toString()}</p>
      Here's the link you can share to download the files:
      <div className="mt2">
        <CopyText text={link} />
      </div>
    </div>
  );
}
