import algoliasearch from "algoliasearch";

const client = algoliasearch("J93KSPHMZ7", "142d9e1c3c49662d94458c4daeb39b1d");
export const productsIndex = client.initIndex("products");