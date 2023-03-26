import Markdown, { Props as MarkdownProps } from 'components/commercetools-ui/organisms/markdown';
import useClassNames from 'helpers/hooks/useClassNames';

interface Props {
  data: MarkdownProps & { fullWidth: boolean };
}

const MarkdownTastic = ({ data: { fullWidth = false, ...data } }: Props) => {
  const classNames = useClassNames(['prose p-24 md:p-56 lg:p-84', !fullWidth ? 'max-w-[1024px]' : 'max-w-full']);

  return (
    <div className={classNames}>
      <Markdown {...data} />
    </div>
  );
};

export default MarkdownTastic;
