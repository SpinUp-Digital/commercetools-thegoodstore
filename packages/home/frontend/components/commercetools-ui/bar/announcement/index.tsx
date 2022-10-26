import React, { useCallback, useEffect, useState } from 'react';
import Link from 'components/commercetools-ui/link';
import { Reference } from 'types/reference';

export interface Props {
  text: string;
  highlightedSubstring: string;
  target?: Reference;
}

const AnnouncementBar: React.FC<Props> = ({ text, highlightedSubstring, target }) => {
  const [previewText, setPreviewText] = useState({ prefix: text, middle: '', suffix: '' });

  const processHighlighting = useCallback(() => {
    const start = text.indexOf(highlightedSubstring);

    if (!highlightedSubstring || start === -1) {
      setPreviewText({ prefix: text, middle: '', suffix: '' });
      return;
    }

    const end = start + highlightedSubstring.length - 1;

    setPreviewText({
      prefix: text.substring(0, start),
      middle: text.substring(start, end + 1),
      suffix: text.substring(end + 1),
    });
  }, [text, highlightedSubstring]);

  useEffect(() => {
    processHighlighting();
  }, [processHighlighting]);

  return (
    <div className="w-full bg-primary-dark py-16">
      <p className="letter-[1%] text-center text-12 leading-loose text-white">
        {previewText.prefix}
        <Link link={target} className="underline underline-offset-2">
          {previewText.middle}
        </Link>
        {previewText.suffix}
      </p>
    </div>
  );
};

export default AnnouncementBar;
