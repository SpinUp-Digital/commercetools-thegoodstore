import React from 'react';
import Typography from '..';

const TypographyContent = () => {
  return (
    <div className="ml-44">
      <Typography fontSize={28} className="mt-40 w-[40%] font-bold text-black">
        Typography
      </Typography>
      <Typography fontSize={20} lineHeight="loose" className="mt-20 w-[60%] text-neutral-700">
        The Typography Component consists of pre-defined styles for various text elements. The Typography components can
        be used to create a consistent and visually appealing typography system and includes font size, line height,
        color, and spacing.
      </Typography>
      <div className="mt-52 flex">
        <Typography fontSize={24} className="w-200">
          This is Regular Font 24px Inter Font Text
        </Typography>

        <Typography medium fontSize={24} className="ml-20 w-200">
          This is Medium Font 24px Inter Font Text
        </Typography>

        <Typography medium fontFamily="libre" fontSize={24} className="ml-20 w-200">
          This is Font 24px Libre Baskerville Font Text
        </Typography>
      </div>
      <div className="mt-40 flex">
        <Typography fontSize={24} lineHeight="tight" className="w-200">
          This is Tight line height for 24 px Text
        </Typography>

        <Typography fontSize={24} lineHeight="normal" className="ml-20 w-200">
          This is Normal line height for 24 px Text
        </Typography>

        <Typography fontFamily="inter" lineHeight="loose" fontSize={24} className="ml-20 w-200">
          This is Loose line height for 24 px Text
        </Typography>
      </div>
      <div className="mt-40 flex">
        <Typography fontSize={24} lineHeight="tight" align="left" className="w-200">
          This is tight left alignment for 24 px Text
        </Typography>

        <Typography fontSize={24} align="center" lineHeight="normal" className="ml-20 w-200">
          This is normal center alignment for 24 px Text
        </Typography>

        <Typography fontFamily="inter" align="right" lineHeight="loose" fontSize={24} className="ml-20 w-200">
          This is loose right alignment for 24 px Text
        </Typography>
      </div>
    </div>
  );
};

export default TypographyContent;
