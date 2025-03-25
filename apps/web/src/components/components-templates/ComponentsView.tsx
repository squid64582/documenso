'use client';

import React, { useEffect, useState } from 'react';

import { Plus } from 'lucide-react';
import { useSession } from 'next-auth/react';

import { Button } from '@documenso/ui/primitives/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@documenso/ui/primitives/dialog';
// Import the DropdownMenu components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@documenso/ui/primitives/dropdown-menu';
import { Input } from '@documenso/ui/primitives/input';
import { Label } from '@documenso/ui/primitives/label';
import { RadioGroup, RadioGroupItem } from '@documenso/ui/primitives/radio-group';
import { ScrollArea } from '@documenso/ui/primitives/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@documenso/ui/primitives/tabs';
import { Textarea } from '@documenso/ui/primitives/textarea';

import GlossierLandingPage from './templates/glossier/glossier-landing-page';
import JavvyListicleLandingPage from './templates/javvy/javvy-listicle-landing-page';
import NurtureLifeLandingPage from './templates/nurture-life/nurture-life-landing-page';
import OnnitLandingPage from './templates/onnit/onnit-landing-page';
// Import original components
import SetuLandingPage from './templates/setu/setu-landing-page';

// Update the type definition
type LandingPageTemplate = {
  id: string;
  name: string;
  description: string;
  category: string;
  component: () => React.ReactElement;
  path: string;
  dbId?: number; // Database ID for the template
};

// Define a type for shop products
interface ShopProduct {
  id: string;
  name: string;
  description: string;
  image?: string;
}

// Define a type for database templates
interface DbTemplate {
  id: number;
  name: string;
  description: string;
  category: string;
  componentCode: string;
  path?: string;
}

interface ProductEdge {
  node: {
    id: string;
    title: string;
    body?: string;
    media?: {
      edges?: Array<{
        node: {
          file?: { url: string };
          image?: string | { url: string };
        };
      }>;
    };
  };
}

