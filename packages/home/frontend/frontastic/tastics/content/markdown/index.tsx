import Markdown from 'components/commercetools-ui/organisms/content/markdown';

const MarkdownTastic = ({ data }) => {
  return <Markdown text={data.markdown} />;
};

export default MarkdownTastic;
