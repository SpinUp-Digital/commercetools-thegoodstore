import { useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router';
import { Product } from '@Types/product/Product';
import { Variant } from '@Types/product/Variant';
import { useWishlist } from 'frontastic';
import { UIProduct } from 'components/commercetools-ui/products/product-details/types';
import ProductDetails, { ProductDetailsProps } from '.';
import { toUIProduct } from 'helpers/mappers/toUIProduct';
import { toUIColor } from 'helpers/mappers/toUIColor';
import { toUISize } from 'helpers/mappers/toUIsize';

type ProductDetailsAdapterProps = {
  product: Product;
  inModalVersion?: ProductDetailsProps['inModalVersion'];
};

const ProductDetailsAdapter: FC<ProductDetailsAdapterProps> = ({ product, inModalVersion }) => {
  const router = useRouter();
  const wishlist = useWishlist();

  const [currentVariantId, setCurrentVariantId] = useState<string>();
  const [variant, setVariant] = useState<Variant>();
  const [mappedProduct, setMappedProduct] = useState<UIProduct>();

  useEffect(() => {
    const colors = toUIColor(product);
    const sizes = toUISize(product);
    const productToUse = toUIProduct(product, variant, colors, sizes);
    setMappedProduct(productToUse);
  }, [product, variant]);

  useEffect(() => {
    if (!currentVariantId) {
      if (inModalVersion) {
        setVariant(product?.variants[0]);
      } else {
        const currentVariantSKU = router.asPath.split('/')[3];
        const currentVariantIndex = product?.variants.findIndex(({ sku }) => sku == currentVariantSKU);
        setVariant(product.variants[currentVariantIndex]);
      }
    } else {
      const currentVariant = product?.variants.find(({ id }) => id == currentVariantId);
      setVariant(currentVariant);
    }
  }, [currentVariantId, inModalVersion, router]);

  const handleAddToWishList = () => {
    wishlist.addToWishlist(variant.sku, 1);
  };

  const handleRemoveFromWishlist = () => {
    const item = wishlist.data.lineItems.find(({ variant: { sku } }) => sku === variant.sku);
    wishlist.removeLineItem(item?.lineItemId);
  };

  return (
    <ProductDetails
      product={mappedProduct}
      variant={variant}
      url={product._url}
      onChangeVariantId={setCurrentVariantId}
      onAddToWishlist={handleAddToWishList}
      onRemoveFromWishlist={handleRemoveFromWishlist}
      inModalVersion={inModalVersion}
    />
  );
};

export default ProductDetailsAdapter;
