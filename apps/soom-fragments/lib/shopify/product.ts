import { storefrontClient } from './client'

export async function fetchProductDetails(productId: string) {
  try {
    const { data } = await storefrontClient.query({
      query: `
        query ProductDetails($id: ID!) {
          product(id: $id) {
            id
            title
            description
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                }
              }
            }
            tags
            collections(first: 5) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        }
      `,
      variables: {
        id: productId,
      },
    })

    return data.product
  } catch (error) {
    console.error('Error fetching product details:', error)
    return null
  }
}
