// src/utils/shopify.ts

/**
 * Creates a Shopify app installation URL with the user's ID as a query parameter
 * This allows mapping the Shopify store to the user in your external system
 */
export const createShopifyAppInstallUrl = (userId: string) => {
  // The base URL for your Gadget app's Shopify install endpoint
  const gadgetAppUrl = 'https://soomdev.gadget.app/api/shopify/install';
  
  // Add the external_user_id query parameter
  return `${gadgetAppUrl}?external_user_id=${encodeURIComponent(userId)}`;
};

