import React from "react";

export default function Home() {
  return (
    <div>
      <h1>Filehose</h1>
      <div className="flex">
        <a className="f5 link dim br3 ph4 pv3 mb2 dib white bg-near-black" href="/signin">Register</a>
        <a className="f5 ph4 pv3 mb2 link" href="/signin">Sign in</a>
      </div>
    </div>
  );
}
