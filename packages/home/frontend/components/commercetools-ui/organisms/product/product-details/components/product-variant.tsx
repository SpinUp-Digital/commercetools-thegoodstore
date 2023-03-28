import { FC, useEffect, useState } from 'react';
import { Variant as VariantType } from 'types/product';
import Typography from 'components/commercetools-ui/atoms/typography';
import useClassNames from 'helpers/hooks/useClassNames';
import { useFormat } from 'helpers/hooks/useFormat';
import { discardRepeatedValues } from 'helpers/utils/discardRepeatedValues';

type ProductVariantProps = {
  className?: string;
  currentVariant: VariantType;
  variants: VariantType[];
  attribute: string;
  inModalVersion?: boolean;
  onClick?: (sku: string) => void;
};

const ProductVariant: FC<ProductVariantProps> = ({
  className,
  currentVariant,
  variants,
  attribute,
  inModalVersion,
  onClick,
}) => {
  const { formatMessage } = useFormat({ name: 'product' });

  const [variantsToUse, setVariantsToUse] = useState<VariantType[]>();

  const attributeString = attribute.toString();

  const labelClassName = useClassNames(['capitalize', `text-${inModalVersion ? 12 : 14}`]);

  useEffect(() => {
    const filteredVariants: VariantType[] = discardRepeatedValues(variants, attribute.toString());
    setVariantsToUse(filteredVariants);
  }, [variants, attribute]);

  return (
    <div className={className}>
      <div>
        <Typography medium lineHeight="loose" className={labelClassName}>
          {formatMessage({ id: attributeString, defaultMessage: attributeString })}
        </Typography>
        <Typography lineHeight="loose" fontSize={12}>
          {currentVariant?.attributes?.[`${attribute}label`]}
        </Typography>
      </div>

      <div className="mt-15 flex gap-24">
        {variantsToUse?.map(({ attributes, id, sku }, index) => (
          <div
            key={index}
            className={`h-20 w-20 rounded-full ${
              id == currentVariant.id ? 'border-2 border-neutral-500' : 'border border-neutral-300'
            } ${variantsToUse.length > 1 ? 'hover:cursor-pointer' : 'pointer-events-none'} `}
            style={{ backgroundColor: attributes?.[attribute] }}
            onClick={() => onClick?.(sku)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductVariant;
