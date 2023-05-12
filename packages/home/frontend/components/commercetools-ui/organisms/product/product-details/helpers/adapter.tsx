import { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import { Product } from '@commercetools/frontend-domain-types/product/Product';
import { UIProduct } from 'components/commercetools-ui/organisms/product/product-details/types';
import usePreloadImages from 'helpers/hooks/usePreloadImages';
import { toUIColor } from 'helpers/mappers/toUIColor';
import { toUIProduct } from 'helpers/mappers/toUIProduct';
import { toUISize } from 'helpers/mappers/toUIsize';
import { Variant } from 'types/product';
import ProductDetails, { ProductDetailsProps } from '..';

type ProductDetailsAdapterProps = {
  product: Product;
  inModalVersion?: ProductDetailsProps['inModalVersion'];
  setIsOpen?: (value: boolean) => void;
  onAddToCart?: () => void;
};

const ProductDetailsAdapter: FC<React.PropsWithChildren<ProductDetailsAdapterProps>> = ({
  product,
  inModalVersion,
  setIsOpen,
  onAddToCart,
}) => {
  const router = useRouter();

  const [variant, setVariant] = useState<Variant>();
  const [mappedProduct, setMappedProduct] = useState<UIProduct>();

  usePreloadImages(product.variants.map((variant) => variant.images ?? []).flat());

  useEffect(() => {
    if (product && variant) {
      const colors = toUIColor(product);
      const sizes = toUISize(product);
      const productToUse = toUIProduct(product, variant, colors, sizes);
      setMappedProduct({ ...productToUse, images: [productToUse.images[0]] });
    }
  }, [product, variant]);

  useEffect(() => {
    if (!product) return;

    if (inModalVersion) {
      setVariant(product?.variants[0]);
    } else {
      const currentVariantPath = router.asPath.split('/');
      const currentVariantSKU = currentVariantPath[3]?.split('?')[0];
      const currentVariantIndex = product?.variants.findIndex(({ sku }) => sku == currentVariantSKU);
      setVariant(product.variants[currentVariantIndex] ?? product.variants?.[0]);
    }
  }, [inModalVersion, product, router.asPath]);

  useEffect(() => {
    router.beforePopState(({ as }) => {
      router.replace(as);
      return false;
    });
  }, [router]);

  const handleChangeVariant = (sku: string) => {
    const variantsToUse = product.variants.find((variant) => variant.sku === sku);
    setVariant(variantsToUse);
  };

  if (!product || !variant) return <></>;

  return (
    <ProductDetails
      product={mappedProduct as UIProduct}
      variant={variant}
      url={product._url}
      inModalVersion={inModalVersion}
      onChangeVariant={handleChangeVariant}
      setIsOpen={setIsOpen}
      onAddToCart={onAddToCart}
    />
  );
};

export default ProductDetailsAdapter;
