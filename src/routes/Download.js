import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

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
  const [size, setSize] = useState();
  const [isSizeKnown, setIsSizeKnown] = useState(false);
  let { cid } = useParams();

  useEffect(() => {
    async function fetchSize(cid) {
      const r = await fetch(getGatewayLink(cid), {
        method: "HEAD",
      });
      const fSize = r.headers.get("content-length");
      if (fSize) {
        setSize(fSize);
        setIsSizeKnown(true);
      } else {
        setIsSizeKnown(false);
      }
    }
    if (cid) {
      fetchSize(cid);
    }
  }, []);

  return (
    <div>
      Download this file
      <div>{size ? size : "Calculating size ..."}</div>
      <a
        className="db"
        href={`https://${cid}.ipfs.dweb.link/?format=tar&download=true`}
      >
        Download
      </a>
    </div>
  );
}
