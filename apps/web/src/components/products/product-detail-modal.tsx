'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import {
  BarChart2,
  Calendar,
  Edit,
  Heart,
  Package,
  Share2,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import {
  CheckCircle,
  Cog,
  Copy,
  Eye,
  Mail,
  MailOpen,
  MousePointerClick,
  Shield,
  Type,
} from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@documenso/ui/primitives/accordion';
import { Badge } from '@documenso/ui/primitives/badge';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@documenso/ui/primitives/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@documenso/ui/primitives/select';
import { Separator } from '@documenso/ui/primitives/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@documenso/ui/primitives/tabs';

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

type ProductDetailProps = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProductDetailModal({ product, open, onOpenChange }: ProductDetailProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState<Product | null>(null);

  // Update editedProduct when product changes
  useEffect(() => {
    if (product) {
      setEditedProduct({ ...product });
    }
  }, [product]);

  // If product or editedProduct is null, don't render anything
  if (!product || !editedProduct) return null;

  const toggleEditMode = () => {
    if (isEditing) {
      // Reset changes if canceling
      setEditedProduct({ ...product });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = () => {
    // Here you would typically save changes to your backend
    // For this example, we'll just update the local state
    onOpenChange(false); // Close the modal
    setIsEditing(false);
    // You would typically call an API here to save the changes
    console.log('Saving changes:', editedProduct);
  };

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setEditedProduct({
      ...editedProduct,
      [field]: value,
    });
  };

  const statusColor =
    editedProduct.status === 'In Stock'
      ? 'default'
      : editedProduct.status === 'Low Stock'
        ? 'warning'
        : 'destructive';

  const copyToClipboard = (text: string) => {
    void navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] sm:max-w-[800px] md:max-w-[1000px] lg:max-w-[1200px] overflow-y-auto p-0">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
          {/* Product Images Section */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border">
              <Image
                src={editedProduct.image || '/placeholder.svg?height=600&width=600'}
                alt={editedProduct.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="hover:ring-primary relative aspect-square cursor-pointer overflow-hidden rounded-md border hover:ring-2"
                >
                  <Image
                    src={`/placeholder.svg?height=150&width=150&text=Image ${i}`}
                    alt={`Product view ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            <DialogHeader className="space-y-2 text-left">
              <div className="flex items-center justify-between">
                <Badge variant="default" className="text-xs font-normal">
                  {editedProduct.category}
                </Badge>
                <div className="flex items-center gap-2">
                  <button className="hover:bg-muted rounded-full p-2">
                    <Heart className="text-muted-foreground h-5 w-5" />
                  </button>
                  <button className="hover:bg-muted rounded-full p-2">
                    <Share2 className="text-muted-foreground h-5 w-5" />
                  </button>
                </div>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProduct.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="border-input w-full border-b bg-transparent px-0 py-1 text-2xl font-bold focus-visible:outline-none focus-visible:ring-0"
                />
              ) : (
                <DialogTitle className="text-2xl font-bold">{editedProduct.name}</DialogTitle>
              )}
              <div className="flex items-center gap-4">
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold">$</span>
                    <input
                      type="number"
                      value={editedProduct.price}
                      onChange={(e) =>
                        handleInputChange('price', Number.parseFloat(e.target.value))
                      }
                      className="border-input w-32 border-b bg-transparent px-0 py-1 text-2xl font-bold focus-visible:outline-none focus-visible:ring-0"
                    />
                  </div>
                ) : (
                  <span className="text-2xl font-bold">${editedProduct.price.toFixed(2)}</span>
                )}
                {isEditing ? (
                  <select
                    value={editedProduct.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                    className="border-input bg-background h-8 rounded-md border px-2 text-sm"
                  >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                ) : (
                  <Badge variant={statusColor}>{editedProduct.status}</Badge>
                )}
              </div>
            </DialogHeader>

            {isEditing ? (
              <textarea
                value={editedProduct.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
              />
            ) : (
              <p className="text-muted-foreground">{editedProduct.description}</p>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">SKU</p>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProduct.sku}
                    onChange={(e) => handleInputChange('sku', e.target.value)}
                    className="border-input bg-background w-full rounded-md border px-3 py-1 text-sm"
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">{editedProduct.sku}</p>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Stock</p>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProduct.stock}
                    onChange={(e) => handleInputChange('stock', Number.parseInt(e.target.value))}
                    className="border-input bg-background w-full rounded-md border px-3 py-1 text-sm"
                  />
                ) : (
                  <p className="text-muted-foreground text-sm">{editedProduct.stock} units</p>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Category</p>
                {isEditing ? (
                  <select
                    value={editedProduct.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="border-input bg-background w-full rounded-md border px-3 py-1 text-sm"
                  >
                    <option value="Accessories">Accessories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Fitness">Fitness</option>
                  </select>
                ) : (
                  <p className="text-muted-foreground text-sm">{editedProduct.category}</p>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-muted-foreground text-sm">March 15, 2025</p>
              </div>
            </div>

            <Separator />

            <Tabs defaultValue="details">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="marketing">Marketing Copy</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Product Description</h4>
                  <p className="text-muted-foreground text-sm">
                    {editedProduct.description} This premium product is designed with quality
                    materials and expert craftsmanship to ensure durability and customer
                    satisfaction. Perfect for everyday use and special occasions alike.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Features</h4>
                  <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-sm">
                    <li>Premium quality materials</li>
                    <li>Durable construction</li>
                    <li>Elegant design</li>
                    <li>Versatile functionality</li>
                    <li>Easy maintenance</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="specifications" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Dimensions', field: 'dimensions', value: '10" x 8" x 2"' },
                    { label: 'Weight', field: 'weight', value: '1.2 lbs' },
                    {
                      label: 'Materials',
                      field: 'materials',
                      value: 'Premium materials specific to product',
                    },
                    { label: 'Color Options', field: 'colors', value: 'Black, Brown, Tan' },
                    { label: 'Warranty', field: 'warranty', value: '1 Year Limited' },
                    { label: 'Country of Origin', field: 'origin', value: 'United States' },
                  ].map((spec) => (
                    <div key={spec.field} className="space-y-1">
                      <p className="text-sm font-medium">{spec.label}</p>
                      {isEditing ? (
                        <input
                          type="text"
                          defaultValue={editedProduct[spec.field] || spec.value}
                          onChange={(e) => handleInputChange(spec.field, e.target.value)}
                          className="border-input bg-background w-full rounded-md border px-3 py-1 text-sm"
                        />
                      ) : (
                        <p className="text-muted-foreground text-sm">
                          {editedProduct[spec.field] || spec.value}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="inventory" className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Current Stock</p>
                    <p className="text-muted-foreground text-sm">{editedProduct.stock} units</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Reserved</p>
                    <p className="text-muted-foreground text-sm">5 units</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Available</p>
                    <p className="text-muted-foreground text-sm">
                      {Math.max(0, editedProduct.stock - 5)} units
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Reorder Point</p>
                    <p className="text-muted-foreground text-sm">10 units</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Warehouse</p>
                    <p className="text-muted-foreground text-sm">Main Warehouse</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Shelf Location</p>
                    <p className="text-muted-foreground text-sm">A12-B34</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="marketing" className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">AI-Generated Marketing Copy</h3>
                  <div className="text-muted-foreground text-xs">Generated on March 16, 2025</div>
                </div>

                {/* Marketing Copy Accordion */}
                <Accordion type="single" collapsible className="w-full">
                  {/* Headlines Section */}
                  <AccordionItem value="headlines">
                    <AccordionTrigger className="hover:bg-muted/50 rounded-md px-3">
                      <div className="flex items-center gap-2">
                        <Type className="text-primary h-4 w-4" />
                        <span>Headlines & Sub-headlines</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted/20 mt-2 rounded-md border p-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">Primary Headlines</h4>
                            <button
                              onClick={() =>
                                copyToClipboard(
                                  'Experience Unmatched Quality with Our Premium ' +
                                    editedProduct.name,
                                )
                              }
                              className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs"
                            >
                              <Copy className="h-3 w-3" />
                              <span>Copy All</span>
                            </button>
                          </div>
                          <div className="space-y-2">
                            {[
                              `Experience Unmatched Quality with Our Premium ${editedProduct.name}`,
                              `Discover Why Our ${editedProduct.name} Stands Above the Rest`,
                              `The ${editedProduct.name} That's Changing How People Think About ${editedProduct.category}`,
                              `Elevate Your Everyday with Our Exceptional ${editedProduct.name}`,
                            ].map((headline, i) => (
                              <div
                                key={i}
                                className="bg-background group relative rounded-md border p-3"
                              >
                                <p className="pr-6">{headline}</p>
                                <button
                                  onClick={() => copyToClipboard(headline)}
                                  className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                  <Copy className="text-muted-foreground hover:text-primary h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">Sub-headlines</h4>
                            <button className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs">
                              <Copy className="h-3 w-3" />
                              <span>Copy All</span>
                            </button>
                          </div>
                          <div className="space-y-2">
                            {[
                              `Crafted with precision for those who demand the best`,
                              `Join thousands of satisfied customers who've made the switch`,
                              `Designed to enhance your lifestyle while solving everyday problems`,
                              `The perfect blend of style, functionality, and durability`,
                            ].map((subheadline, i) => (
                              <div
                                key={i}
                                className="bg-background group relative rounded-md border p-3"
                              >
                                <p className="pr-6">{subheadline}</p>
                                <button
                                  onClick={() => copyToClipboard(subheadline)}
                                  className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                                >
                                  <Copy className="text-muted-foreground hover:text-primary h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Benefits Section */}
                  <AccordionItem value="benefits">
                    <AccordionTrigger className="hover:bg-muted/50 rounded-md px-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-primary h-4 w-4" />
                        <span>Product Benefits</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted/20 mt-2 rounded-md border p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Key Benefits</h4>
                          <button className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs">
                            <Copy className="h-3 w-3" />
                            <span>Copy All</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {[
                            `Saves you time with its intuitive design and easy-to-use features`,
                            `Enhances your productivity while reducing stress and frustration`,
                            `Built to last with premium materials that withstand daily use`,
                            `Versatile functionality that adapts to your changing needs`,
                            `Elegant design that complements any style or setting`,
                            `Eco-friendly materials that you can feel good about using`,
                          ].map((benefit, i) => (
                            <div
                              key={i}
                              className="bg-background group relative rounded-md border p-3"
                            >
                              <p className="pr-6">{benefit}</p>
                              <button
                                onClick={() => copyToClipboard(benefit)}
                                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <Copy className="text-muted-foreground hover:text-primary h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Credibility Section */}
                  <AccordionItem value="credibility">
                    <AccordionTrigger className="hover:bg-muted/50 rounded-md px-3">
                      <div className="flex items-center gap-2">
                        <Shield className="text-primary h-4 w-4" />
                        <span>Credibility Statements</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted/20 mt-2 rounded-md border p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Trust Builders</h4>
                          <button className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs">
                            <Copy className="h-3 w-3" />
                            <span>Copy All</span>
                          </button>
                        </div>
                        <div className="space-y-2">
                          {[
                            `Trusted by over 10,000 customers with a 4.8/5 average rating`,
                            `Featured in leading publications including Forbes and The New York Times`,
                            `Backed by our industry-leading 2-year warranty and 30-day satisfaction guarantee`,
                            `Developed in collaboration with experts in the field to ensure superior performance`,
                            `Made in the USA with ethically sourced materials and sustainable practices`,
                          ].map((credibility, i) => (
                            <div
                              key={i}
                              className="bg-background group relative rounded-md border p-3"
                            >
                              <p className="pr-6">{credibility}</p>
                              <button
                                onClick={() => copyToClipboard(credibility)}
                                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <Copy className="text-muted-foreground hover:text-primary h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Mini-Mechanisms Section */}
                  <AccordionItem value="mechanisms">
                    <AccordionTrigger className="hover:bg-muted/50 rounded-md px-3">
                      <div className="flex items-center gap-2">
                        <Cog className="text-primary h-4 w-4" />
                        <span>Mini-Mechanisms</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted/20 mt-2 rounded-md border p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">How It Works</h4>
                          <button className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs">
                            <Copy className="h-3 w-3" />
                            <span>Copy All</span>
                          </button>
                        </div>
                        <div className="space-y-3">
                          {[
                            `Our proprietary design combines cutting-edge technology with traditional craftsmanship to create a product that outperforms the competition in every way.`,
                            `The secret lies in our innovative approach to ${editedProduct.category} design, where we've eliminated common pain points and enhanced the features that matter most.`,
                            `Through extensive research and development, we've created a unique solution that addresses the three most common problems users face with similar products.`,
                          ].map((mechanism, i) => (
                            <div
                              key={i}
                              className="bg-background group relative rounded-md border p-3"
                            >
                              <p className="pr-6">{mechanism}</p>
                              <button
                                onClick={() => copyToClipboard(mechanism)}
                                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <Copy className="text-muted-foreground hover:text-primary h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Email Subject Lines Section */}
                  <AccordionItem value="subject-lines">
                    <AccordionTrigger className="hover:bg-muted/50 rounded-md px-3">
                      <div className="flex items-center gap-2">
                        <Mail className="text-primary h-4 w-4" />
                        <span>Email Subject Lines</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted/20 mt-2 rounded-md border p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">High-Converting Subject Lines</h4>
                          <div className="flex items-center gap-2">
                            <Select defaultValue="all">
                              <SelectTrigger className="h-8 w-[150px]">
                                <SelectValue placeholder="Filter by type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="promotional">Promotional</SelectItem>
                                <SelectItem value="announcement">Announcement</SelectItem>
                                <SelectItem value="scarcity">Scarcity</SelectItem>
                                <SelectItem value="curiosity">Curiosity</SelectItem>
                              </SelectContent>
                            </Select>
                            <button className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs">
                              <Copy className="h-3 w-3" />
                              <span>Copy All</span>
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {[
                            {
                              text: `Introducing the ${editedProduct.name} - Your Life Just Got Easier`,
                              type: 'announcement',
                            },
                            {
                              text: `[LAST CHANCE] Only 24 Hours Left to Get Your ${editedProduct.name}`,
                              type: 'scarcity',
                            },
                            {
                              text: `The Secret to Better ${editedProduct.category} (Hint: It's Our ${editedProduct.name})`,
                              type: 'curiosity',
                            },
                            {
                              text: `Save 15% on Our Best-Selling ${editedProduct.name} This Week Only`,
                              type: 'promotional',
                            },
                            {
                              text: `5 Reasons Why Our Customers Love the ${editedProduct.name}`,
                              type: 'curiosity',
                            },
                            {
                              text: `Just Restocked: The ${editedProduct.name} is Back (Limited Supply)`,
                              type: 'scarcity',
                            },
                            {
                              text: `See What Makes Our ${editedProduct.name} Different From the Rest`,
                              type: 'curiosity',
                            },
                            {
                              text: `Special Offer Inside: Upgrade Your ${editedProduct.category} Experience Today`,
                              type: 'promotional',
                            },
                          ].map((subject, i) => (
                            <div
                              key={i}
                              className="bg-background group relative rounded-md border p-3"
                            >
                              <div className="mb-1 flex items-center justify-between">
                                <Badge variant="default" className="text-xs">
                                  {subject.type}
                                </Badge>
                                <span className="text-muted-foreground text-xs">42% open rate</span>
                              </div>
                              <p className="pr-6">{subject.text}</p>
                              <button
                                onClick={() => copyToClipboard(subject.text)}
                                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <Copy className="text-muted-foreground hover:text-primary h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Calls to Action Section */}
                  <AccordionItem value="cta">
                    <AccordionTrigger className="hover:bg-muted/50 rounded-md px-3">
                      <div className="flex items-center gap-2">
                        <MousePointerClick className="text-primary h-4 w-4" />
                        <span>Calls to Action</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted/20 mt-2 rounded-md border p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Compelling CTAs</h4>
                          <button className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs">
                            <Copy className="h-3 w-3" />
                            <span>Copy All</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {[
                            `Get Your ${editedProduct.name} Today`,
                            `Experience the Difference Now`,
                            `Upgrade Your ${editedProduct.category} Experience`,
                            `Join Thousands of Satisfied Customers`,
                            `Claim Your Limited-Time Offer`,
                            `Start Your Journey to Better ${editedProduct.category}`,
                            `Add to Cart and Transform Your Daily Routine`,
                            `Secure Yours Before They're Gone`,
                          ].map((cta, i) => (
                            <div
                              key={i}
                              className="bg-background group relative rounded-md border p-3"
                            >
                              <p className="pr-6">{cta}</p>
                              <button
                                onClick={() => copyToClipboard(cta)}
                                className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                <Copy className="text-muted-foreground hover:text-primary h-4 w-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  {/* Email Templates Section */}
                  <AccordionItem value="email-templates">
                    <AccordionTrigger className="hover:bg-muted/50 rounded-md px-3">
                      <div className="flex items-center gap-2">
                        <MailOpen className="text-primary h-4 w-4" />
                        <span>Email Marketing Templates</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="bg-muted/20 mt-2 rounded-md border p-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Ready-to-Use Email Templates</h4>
                          <div className="flex items-center gap-2">
                            <Select defaultValue="product-launch">
                              <SelectTrigger className="h-8 w-[180px]">
                                <SelectValue placeholder="Email type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="product-launch">Product Launch</SelectItem>
                                <SelectItem value="promotional">Promotional</SelectItem>
                                <SelectItem value="abandoned-cart">Abandoned Cart</SelectItem>
                                <SelectItem value="follow-up">Follow-up</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-md border">
                          <div className="bg-muted flex items-center justify-between p-3">
                            <div className="flex items-center gap-2">
                              <Badge>Product Launch</Badge>
                              <span className="text-sm">
                                Introducing Our New {editedProduct.name}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs">
                                <Eye className="h-3 w-3" />
                                <span>Preview</span>
                              </button>
                              <button className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs">
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </button>
                            </div>
                          </div>
                          <div className="bg-background p-4">
                            <div className="prose prose-sm max-w-none">
                              <p>
                                Subject: Introducing the {editedProduct.name} - Your Life Just Got
                                Easier
                              </p>
                              <p>Hi [Customer Name],</p>
                              <p>
                                We're thrilled to announce the launch of our newest addition to the
                                [Brand] family: the {editedProduct.name}.
                              </p>
                              <p>
                                After months of development and testing, we've created a{' '}
                                {editedProduct.category} solution that addresses the most common
                                challenges our customers face:
                              </p>
                              <ul>
                                <li>
                                  Premium quality materials ensure durability and long-lasting
                                  performance
                                </li>
                                <li>Intuitive design makes it easier than ever to [benefit]</li>
                                <li>Versatile functionality adapts to your changing needs</li>
                              </ul>
                              <p>
                                But don't just take our word for it. Here's what early users are
                                saying:
                              </p>
                              <p>
                                <em>
                                  "The {editedProduct.name} has completely transformed how I
                                  approach [activity]. I can't imagine going back to my old [product
                                  category]." - Sarah T.
                                </em>
                              </p>
                              <p>
                                As a valued customer, we're offering you exclusive early access to
                                the {editedProduct.name} before our official public launch, plus 15%
                                off your purchase with code EARLYACCESS.
                              </p>
                              <p>
                                <strong>This offer expires in 48 hours, so don't wait!</strong>
                              </p>
                              <p>[CTA Button: Get Your {editedProduct.name} Today]</p>
                              <p>We can't wait to hear what you think of our newest innovation.</p>
                              <p>
                                Best regards,
                                <br />
                                [Your Name]
                                <br />
                                Founder, [Brand]
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="overflow-hidden rounded-md border">
                          <div className="bg-muted flex items-center justify-between p-3">
                            <div className="flex items-center gap-2">
                              <Badge>Abandoned Cart</Badge>
                              <span className="text-sm">
                                Still Thinking About the {editedProduct.name}?
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs">
                                <Eye className="h-3 w-3" />
                                <span>Preview</span>
                              </button>
                              <button className="text-muted-foreground hover:text-primary flex items-center gap-1 text-xs">
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </button>
                            </div>
                          </div>
                          <div className="bg-background p-4">
                            <div className="prose prose-sm max-w-none">
                              <p>
                                Subject: Your {editedProduct.name} is Waiting - Complete Your
                                Purchase
                              </p>
                              <p>Hi [Customer Name],</p>
                              <p>
                                We noticed you left a {editedProduct.name} in your shopping cart. No
                                pressure, but we wanted to make sure you didn't miss out on
                                transforming your [relevant activity].
                              </p>
                              <p>
                                The {editedProduct.name} is one of our best-selling items, and for
                                good reason:
                              </p>
                              <ul>
                                <li>It's backed by our 30-day satisfaction guarantee</li>
                                <li>Over 1,000 5-star reviews from happy customers</li>
                                <li>Free shipping on all orders over $50</li>
                              </ul>
                              <p>
                                To make your decision easier, we're offering a special 10% discount
                                if you complete your purchase in the next 24 hours. Just use code
                                WELCOME10 at checkout.
                              </p>
                              <p>[CTA Button: Complete Your Purchase]</p>
                              <p>
                                If you have any questions about the {editedProduct.name}, just reply
                                to this email. We're here to help!
                              </p>
                              <p>
                                Best regards,
                                <br />
                                The [Brand] Team
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sales and Performance Section */}
        <div className="bg-muted/30 border-t p-6">
          <h3 className="mb-4 text-lg font-medium">Sales & Performance</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="bg-background rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-muted-foreground h-5 w-5" />
                <h4 className="font-medium">Total Sales</h4>
              </div>
              <p className="mt-2 text-2xl font-bold">1,245</p>
              <p className="text-muted-foreground text-xs">+12% from last month</p>
            </div>
            <div className="bg-background rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Package className="text-muted-foreground h-5 w-5" />
                <h4 className="font-medium">Returns</h4>
              </div>
              <p className="mt-2 text-2xl font-bold">23</p>
              <p className="text-muted-foreground text-xs">1.8% return rate</p>
            </div>
            <div className="bg-background rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Truck className="text-muted-foreground h-5 w-5" />
                <h4 className="font-medium">Shipping</h4>
              </div>
              <p className="mt-2 text-2xl font-bold">2-3 days</p>
              <p className="text-muted-foreground text-xs">Average delivery time</p>
            </div>
            <div className="bg-background rounded-lg border p-4">
              <div className="flex items-center gap-2">
                <Calendar className="text-muted-foreground h-5 w-5" />
                <h4 className="font-medium">Last Order</h4>
              </div>
              <p className="mt-2 text-2xl font-bold">Today</p>
              <p className="text-muted-foreground text-xs">2 hours ago</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="border-t p-6">
          <h3 className="mb-4 text-lg font-medium">Related Products</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="overflow-hidden rounded-lg border">
                <div className="relative aspect-square">
                  <Image
                    src={`/placeholder.svg?height=200&width=200&text=Related ${i}`}
                    alt={`Related product ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <h4 className="truncate text-sm font-medium">Related Product {i}</h4>
                  <p className="text-muted-foreground mt-1 text-sm">
                    ${(editedProduct.price * 0.8 + i * 10).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DialogFooter className="border-t p-6">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveChanges}
                    className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={toggleEditMode}
                    className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={toggleEditMode}
                  className="ring-offset-background focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Product
                </button>
              )}
            </div>
            {!isEditing && (
              <div className="flex items-center gap-2">
                <button className="ring-offset-background focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  View Analytics
                </button>
              </div>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
