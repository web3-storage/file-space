import React, { useState } from "react";
import { ReactComponent as CopyIcon } from "../../icons/copy.svg";
import { ReactComponent as TickIcon } from "../../icons/tick.svg";
import { CopyToClipboard } from "react-copy-to-clipboard";

/**
 *
 * @param {object} props
 * @param {string} props.text Text to be copied
 * @param {string} [props.textToBeDisplayed] Optionally a different text to show the user
 * @returns
 */
export default function CopyText({ text, textToBeDisplayed }) {
  const [linkCopied, setLinkCopied] = useState(false);
  return (
    <div className="dib ba br2 pa1 ph2">
      <span>{textToBeDisplayed ? textToBeDisplayed : text}</span>
      <CopyToClipboard text={text} onCopy={() => setLinkCopied(true)}>
        <span>
          {" "}
          {linkCopied ? (
            <TickIcon height={18} />
          ) : (
            <span>
              {" "}
              <CopyIcon height={18} />{" "}
            </span>
          )}
        </span>
      </CopyToClipboard>
    </div>
  );
}
