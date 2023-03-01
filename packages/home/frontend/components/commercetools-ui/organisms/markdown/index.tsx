import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { Log } from 'helpers/errorLogger';
/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import { markdown as MD } from 'markdown';

export interface Props {
  markdown: string;
  className?: string;
}

const Markdown: React.FC<Props> = ({ markdown }) => {
  const [safeMarkdown, setSafeMarkdown] = useState('');

  useEffect(() => {
    setSafeMarkdown(DOMPurify.sanitize(MD.toHTML(markdown)));
  }, [markdown]);

  if (typeof markdown !== 'string') {
    Log.error(new Error(`Markdown: Invalid markdown property. Expected string but received ${typeof markdown}`));

    return <></>;
  }

  return (
    <>
      <div
        className="prose max-w-[1024px] p-24 md:p-56 lg:p-84"
        dangerouslySetInnerHTML={{ __html: safeMarkdown }}
      ></div>
    </>
  );
};

export default Markdown;
