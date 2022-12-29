import { ComponentProps, FC } from 'react';
import Button from 'components/commercetools-ui/atoms/button';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';

interface SaveOrCancelProps extends ComponentProps<'div'> {
  onSave?: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const SaveOrCancel: FC<SaveOrCancelProps> = ({ className, onSave, onCancel }) => {
  const { formatMessage } = useFormat({ name: 'common' });

  const containerClassName = useClassNames(['flex gap-12', className]);

  return (
    <div className={containerClassName}>
      <Button
        type="button"
        variant="secondary"
        className="h-40 w-112 rounded-md border border-primary-black p-0"
        onClick={onCancel}
      >
        {formatMessage({ id: 'cancel', defaultMessage: 'Cancel' })}
      </Button>
      <Button type="submit" className="h-40 w-112 p-0" onClick={onSave}>
        {formatMessage({ id: 'save', defaultMessage: 'Save' })}
      </Button>
    </div>
  );
};

export default SaveOrCancel;
