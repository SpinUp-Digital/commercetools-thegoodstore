import { GetProductPayload, ProductQueryPayload, QueryProductCategoriesPayload } from "../payloads/ProductPayloads";
import { FilterField } from "@commercetools/domain-types/product/FilterField";
import { Product } from "@commercetools/domain-types/product/Product";
import { Result } from "@commercetools/domain-types/product/Result";
declare type GetProductAction = (payload: GetProductPayload) => Promise<Product>;
declare type ProductQueryAction = (payload: ProductQueryPayload) => Promise<Result>;
declare type QueryProductCategoriesAction = (payload: QueryProductCategoriesPayload) => Promise<Result>;
declare type GetSearchableProductAttributesAction = () => Promise<FilterField[]>;
export { GetProductAction, ProductQueryAction, QueryProductCategoriesAction, GetSearchableProductAttributesAction, };
