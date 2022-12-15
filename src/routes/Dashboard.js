import React from "react";
import { useUploadsList } from "@w3ui/react-uploads-list";
import { useEffect } from "react";
import LineBg from "../components/LineBg/LineBg";
import CopyText from "../components/CopyText/CopyText";

function createUploadProp(dataUpload) {
  return {
    name: dataUpload.root.toString(),
    cid: dataUpload.root.toString(),
    updatedAt: new Date(dataUpload.updatedAt).toLocaleDateString(),
    // TODO: this should be done using router apis, and probably be abstracted in a custom hook.
    link: `${window.location.protocol}//${
      window.location.host
    }/download/${dataUpload.root.toString()}`,
  };
}

function UploadItem({ upload, columns }) {
  return (
    <dl className="lh-title pv2 mt0">
      {columns.map((c) => (
        <>
          <dt className="f6 b mt2">{c.label}</dt>
          <dd className="ml0">
            {c.key === "link" ? (
              <CopyText text={upload[c.key]}></CopyText>
            ) : (
              <>{upload[c.key] || "-"}</>
            )}
          </dd>
        </>
      ))}
    </dl>
  );
}

function UploadTable({ data, columns }) {
  return (
    <>
      {data.map((item) => (
        <UploadItem
          key={item.cid}
          upload={createUploadProp(item)}
          columns={columns}
        />
      ))}
    </>
  );
}

export default function Dashboard() {
  const columns = [
    { label: "CID", key: "cid" },
    { label: "Updated at", key: "updatedAt" },
    { label: "Link", key: "link" },
  ];
  const [{ loading, error, data }, { next, reload }] = useUploadsList();
  useEffect(() => {
    next();
  }, []);

  if (error) {
    return <> An error</>;
  }

  return (
    <section className="pa6 relative bg-navy white">
      <LineBg></LineBg>
      <div className="center relative mw9 hero-card">
        <h1>My uploads</h1>
        {data && data.length ? (
          <UploadTable columns={columns} data={data} />
        ) : (
          <p className="tc">No uploads</p>
        )}
        <button type="button" onClick={reload} className="ph3 pv2 mr3">
          Refresh
        </button>
        {loading ? <span className="spinner dib" /> : null}
      </div>
    </section>
  );
}
