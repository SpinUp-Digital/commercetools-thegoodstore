import { useCallback } from 'react';
import { useProduct } from 'frontastic';

const useRefinementHelpers = () => {
  const { categories } = useProduct();

  const resolveLabel = useCallback(
    (attribute: string, label: string) => {
      if (attribute.match(/categoryId/))
        return (categories ?? []).find((category) => category.categoryId === label)?.name ?? '';

      return label;
    },
    [categories],
  );

  return { resolveLabel };
};

export default useRefinementHelpers;
