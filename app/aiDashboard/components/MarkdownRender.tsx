"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
type Props = {
  content: string;
};

const MarkdownRenderer: React.FC<Props> = ({ content }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        p({ children }) {
          return <p className="mb-2 leading-relaxed">{children}</p>;
        },

        code({ inline, className, children, ...props }: any) {
          const match = /language-(\w+)/.exec(className || "");

          if (inline) {
            return (
              <code className="bg-gray-200 px-1 py-0.5 rounded text-sm">
                {children}
              </code>
            );
          }

          return (
            <div className="relative my-3">
              {/* Copy Button */}
              <button
                onClick={() =>
                  navigator.clipboard.writeText(String(children))
                }
                className="absolute right-2 top-2 text-xs bg-gray-700 text-white px-2 py-1 rounded"
              >
                Copy
              </button>

              <SyntaxHighlighter
                style={vscDarkPlus}
                language={match ? match[1] : "javascript"}
                PreTag="div"
                className="rounded-lg text-sm"
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </div>
          );
        },

        ul({ children }) {
          return <ul className="list-disc ml-5 mb-2">{children}</ul>;
        },

        li({ children }) {
          return <li className="mb-1">{children}</li>;
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;