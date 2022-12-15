import React, { Fragment } from "react";
import { useUploadsList } from "@w3ui/react-uploads-list";
import { useEffect } from "react";
import LineBg from "../components/LineBg/LineBg";
import CopyText from "../components/CopyText/CopyText";
import { useAbsoluteHref } from "../utils";
import Loader from "../components/Loader/Loader";

function createUploadProp(dataUpload) {
  return {
    name: dataUpload.root.toString(),
    cid: dataUpload.root.toString(),
    updatedAt: new Date(dataUpload.updatedAt).toLocaleString(),
    linkPath: `/download/${dataUpload.root.toString()}`,
  };
}
/**
 * Created so that we can call the useAbsoluteHref at root component level and avoid any issues with calling
 * a hook within a loop.
 * @param {object} props
 * @param {string} props.path
 * @returns
 */
function LinkToBeCopied({ path }) {
  const link = useAbsoluteHref(path);
  return <CopyText text={link}></CopyText>;
}

/**
 *
 * @param {object} props
 * @param {object} props.upload
 * @param {object[]} props.columns
 * @returns
 */
function UploadItem({ upload, columns }) {
  return (
    <dl className="lh-title pv2">
      {columns.map((c) => (
        <Fragment key={`${upload.cid}-${c.key}`}>
          <dt className="f6 b mb2">{c.label}</dt>
          <dd className="ml0 mb3">
            {c.key === "linkPath" ? (
              <LinkToBeCopied path={upload[c.key]} />
            ) : (
              <>{upload[c.key] || "-"}</>
            )}
          </dd>
        </Fragment>
      ))}
    </dl>
  );
}

function UploadTable({ data, columns }) {
  return (
    <>
      {data.map((item) => {
        const u = createUploadProp(item);
        return <UploadItem key={u.cid} upload={u} columns={columns} />;
      })}
    </>
  );
}

export default function Dashboard() {
  const columns = [
    { label: "CID", key: "cid" },
    { label: "Updated at", key: "updatedAt" },
    { label: "Link", key: "linkPath" },
  ];
  const [{ loading, error, data }, { next, reload }] = useUploadsList();
  useEffect(() => {
    next();
  }, []);

  if (error) {
    return <> An error</>;
  }

  if (loading) {
    <>
      <Loader></Loader>
    </>;
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
