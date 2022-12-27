import Markdown, { Props as MarkdownProps } from 'components/commercetools-ui/organisms/content/markdown';

interface Props {
  data: MarkdownProps;
}

const MarkdownTastic = ({ data }: Props) => {
  return <Markdown text={data.text} />;
};

export default MarkdownTastic;
