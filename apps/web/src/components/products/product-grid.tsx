'use client';

import { useState } from 'react';

import Image from 'next/image';

import { Copy, Edit, Eye, MoreVertical, Trash } from 'lucide-react';

import { Badge } from '@documenso/ui/primitives/badge';
import { Card, CardContent, CardFooter } from '@documenso/ui/primitives/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@documenso/ui/primitives/dropdown-menu';

import { ProductDetailModal } from './product-detail-modal';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  status: string;
  sku: string;
  stock: number;
  category: string;
  image?: string;
  [key: string]: string | number | undefined;
}

// Mock product data
const products = [
  {
    id: '1',
    name: 'Premium Leather Wallet',
    description: 'Handcrafted genuine leather wallet with multiple card slots',
    price: 59.99,
    stock: 45,
    category: 'Accessories',
    status: 'In Stock',
    sku: 'WALLET-001',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: '2',
    name: 'Wireless Bluetooth Headphones',
    description: 'Noise-cancelling over-ear headphones with 30-hour battery life',
    price: 129.99,
    stock: 28,
    category: 'Electronics',
    status: 'In Stock',
    sku: 'AUDIO-034',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, breathable 100% organic cotton t-shirt in various colors',
    price: 24.99,
    stock: 120,
    category: 'Clothing',
    status: 'In Stock',
    sku: 'SHIRT-089',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: '4',
    name: 'Stainless Steel Water Bottle',
    description: 'Double-walled insulated bottle that keeps drinks cold for 24 hours',
    price: 34.99,
    stock: 67,
    category: 'Home & Kitchen',
    status: 'In Stock',
    sku: 'BOTTLE-056',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: '5',
    name: 'Smart Fitness Tracker',
    description: 'Waterproof fitness band with heart rate monitoring and sleep tracking',
    price: 89.99,
    stock: 15,
    category: 'Electronics',
    status: 'Low Stock',
    sku: 'FITNESS-023',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: '6',
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 handmade ceramic coffee mugs in assorted colors',
    price: 42.99,
    stock: 32,
    category: 'Home & Kitchen',
    status: 'In Stock',
    sku: 'MUG-078',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: '7',
    name: 'Bamboo Cutting Board',
    description: 'Eco-friendly bamboo cutting board with juice groove',
    price: 29.99,
    stock: 0,
    category: 'Home & Kitchen',
    status: 'Out of Stock',
    sku: 'KITCHEN-045',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: '8',
    name: 'Leather Crossbody Bag',
    description: 'Compact genuine leather crossbody bag with adjustable strap',
    price: 79.99,
    stock: 23,
    category: 'Accessories',
    status: 'In Stock',
    sku: 'BAG-012',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: '9',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with 12-hour battery life',
    price: 49.99,
    stock: 5,
    category: 'Electronics',
    status: 'Low Stock',
    sku: 'AUDIO-067',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: '10',
    name: 'Yoga Mat',
    description: 'Non-slip eco-friendly yoga mat with carrying strap',
    price: 39.99,
    stock: 42,
    category: 'Fitness',
    status: 'In Stock',
    sku: 'FITNESS-098',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: '11',
    name: 'Scented Soy Candle',
    description: 'Hand-poured soy wax candle with essential oils',
    price: 19.99,
    stock: 38,
    category: 'Home & Kitchen',
    status: 'In Stock',
    sku: 'CANDLE-034',
    image: '/placeholder.svg?height=200&width=200',
  },
  {
    id: '12',
    name: 'Stainless Steel Watch',
    description: 'Minimalist design watch with Japanese movement',
    price: 149.99,
    stock: 0,
    category: 'Accessories',
    status: 'Out of Stock',
    sku: 'WATCH-076',
    image: '/placeholder.svg?height=200&width=200',
  },
];

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover transition-all hover:scale-105"
              />
              <div className="absolute right-2 top-2">
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-background flex h-8 w-8 items-center justify-center rounded-md border">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleViewDetails(product)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit product</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Duplicate</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="truncate font-semibold">{product.name}</h3>
                </div>
                <p className="text-muted-foreground line-clamp-2 text-sm">{product.description}</p>
              </div>
            </CardContent>
            <CardFooter className="flex-col items-start p-4 pt-0">
              <div className="flex w-full items-center justify-between">
                <div className="font-bold">${product.price.toFixed(2)}</div>
                <Badge
                  variant={
                    product.status === 'In Stock'
                      ? 'default'
                      : product.status === 'Low Stock'
                        ? 'warning'
                        : 'destructive'
                  }
                >
                  {product.status}
                </Badge>
              </div>
              <div className="text-muted-foreground mt-2 flex w-full items-center justify-between text-xs">
                <div>SKU: {product.sku}</div>
                <div>Stock: {product.stock}</div>
              </div>
              <div className="mt-2 w-full">
                <Badge variant="default" className="text-xs">
                  {product.category}
                </Badge>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
