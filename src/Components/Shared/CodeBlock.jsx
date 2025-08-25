"use client";
import React, { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ code, language = "jsx" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative rounded-xl shadow-md overflow-hidden">
      {/* Code with VS Code-like Theme */}
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1rem",
          borderRadius: "0.75rem",
          fontSize: "0.9rem",
        }}
        wrapLines={true}
        showLineNumbers={true}
      >
        {code}
      </SyntaxHighlighter>

      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white text-xs px-3 py-1.5 rounded-lg shadow-md transition-all"
      >
        {copied ? <FiCheck className="text-green-400" /> : <FiCopy />}
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CodeBlock;
