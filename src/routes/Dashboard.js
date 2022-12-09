import React from "react";

function UploadRow({ upload }) {
  return (
    <tbody>
      <tr className="striped--near-white">
        <th>{upload.name}</th>
        <th>
          <a target="_blank" href={ `https://w3s.link/ipfs/${upload.cid}/` } rel="noreferrer">{upload.cid}</a>
        </th>
        <th>
          <a href={ `https://${upload.cid}.ipfs.cf-ipfs.com/?download=true&name=${upload.name}` } rel="noreferrer" download={upload.name}>Download</a>
        </th>
      </tr>
    </tbody>
  )
}

export default function Dashboard() {
  const uploads = [
    {cid: 'bafybeic7zrcqvhanfwl4o7ei3565o55ovu7bnrqdocumj6pg6s6dfskpvy', name: 'test'},
    {cid: 'bafybeic7zrcqvhanfwl4o7ei3565o55ovu7bnrqdocumj6pg6s6dfskpvy', name: 'test2'},
  ];

  return (
    <div>
      <h1>My uploads</h1>
      <table className="collapse ba br2 b--black-10 pv2 ph3 mt4">
        {uploads.map(upload => <UploadRow key={upload.name} upload={upload} />)}
      </table>
    </div>
  );
}
