import { ProductQuery } from "@commercetools/domain-types/query/ProductQuery";
declare type GetProductPayload = {
    query: {
        id: string;
        sku: string;
    };
};
declare type ProductQueryPayload = {
    query: ProductQuery;
};
declare type QueryProductCategoriesPayload = {
    query: {
        limit?: number;
        cursor?: string;
        slug?: string;
    };
};
export { GetProductPayload, ProductQueryPayload, QueryProductCategoriesPayload };
