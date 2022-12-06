import React from "react";
import PropTypes from "prop-types";
import { killEvent } from "../utils";

/**
 *
 * @param {object} opt
 * @param {function} opt.onPickFiles
 * @returns
 */
export default function FilePicker({ onPickFiles }) {
  const onDragEnter = (e) => {
    return killEvent(e);
  };
  const handleDrop = (e) => {
    killEvent(e);
    onPickFiles(Array.from(e.dataTransfer.files));
  };
  const handleFilesChange = (e) => {
    const { files } = e.target;
    if (files) {
      onPickFiles(Array.from(files));
    }
  };

  return (
    <label
      htmlFor="files"
      className="relative flex justify-center align-center pa3 grow b--dashed br2"
      onDragEnter={onDragEnter}
      onDragOver={killEvent}
      onDrop={handleDrop}
      draggable
    >
      <input
        id="files"
        type="file"
        className="dn"
        multiple
        directory="true"
        onChange={handleFilesChange}
      />
      <div className="">
        Drag and Drop files
        <br />
        <span className="">(or click to choose)</span>
      </div>
    </label>
  );
}

FilePicker.propTypes = {
  onPickFiles: PropTypes.func.isRequired,
};
