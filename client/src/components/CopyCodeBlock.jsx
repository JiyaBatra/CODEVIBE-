import React, { useState } from "react";

const CopyCodeBlock = ({ code, className = "code-block" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="copy-code-block">
      <button
        type="button"
        className="copy-code-block__button"
        onClick={handleCopy}
        aria-label={copied ? "Code copied" : "Copy code to clipboard"}
      >
        {copied ? "Copied!" : "📋 Copy"}
      </button>
      <pre className={className}>{code}</pre>
    </div>
  );
};

export default CopyCodeBlock;
