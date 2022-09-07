import React, { useCallback, useEffect, useState } from 'react';
import { Reference, ReferenceLink } from 'helpers/reference';

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
    <div className="w-full bg-dark-400 p-3">
      <p className="text-center text-xs text-white">
        {previewText.prefix}
        <ReferenceLink target={target} className="underline underline-offset-1">
          {previewText.middle}
        </ReferenceLink>
        {previewText.suffix}
      </p>
    </div>
  );
};

export default AnnouncementBar;
