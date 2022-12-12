import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatBytes } from "../utils";

function FileSize({ size }) {
  if (size) {
    return <>The file(s) is approximatelly {formatBytes(size, 1)}</>;
  } else {
    return <>Unknown file size</>;
  }
}

/**
 *
 * @param {string} cid
 * @param {object} [opt]
 * @param {string} [opt.format]
 * @param {string} [opt.filename]
 * @param {string} [opt.download]
 */
const getGatewayLink = (cid, opt = {}) => {
  const params = new URLSearchParams(opt);
  return `https://${cid}.ipfs.dweb.link/${params}`;
};

export default function Download() {
  const [size, setSize] = useState(/** @type {number|null} */ (null));
  const [calculatingSize, setCalculatingSize] = useState(false);
  let { cid } = useParams();

  useEffect(() => {
    setCalculatingSize(true);
    async function fetchSize(cid) {
      const r = await fetch(getGatewayLink(cid), {
        method: "HEAD",
      });
      const fSize = r.headers.get("content-length");
      if (fSize) {
        setSize(parseInt(fSize));
      }
      setCalculatingSize(false);
    }
    if (cid) {
      fetchSize(cid);
    }
  }, []);

  if (!cid) {
    return <>an error</>;
  }

  return (
    <div>
      Download this file
      <div>
        {calculatingSize ? "Calculating size ..." : <FileSize size={size} />}
      </div>
      <a
        className="db"
        href={getGatewayLink(cid, {
          format: "tar",
          download: "true",
        })}
      >
        Download
      </a>
    </div>
  );
}
