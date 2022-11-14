import React from 'react';
import { Log } from 'helpers/errorLogger';
import { markdown } from 'markdown';

interface Props {
  text: string;
  className?: string;
}

const Markdown: React.FC<Props> = ({ text }) => {
  if (typeof text !== 'string') {
    Log.error(`Markdown: Invalid text property. Expected string but received ${typeof text}`);
    return <></>;
  }
  return (
    <>
      <style>
        {`
        .markdown > * {
          margin: revert;
          padding: revert;
          font-size: revert;
          font-weight: revert;
        }
      `}
      </style>

      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div className="markdown" dangerouslySetInnerHTML={{ __html: markdown.toHTML(text) }}></div>
    </>
  );
};

export default Markdown;
