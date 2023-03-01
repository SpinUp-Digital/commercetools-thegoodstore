import Markdown, { Props as MarkdownProps } from 'components/commercetools-ui/organisms/markdown';

interface Props {
  data: MarkdownProps;
}

const MarkdownTastic = ({ data }: Props) => {
  return <Markdown {...data} />;
};

export default MarkdownTastic;
