import { remove as storeRemove } from "@web3-storage/capabilities/store";
import { remove as uploaRemove } from "@web3-storage/capabilities/upload";
import { useKeyring } from "@w3ui/react-keyring";
import React, { Fragment } from "react";
import { useUploadsList } from "@w3ui/react-uploads-list";
import { useEffect } from "react";
import LineBg from "../components/LineBg/LineBg";
import CopyText from "../components/CopyText/CopyText";
import { useAbsoluteHref } from "../utils";
import { remove } from "@web3-storage/upload-client/upload";
import LoaderPage from "../components/LoaderPage/Loader";

function createUploadProp(dataUpload) {
  return {
    name: dataUpload.root.toString(),
    cid: dataUpload.root.toString(),
    updatedAt: new Date(dataUpload.updatedAt).toLocaleString(),
    linkPath: `/download/${dataUpload.root.toString()}`,
    CID: dataUpload.root,
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
 * @param {function} props.remove
 * @returns
 */
function UploadItem({ upload, columns, remove }) {
  return (
    <div className="pv4 bb b--near-white">
      <dl className="lh-title">
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
      <div className="flex flex-row-reverse ">
        <button
          className="f5 link dim br3 ph3 pv2 dib white bg-near-black bd ba b--white-70"
          type="button"
          onClick={() => remove(upload.CID)}
        >
          Remove file
        </button>
      </div>
    </div>
  );
}

function UploadTable({ data, columns, remove }) {
  return (
    <>
      {data.map((item) => {
        const u = createUploadProp(item);
        return (
          <UploadItem
            key={u.cid}
            upload={u}
            columns={columns}
            remove={remove}
          />
        );
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
  const [{ agent, space }, { getProofs }] = useKeyring();

  useEffect(() => {
    next();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <> An error</>;
  }

  if (loading) {
    return <LoaderPage />;
  }

  const removeFile = async (CID) => {
    const conf = {
      issuer: agent,
      with: space.did(),
      proofs: await getProofs([
        { can: uploaRemove.can, with: space.did() },
        { can: storeRemove.can, with: space.did() },
      ]),
    };
    try {
      remove(conf, CID);
    } catch (e) {
      //TODO: handle error and give feedback to user.
      console.error(e);
    }
    await reload();
  };

  return (
    <section className="pa6 relative bg-navy white">
      <LineBg></LineBg>
      <div className="center relative mw9 hero-card">
        <h1>
          My uploads{" "}
          <span>
            <button
              className="mr3 f5 link dim br3 ph2 pv1 mb2 dib white bg-near-black bd ba b--white-70"
              type="button"
              onClick={reload}
            >
              Refresh
            </button>
          </span>
        </h1>

        {data && data.length ? (
          <UploadTable columns={columns} data={data} remove={removeFile} />
        ) : (
          <p className="tc">No uploads</p>
        )}
      </div>
    </section>
  );
}
