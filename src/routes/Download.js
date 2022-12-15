import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LineBg from "../components/LineBg/LineBg";
import { formatBytes } from "../utils";
import { ReactComponent as DownloadIcon } from "../icons/download.svg";

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
  return `https://${cid}.ipfs.dweb.link/?${params}`;
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
  }, [cid]);

  if (!cid) {
    return <>an error</>;
  }

  return (
    <section className="pa6 relative bg-navy white">
      <LineBg></LineBg>
      <div className="center relative mw7 hero-card">
        <div className="tc">
          <h2>Download this file</h2>
          <DownloadIcon />
          <div>
            {calculatingSize ? (
              "Calculating size ..."
            ) : (
              <FileSize size={size} />
            )}
          </div>
          <div className="mt5">
            <a
              className="f5 link dim br3 ph4 pv3 mb2 dib white bg-near-black bd ba b--white-70"
              href={getGatewayLink(cid, {
                format: "tar",
                download: "true",
              })}
              target="_blank"
            >
              Download
            </a>
          </div>
        </div>
        <div className="tc mt6 mb5">
          <h2>Use FileSpace to share your own files</h2>
          <div className="mt5">
            <a
              className="f5 link dim br3 ph4 pv3 mb2 dib white bg-near-black bd ba b--white-70"
              href="/"
            >Find out more</a>
          </div>
        </div>
      </div>
    </section>
  );
}
