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

  // Triggers the check mark to visually feedback the link is copied.
  const triggerCopied = () => {
    setLinkCopied(true)
    setTimeout(() => {
      setLinkCopied(false)
    }, 2000)
  }

  return (
    <div className="dib ba br2 pa3 pl2 pr2 w-100 flex">
      <div className="overflow-x-scroll">
        <span className="code lh-copy">{textToBeDisplayed ? textToBeDisplayed : text}</span>
      </div>
      <CopyToClipboard className="ml1" text={text} onCopy={() => triggerCopied()}>
        <span>
          {" "}
          {linkCopied ? (
            <TickIcon height={24} />
          ) : (
            <span>
              {" "}
              <CopyIcon stroke="white" height={24} />{" "}
            </span>
          )}
        </span>
      </CopyToClipboard>
    </div>
  );
}
