// utils/gadgetApi.ts
import { Client } from '@gadget-client/soomdev';

// Create a properly initialized client instance
const baseApi = new Client({
  authenticationMode: {
    apiKey: process.env.GADGET_API_KEY || '',
  },
});

/**
 * Execute a GraphQL query against the Gadget API
 */
async function executeGadgetQuery(query: string, variables: Record<string, any>) {
  const response = await fetch('https://soomdev.gadget.app/api/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GADGET_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  return result.data;
}

/**
 * Gets products from a Shopify store using direct GraphQL
 */
export async function getShopifyProducts(
  shopId: string,
  options: {
    limit?: number;
    productIds?: string[];
    filter?: Record<string, any>;
    sort?: Record<string, 'Ascending' | 'Descending'>;
  } = {},
) {
  try {
    const { limit = 250 } = options;

    const query = `
      query GetShopifyProducts($shopId: String!, $limit: Int!) {
        shopifyProducts(
          filter: { shopId: { equals: $shopId } }
          first: $limit
        ) {
          edges {
            node {
              id
              title
              handle
              body
              status
              tags
              productType
              vendor
              variants {
                edges {
                  node {
                    id
                    title
                    price
                    sku
                    inventoryQuantity
                  }
                }
              }
              media {
                edges {
                  node {
                    id
                    mediaContentType
                    status
                    image
                  }
                }
              }
            }
          }
        }
      }
    `;

    const data = await executeGadgetQuery(query, {
      shopId,
      limit,
    });

    return {
      success: true,
      products: data.shopifyProducts,
    };
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Gets all store data including products, collections, and brand info
 */
export async function getStoreData() {
  try {
    // Call the getStoreData global action
    const storeData = await baseApi.getStoreData.run();

    return storeData;
  } catch (error) {
    console.error('Error fetching store data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Gets a single Shopify product by ID
 * @param productId The Shopify product ID
 */
export async function getShopifyProduct(productId: string) {
  try {
    // Execute the query
    const product = await baseApi.shopifyProduct.findOne(productId, {
      select: {
        id: true,
        title: true,
        handle: true,
        body: true,
        status: true,
        tags: true,
        productType: true,
        vendor: true,
        variants: {
          edges: {
            node: {
              id: true,
              title: true,
              price: true,
              sku: true,
              inventoryQuantity: true,
            },
          },
        },
        media: {
          edges: {
            node: {
              id: true,
              file: {
                url: true,
                filename: true,
                mimeType: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true,
      product,
    };
  } catch (error) {
    console.error(`Error fetching Shopify product ${productId}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
