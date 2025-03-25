import { shopifyAdmin } from '@shopify/admin-api-client'
import { createStorefrontApiClient } from '@shopify/storefront-api-client'

// Storefront API client
export const storefrontClient = createStorefrontApiClient({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN || '',
  apiVersion: '2023-10',
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '',
})

// Admin API client
export const adminClient = shopifyAdmin({
  storeDomain: process.env.SHOPIFY_STORE_DOMAIN || '',
  apiVersion: '2023-10',
  accessToken: process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '',
})