// Then update your components array declaration
const templates: LandingPageTemplate[] = [
  // UI Components

  // Layout Components

  // Section Components

  // Templates
  {
    id: 'setu-landing-page-template',
    name: 'Setu Landing Page Template',
    description:
      'A premium skincare product landing page with hero, features, product showcase, testimonials, clinical results, and promotional sections',
    category: 'Templates',
    component: SetuLandingPage,
    path: 'src/components/components-templates/templates/setu/setu-landing-page.tsx',
  },
  {
    id: 'javvy-listicle-landing-page-template',
    name: 'Javvy Listicle Landing Page Template',
    description:
      'A listicle-style landing page for coffee products with numbered reasons, product benefits, and promotional sections',
    category: 'Templates',
    component: JavvyListicleLandingPage,
    path: 'src/components/components-templates/templates/javvy/javvy-listicle-landing-page.tsx',
  },
  {
    id: 'glossier-landing-page-template',
    name: 'Glossier Landing Page Template',
    description:
      "A clean, minimalist product page template inspired by Glossier's aesthetic with product details, color selection, reviews, and related products",
    category: 'Templates',
    component: GlossierLandingPage,
    path: 'components/templates/glossier-landing-page.tsx',
  },
  {
    id: 'nurture-life-landing-page-template',
    name: 'Nurture Life Landing Page Template',
    description:
      'A kid-friendly meal delivery service landing page with promotional offers, benefits, testimonials, and hidden vegetable features',
    category: 'Templates',
    component: NurtureLifeLandingPage,
    path: 'components/templates/nurture-life-landing-page.tsx',
  },
  {
    id: 'onnit-landing-page-template',
    name: 'Onnit Landing Page Template',
    description:
      'A supplement product landing page with bold typography, product benefits, and promotional sections',
    category: 'Templates',
    component: OnnitLandingPage,
    path: 'components/templates/onnit-landing-page.tsx',
  },

  // Emails
];

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [previewComponent, setPreviewComponent] = useState<LandingPageTemplate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('preview');

  // Template workflow state
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<LandingPageTemplate | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [contextInfo, setContextInfo] = useState('');
  const [workflowStep, setWorkflowStep] = useState(1);

  // Add these states
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [shopProducts, setShopProducts] = useState<ShopProduct[]>([]);
  const { data: session } = useSession();

  // Add these new states
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  // Use the type in your state declaration
  const [dbTemplates, setDbTemplates] = useState<DbTemplate[]>([]);

  // Near the top of your component where other state variables are defined
  const [templates, setTemplates] = useState<LandingPageTemplate[]>([
    // Templates
    {
      id: 'setu-landing-page-template',
      name: 'Setu Landing Page Template',
      description:
        'A premium skincare product landing page with hero, features, product showcase, testimonials, clinical results, and promotional sections',
      category: 'Templates',
      component: SetuLandingPage,
      path: 'src/components/components-templates/templates/setu/setu-landing-page.tsx',
    },
    {
      id: 'javvy-listicle-landing-page-template',
      name: 'Javvy Listicle Landing Page Template',
      description:
        'A listicle-style landing page for coffee products with numbered reasons, product benefits, and promotional sections',
      category: 'Templates',
      component: JavvyListicleLandingPage,
      path: 'src/components/components-templates/templates/javvy/javvy-listicle-landing-page.tsx',
    },
    // Add other templates here
  ]);

  // Define categories
  const categories = [
    { id: 'All', name: 'All' },
    { id: 'UI Components', name: 'UI Components' },
    { id: 'Layout Components', name: 'Layout Components' },
    { id: 'Section Components', name: 'Section Components' },
    { id: 'Templates', name: 'Templates' },
    { id: 'Emails', name: 'Emails' },
  ];

  // Filter components based on search query and selected category
  const filteredComponents = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group components by category for display
  const groupedComponents = filteredComponents.reduce<Record<string, LandingPageTemplate[]>>(
    (acc, template) => {
      if (!acc[template.category]) {
        acc[template.category] = [];
      }
      acc[template.category].push(template);
      return acc;
    },
    {},
  );

  // Create default props for components that need them
  const getDefaultProps = (templateId: string) => {
    // For landing page templates, return empty props
    if (templateId.includes('landing-page-template')) {
      return {};
    }

    // For other components, return specific props
    switch (templateId) {
      case 'avatar-group-component':
        return {
          avatars: [
            { src: '/placeholder.svg?height=40&width=40', alt: 'User 1', fallback: 'U1' },
            { src: '/placeholder.svg?height=40&width=40', alt: 'User 2', fallback: 'U2' },
            { src: '/placeholder.svg?height=40&width=40', alt: 'User 3', fallback: 'U3' },
          ],
          max: 3,
        };
      case 'pagination-component':
        return { currentPage: 1, totalPages: 5, onPageChange: () => {} };
      case 'tooltip-component':
        return {
          content: 'Tooltip content',
          children: <Button variant="outline">Hover me</Button>,
        };
      case 'toggle-switch-component':
        return { label: 'Toggle', description: 'Toggle description' };
      case 'breadcrumbs-component':
        return {
          items: [
            { label: 'Home', href: '#' },
            { label: 'Products', href: '#' },
            { label: 'Categories', href: '#' },
          ],
        };
      case 'tag-component':
        return { text: 'Example Tag' };
      case 'alert-component':
        return { description: 'This is an alert message.' };
      case 'progress-bar-component':
        return { value: 75, label: 'Progress' };
      case 'file-upload-component':
        return { onFilesSelected: () => {} };
      default:
        return {};
    }
  };

  // Handle preview click
  const handlePreviewClick = (template: LandingPageTemplate) => {
    setPreviewComponent(template);
    setIsPreviewOpen(true);
    setActiveTab('preview');
  };

  // Handle use template click
  const handleUseTemplate = async (template: LandingPageTemplate) => {
    setSelectedTemplate(template);
    setWorkflowStep(1);
    setIsWorkflowOpen(true);

    try {
      // Fetch the template code from the filesystem
      const response = await fetch(
        `/api/component-code?path=${encodeURIComponent(template.path)}`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch component code');
      }

      const { componentCode } = await response.json();

      // Create a new template object with the component code
      const updatedTemplate = {
        ...template,
        componentCode: componentCode,
      };

      // Update the selected template state
      setSelectedTemplate(updatedTemplate);

      console.log('Successfully fetched component code');
    } catch (error) {
      console.error('Error fetching component code:', error);
    }
  };

  // Handle next step in workflow
  const handleNextStep = () => {
    if (workflowStep < 3) {
      setWorkflowStep(workflowStep + 1);
    }
  };

  // Handle previous step in workflow
  const handlePrevStep = () => {
    if (workflowStep > 1) {
      setWorkflowStep(workflowStep - 1);
    }
  };

  // Handle generate
  const handleGenerate = async () => {
    console.log('Generating landing page with:', {
      template: selectedTemplate,
      product: selectedProduct,
      contextInfo,
    });

    // Show loading state
    setIsGenerating(true);

    try {
      // Get the selected product details
      const productData = shopProducts.find((p) => p.id === selectedProduct);

      if (!productData) {
        throw new Error('Selected product not found');
      }

      // Get the template code - we already have it from handleUseTemplate
      const templateCode =
        selectedTemplate && 'componentCode' in selectedTemplate
          ? selectedTemplate.componentCode
          : undefined;

      if (!templateCode) {
        throw new Error('Template code not found');
      }

      // Get user's brand kit
      const brandKitResponse = await fetch('/api/brand-kit');
      const brandKit = await brandKitResponse.json();

      // Get the template name
      const templateName = selectedTemplate
        ? (selectedTemplate as LandingPageTemplate).name
        : 'Unknown Template';

      // Create a comprehensive prompt
      const prompt = `Create a landing page for ${productData.name}: ${productData.description}. 
      Template: ${templateName}
      ${contextInfo ? `Additional context: ${contextInfo}` : ''}`;

      // Create a minimal data object for the URL
      const minimalData = {
        p: prompt, // prompt
        u: session?.user?.id || 'anonymous', // userId
        templateId: (selectedTemplate as unknown as LandingPageTemplate)?.id || 'unknown', // Two-step type assertion
        productName: productData.name,
        productDescription: productData.description,
      };

      // Use encodeURIComponent for URL-safe encoding
      const encodedData = encodeURIComponent(JSON.stringify(minimalData));

      // Redirect to the soom-fragments app with minimal data
      window.location.href = `http://localhost:3004?data=${encodedData}`;
    } catch (error) {
      console.error('Error preparing landing page generation:', error);
      // Show error message to user
      setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
      setIsErrorModalOpen(true);
      // Only close the workflow modal if there's an error
      setIsWorkflowOpen(false);
    } finally {
      setIsGenerating(false);
      // Reset workflow state but don't close the modal yet
      setWorkflowStep(1);
      setSelectedProduct('');
      setContextInfo('');
    }
  };

  // Update this function to fetch products
  const fetchShopProducts = async () => {
    if (workflowStep === 2) {
      setIsLoadingProducts(true);
      try {
        // Get the user's connected shop - use relative URL instead of ngrok
        const response = await fetch('/api/shops/connected');
        const { shops } = await response.json();

        console.log('Connected shops:', shops);

        if (shops && shops.length > 0) {
          // Use the first connected shop
          const shopId = shops[0].shopId;

          console.log('Using shop ID:', shopId);

          // Fetch products for this shop with improved error handling
          // Use relative URL instead of ngrok
          const apiUrl = `/api/products?shopId=${shopId}`;
          console.log('Fetching from URL:', apiUrl);

          const productsResponse = await fetch(apiUrl);
          console.log('Response status:', productsResponse.status);

          // Check if the response is HTML instead of JSON
          const contentType = productsResponse.headers.get('content-type');
          console.log('Content type:', contentType);

          if (contentType && contentType.includes('text/html')) {
            const htmlContent = await productsResponse.text();
            console.error('Received HTML instead of JSON:', htmlContent.substring(0, 500));
            throw new Error(
              'Received HTML instead of JSON - server might be returning an error page',
            );
          }

          // Continue with JSON parsing
          const data = await productsResponse.json();
          console.log('Products response:', data);

          if (data.error) {
            throw new Error(data.error);
          }

          if (data.products) {
            setShopProducts(
              data.products.edges.map((edge: ProductEdge) => {
                const product = edge.node;
                // Extract the image URL properly
                const imageUrl =
                  product.media?.edges?.[0]?.node?.file?.url ||
                  (typeof product.media?.edges?.[0]?.node?.image === 'string'
                    ? product.media?.edges?.[0]?.node?.image
                    : product.media?.edges?.[0]?.node?.image?.url) ||
                  '/placeholder.svg?height=200&width=200'; // Fallback image

                return {
                  id: product.id,
                  name: product.title,
                  description: product.body || 'No description available',
                  image: imageUrl,
                };
              }),
            );
          } else {
            console.error('Failed to fetch products:', data);
          }
        } else {
          console.log('No connected shops found');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoadingProducts(false);
      }
    }
  };

  // Add this effect to fetch products when the workflow step changes
  useEffect(() => {
    void fetchShopProducts();
  }, [workflowStep]);

  // Add this function to fetch templates from the database
  const fetchDbTemplates = async () => {
    try {
      const response = await fetch('/api/landing-page-templates');

      // Even if the API fails, we'll continue with local templates
      if (response.ok) {
        const dbTemplatesData = await response.json();
        setDbTemplates(dbTemplatesData);

        console.log('Successfully fetched templates from DB');
      } else {
        console.log('API call failed, continuing with local templates only');
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      // Continue with local templates even if API fails
    }
  };

  // Call this function when the component mounts
  useEffect(() => {
    void fetchDbTemplates();
  }, []);

  // Render component card
  const renderComponentCard = (template: LandingPageTemplate) => {
    return (
      <div key={template.id} className="flex flex-col overflow-hidden rounded-lg border bg-white">
        <div className="p-4">
          <h3 className="text-lg font-semibold">{template.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{template.description}</p>
        </div>
        <div className="flex h-[200px] items-center justify-center overflow-hidden border-t bg-gray-50 p-6">
          <div className="max-h-[180px] w-full max-w-full scale-[0.8] overflow-auto">
            <template.component />
          </div>
        </div>
        <div className="flex border-t">
          <button
            className="flex-1 py-3 text-center text-sm font-medium transition-colors hover:bg-gray-50"
            onClick={() => handlePreviewClick(template)}
          >
            Preview
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center gap-1 bg-black px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800">
                <Plus className="h-4 w-4" />
                Add
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => console.log('Add to workspace', template.id)}>
                Add to workspace
              </DropdownMenuItem>
              <DropdownMenuItem onClick={async () => handleUseTemplate(template)}>
                Use template
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };

  // Get component code
  const getComponentCode = (path: string) => {
    // This is a simplified example - in a real app, you'd fetch the actual code
    return `// ${path}\n\n// Component code would be displayed here\n// This is a placeholder for demonstration purposes`;
  };

  // Render workflow step content
  const renderWorkflowStepContent = () => {
    switch (workflowStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-md bg-gray-100">
                <div className="h-10 w-10 overflow-hidden">
                  {selectedTemplate && <selectedTemplate.component />}
                </div>
              </div>
              <div>
                <h3 className="font-medium">{selectedTemplate?.name}</h3>
                <p className="text-sm text-zinc-500">{selectedTemplate?.description}</p>
              </div>
            </div>
            <p className="text-sm text-zinc-500">
              You've selected the {selectedTemplate?.name}. In the next steps, you'll customize this
              template for your specific product.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Label htmlFor="product-selection">Select a product for your landing page</Label>
            {isLoadingProducts ? (
              <div className="flex justify-center py-8">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
              </div>
            ) : shopProducts.length > 0 ? (
              <RadioGroup value={selectedProduct} onValueChange={setSelectedProduct}>
                <div className="max-h-[300px] space-y-2 overflow-y-auto">
                  {shopProducts.map((product) => (
                    <div key={product.id} className="flex items-start space-x-2">
                      <RadioGroupItem value={product.id.toString()} id={`product-${product.id}`} />
                      <Label
                        htmlFor={`product-${product.id}`}
                        className="cursor-pointer font-normal"
                      >
                        <div className="flex items-center gap-3">
                          {product.image && (
                            <div className="h-10 w-10 overflow-hidden rounded-md">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          )}
                          <div>
                            <span className="font-medium">{product.name}</span>
                            <p className="text-sm text-gray-500">{product.description}</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            ) : (
              <div className="py-4 text-center">
                <p className="text-gray-500">
                  No products found. Please connect a shop with products.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => (window.location.href = '/settings/integrations')}
                >
                  Connect Shop
                </Button>
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Label htmlFor="context-info">
              Tell us more about what you're looking to achieve with this landing page
            </Label>
            <Textarea
              id="context-info"
              placeholder="e.g., I want to highlight the natural ingredients and showcase customer testimonials. The target audience is women aged 25-45 who are interested in clean beauty products."
              value={contextInfo}
              onChange={(e) => setContextInfo(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b bg-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">Component Library</h1>
          <div className="w-64">
            <Input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <h2 className="mb-4 text-lg font-semibold">Categories</h2>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full rounded-md px-3 py-2 text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-black text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {Object.entries(groupedComponents).map(([category, categoryComponents]) => (
              <div key={category} className="mb-12">
                <h2 className="mb-6 text-2xl font-bold">{category}</h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {(categoryComponents as LandingPageTemplate[]).map(renderComponentCard)}
                </div>
              </div>
            ))}

            {Object.keys(groupedComponents).length === 0 && (
              <div className="py-12 text-center">
                <p className="text-gray-500">No components found matching your search criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewComponent && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent
            className="max-h-[90vh] max-w-7xl gap-0 overflow-hidden p-0"
            style={{ maxWidth: '1280px' }}
          >
            <div className="p-6">
              <DialogHeader className="text-left">
                <DialogTitle className="text-2xl font-bold">{previewComponent?.name}</DialogTitle>
                <DialogDescription className="text-base text-gray-500">
                  {previewComponent?.description}
                </DialogDescription>
              </DialogHeader>
            </div>

            <div
              className="mx-6 mb-0 overflow-auto rounded-md border p-6"
              style={{ maxHeight: '50vh' }}
            >
              <div className="flex items-center justify-center">
                {previewComponent && <previewComponent.component />}
              </div>
            </div>

            <Tabs
              defaultValue="preview"
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-4"
            >
              <TabsList className="grid w-full grid-cols-3 rounded-none border-b bg-transparent">
                <TabsTrigger
                  value="preview"
                  className="rounded-none border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none"
                >
                  Preview
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="rounded-none border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none"
                >
                  Code
                </TabsTrigger>
                <TabsTrigger
                  value="usage"
                  className="rounded-none border-b-2 data-[state=active]:border-black data-[state=active]:shadow-none"
                >
                  Usage
                </TabsTrigger>
              </TabsList>

              <TabsContent
                value="preview"
                className="overflow-auto p-6"
                style={{ maxHeight: '30vh' }}
              >
                <h3 className="mb-4 text-xl font-bold">Component Description</h3>
                <p className="mb-6 text-gray-700">{previewComponent?.description}</p>

                <h3 className="mb-4 text-xl font-bold">Props</h3>
                <p className="mb-2 text-gray-700">This component accepts the following props:</p>
                {/* This would be dynamically generated based on the component */}
              </TabsContent>

              <TabsContent value="code" className="overflow-auto p-6" style={{ maxHeight: '30vh' }}>
                <pre className="relative max-h-[400px] overflow-auto rounded-md bg-gray-50 p-4 text-gray-800">
                  <code className="font-mono text-sm">
                    {`import { Button } from "@/components/ui/button"\n\nexport function ${
                      previewComponent?.name?.replace(/\s/g, '') ?? 'Component'
                    }() {\nreturn (\n  <div className="flex flex-wrap gap-4">\n    <Button variant="default">Default</Button>\n    <Button variant="destructive">Destructive</Button>\n    <Button variant="outline">Outline</Button>\n    <Button variant="secondary">Secondary</Button>\n    <Button variant="ghost">Ghost</Button>\n    <Button variant="link">Link</Button>\n  </div>\n)\n}`}
                  </code>
                  <button className="absolute right-2 top-2 text-gray-500 hover:text-gray-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  </button>
                </pre>
              </TabsContent>

              <TabsContent
                value="usage"
                className="overflow-auto p-6"
                style={{ maxHeight: '30vh' }}
              >
                <h3 className="mb-4 text-xl font-bold">Import</h3>
                <pre className="mb-6 overflow-auto rounded-md bg-gray-50 p-4 text-gray-800">
                  <code className="font-mono text-sm">
                    {`import { ${previewComponent?.name?.replace(/\s/g, '') ?? 'Component'} } from "${previewComponent?.path?.replace('.tsx', '') ?? ''}"`}
                  </code>
                </pre>

                <h3 className="mb-4 text-xl font-bold">Usage Example</h3>
                <pre className="overflow-auto rounded-md bg-gray-50 p-4 text-gray-800">
                  <code className="font-mono text-sm">{`<${previewComponent?.name?.replace(/\s/g, '') ?? 'Component'} />`}</code>
                </pre>

                {previewComponent?.category === 'Templates' && (
                  <div className="mt-6">
                    <Button variant="outline" className="mr-2">
                      See Page
                    </Button>
                    <Button>Use Template</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="flex justify-end p-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2 bg-black hover:bg-gray-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Add to Project
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => console.log('Add to workspace', previewComponent?.id)}
                  >
                    Add to workspace
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={async () => handleUseTemplate(previewComponent)}>
                    Use template
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Template Workflow Modal */}
      {selectedTemplate && (
        <Dialog
          open={isWorkflowOpen}
          onOpenChange={(open) => {
            setIsWorkflowOpen(open);
            if (!open) {
              setWorkflowStep(1);
              setSelectedProduct('');
              setContextInfo('');
            }
          }}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Landing Page from Template</DialogTitle>
              <DialogDescription>
                Follow these steps to customize your landing page based on the{' '}
                {selectedTemplate?.name}.
              </DialogDescription>
            </DialogHeader>

            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${workflowStep >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}
                >
                  1
                </div>
                <div className={`h-1 w-16 ${workflowStep >= 2 ? 'bg-black' : 'bg-gray-200'}`}></div>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${workflowStep >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}
                >
                  2
                </div>
                <div className={`h-1 w-16 ${workflowStep >= 3 ? 'bg-black' : 'bg-gray-200'}`}></div>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${workflowStep >= 3 ? 'bg-black text-white' : 'bg-gray-200'}`}
                >
                  3
                </div>
              </div>
              <div className="text-sm text-gray-500">Step {workflowStep} of 3</div>
            </div>

            <ScrollArea className="max-h-[60vh] pr-4">{renderWorkflowStepContent()}</ScrollArea>

            <DialogFooter className="flex justify-between">
              <div>
                {workflowStep > 1 && (
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                )}
              </div>
              <div>
                {workflowStep < 3 ? (
                  <Button
                    onClick={handleNextStep}
                    disabled={workflowStep === 2 && !selectedProduct}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button onClick={handleGenerate} disabled={!contextInfo.trim()}>
                    Generate Landing Page
                  </Button>
                )}
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
