import { useOutletContext } from "react-router-dom";

export default function UploadSuccess() {
  const [files, setFiles, dataCid, setDataCid] = useOutletContext();

  return (
    <div>
      <h1 className="near-white">
        Successfylly hosed to the interplenatary filesystem
      </h1>
      <p className="f6 code truncate">{dataCid.toString()}</p>
      <p> Here's the link to share</p>
    </div>
  );
}
