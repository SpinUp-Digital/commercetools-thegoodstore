import { FC } from 'react';
import Button from 'components/commercetools-ui/atoms/button';
import Typography from 'components/commercetools-ui/atoms/typography';
import { useAccount } from 'frontastic';
import useBottomSectionText from '../hooks/useBottomSectionText';

type ThankYouFooterProps = {
  loading: boolean;
};

const ThankYouFooter: FC<ThankYouFooterProps> = ({ loading }) => {
  const { loggedIn } = useAccount();

  const { bottomSectionText } = useBottomSectionText(loggedIn);

  return (
    <div className="grid border-b border-neutral-400 pt-16 pb-24 md:border-b-0 lg:pb-0 lg:pt-36">
      <Typography
        className="mb-16 w-fit leading-[20px] text-primary-black md:mb-24 md:text-18 md:leading-normal"
        fontFamily="libre"
        fontSize={16}
        asSkeleton={loading}
      >
        {bottomSectionText?.title}
      </Typography>
      <Typography className="mb-24 w-fit text-secondary-black md:text-16" fontSize={14} asSkeleton={loading}>
        {bottomSectionText?.subtitle}
      </Typography>
      <Button className="w-full py-8 md:w-fit md:px-56 md:py-12" asSkeleton={loading}>
        {bottomSectionText?.cta}
      </Button>
    </div>
  );
};

export default ThankYouFooter;
