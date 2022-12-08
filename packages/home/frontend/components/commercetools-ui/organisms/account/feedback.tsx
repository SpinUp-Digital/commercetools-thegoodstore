import { FC } from 'react';
import Typography from 'components/commercetools-ui/atoms/typography';
import useClassNames from 'helpers/hooks/useClassNames';

type FeedbackProps = {
  error: string;
  success: string;
};

const Feedback: FC<FeedbackProps> = ({ error, success }) => {
  const feedBackElementClassName = useClassNames(['mb-12 capitalize', success ? 'text-green-600' : 'text-accent-red']);

  return (
    (error || success) && (
      <Typography fontSize={12} className={feedBackElementClassName}>
        {error || success}
      </Typography>
    )
  );
};

export default Feedback;
