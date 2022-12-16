import React from "react";
import LineBg from "../components/LineBg/LineBg";
import "./Home.css";
import SpaceImage1 from "../icons/space-1.png";
import SpaceImage2 from "../icons/space-2.png";
import SpaceImage3 from "../icons/space-3.png";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="pa6 bg-navy white">
        <LineBg></LineBg>
        <div className="center relative mw6 hero-card ">
          <div>
            <h1>FileSpace</h1>
            <h2>We make file sharing easy.</h2>
            <div className="flex"></div>
            <p>
              To start transferring files or folders to others, please click
              below and share your email address. We'll create your personal{" "}
              <a href="https://web3.storage" target="_blank" rel="noreferrer">
                web3.storage
              </a>{" "}
              bucket for you where your files will be safely stored. You can
              then start uploading to this bucket and a shareable link will be
              created for each upload, allowing others to access these files
              through the IPFS gateway.
            </p>
            <Link
              className="f5 link dim br3 ph4 pv3 mb2 dib white bg-near-black bd ba b--white-70"
              to="/signin"
            >
              Start Now
            </Link>
          </div>
        </div>
      </section>
      <section className="mw8 relative center pt6 pb4 flex items-center ph3">
        <div className="w-100 w-60-ns">
          <h2>How dows it work?</h2>
          <p>
            FileSpace is powered by w3up, an upload API which uses Elastic IPFS,
            the Internet's largest cloud implementation of IPFS, a protocol
            which web3.storage uses to locate files by their content identifier
            (CID). What this means is that your files will be stored on the
            decentralised web and available over the public IPFS network. From
            then on you can interact with your data on the web by using its
            content identifier.
          </p>
        </div>
        <div className="w-100 w-40-ns flex">
          <img src={SpaceImage1} className="w5 center h-100" alt="" width="512" height="512"></img>
        </div>
      </section>

      <section className="mw8 center pv4 flex items-center ph3">
        <div className="w-100 w-40-ns flex">
          <img src={SpaceImage3} className="w5 center h-100" alt="" width="512" height="512"></img>
        </div>
        <div className="w-100 w-60-ns">
          <h2>Why content addressing over location (URL) addressing?</h2>
          <p>This method of finding files on the web solves two problems:</p>
          <ul>
            <li>
              Content addressing solves for the problem behind link rot — the
              mutability of location-dependent storage systems — by using a
              hashing algorithm to generate a unique CID for each file that can
              be used as the lookup key for a file rather than a URL.
            </li>
            <li>
              In addition to making sure files don't get lost if they're moved,
              content addressing also ensures that users intending to retrieve a
              specific version of a file will be guaranteed to retrieve that
              version for as long as it exists anywhere on the network.
            </li>
          </ul>
        </div>
      </section>

      <section className="mw8 relative center pt4 pb6 flex items-center ph3">
        <div className="w-100 w-60-ns">
          <h2>What's my limit?</h2>
          <p>
            The free tier for web3.storage allows you to store up to 5GB in your
            bucket. You have the option of keeping files by default, but you can
            also set your filesharing up so files are removed from your account
            after X days.
          </p>
        </div>
        <div className="w-100 w-40-ns flex">
          <img src={SpaceImage2} className="w5 center h-100" alt="" width="512" height="512"></img>
        </div>
      </section>
    </div>
  );
}
