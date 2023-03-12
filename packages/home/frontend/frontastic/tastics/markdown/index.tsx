import Markdown, { Props as MarkdownProps } from 'components/commercetools-ui/organisms/markdown';

interface Props {
  data: MarkdownProps;
}

const MarkdownTastic = ({ data }: Props) => {
  return (
    <div className="prose max-w-[1024px] p-24 md:p-56 lg:p-84">
      <Markdown {...data} />
    </div>
  );
};

export default MarkdownTastic;
