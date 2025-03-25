import React from 'react';
import { createShopifyAppInstallUrl } from '../../../utils/shopify';
import { Button } from '@documenso/ui/primitives/button';
type Props = {
  userId: string;
  className?: string;
};

export default function ShopifyConnectButton({ userId, className = '' }: Props) {
  const handleConnect = () => {
    if (!userId) {
      console.error("No user ID available");
      return;
    }
    
    // Use the utility function to generate the URL
    const installUrl = createShopifyAppInstallUrl(userId);
    window.open(installUrl, '_blank');
  };

  return (
    <Button onClick={handleConnect} className={className}>Connect to Shopify</Button>
  );
}
