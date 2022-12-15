import React from "react";
import { Link } from "react-router-dom";

export default function UploadError() {
  return (
    <div>
      <h1 className="">Oops! Something went wrong! Please try again later!</h1>
      <p>
        <Link to="/upload">Go back to uploads</Link>
      </p>
    </div>
  );
}
