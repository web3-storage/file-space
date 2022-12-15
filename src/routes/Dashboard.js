import React from "react";
import { useUploadsList } from "@w3ui/react-uploads-list";
import { useEffect } from "react";

function UploadRow({ upload }) {
  return (
    <tr className="striped--near-white">
      <th>{upload.name}</th>
      <th>
        <a
          target="_blank"
          href={`https://w3s.link/ipfs/${upload.cid}/`}
          rel="noreferrer"
        >
          {upload.cid}
        </a>
      </th>
      <th>
        <a
          href={`https://${upload.cid}.ipfs.cf-ipfs.com/?download=true&name=${upload.name}`}
          rel="noreferrer"
          download={upload.name}
        >
          Download
        </a>
      </th>
    </tr>
  );
}

export default function Dashboard() {
  const uploads = [
    {
      cid: "bafybeic7zrcqvhanfwl4o7ei3565o55ovu7bnrqdocumj6pg6s6dfskpvy",
      name: "test",
    },
    {
      cid: "bafybeic7zrcqvhanfwl4o7ei3565o55ovu7bnrqdocumj6pg6s6dfskpvy",
      name: "test2",
    },
  ];

  const [{ loading, error, data }, { reload }] = useUploadsList();
  useEffect(() => {
    reload();
  }, []);
  return (
    <div>
      <h1>My uploads</h1>
      <div className="collapse ba br2 b--black-10 pv2 ph3 mt4">
        <div className="w-90 mw9">
          {data && data.length ? (
            <div className="overflow-auto">
              <div className="w-100 mb3 collapse">
                <thead className="near-white tl">
                  <tr>
                    <th className="pa3">Data CID</th>
                    <th className="pa3">CAR CID</th>
                    <th className="pa3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <UploadRow
                      upload={{
                        name: item.root.toString(),
                        cid: item.root.toString(),
                      }}
                      key={item.root.toString()}
                    />
                  ))}
                </tbody>
              </div>
            </div>
          ) : (
            <p className="tc">No uploads</p>
          )}
          <button type="button" onClick={reload} className="ph3 pv2 mr3">
            Refresh
          </button>
          {loading ? <span className="spinner dib" /> : null}
        </div>
      </div>
    </div>
  );
}
