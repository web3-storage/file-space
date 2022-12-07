import React, { useState } from "react";

import { Outlet } from "react-router-dom";

export default function Upload() {
  const [files, setFiles] = useState(null);
  const [dataCid, setDataCid] = useState("");
  return (
    <div className="flex flex-column items-center">
      <div>
        <Outlet context={[files, setFiles, dataCid, setDataCid]} />
      </div>
    </div>
  );
}
