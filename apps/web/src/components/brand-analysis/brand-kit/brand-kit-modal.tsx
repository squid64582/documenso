'use client';

import React, { useEffect } from 'react';
import { useState } from 'react';

import {
  CheckCircle,
  Download,
  Eye,
  FileText,
  Image,
  Layers,
  Palette,
  PlusCircle,
  RefreshCw,
  ShoppingBag,
  Store,
  Type,
} from 'lucide-react';
import { useSession } from 'next-auth/react';

import { cn } from '@documenso/ui/lib/utils';
import { Button } from '@documenso/ui/primitives/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@documenso/ui/primitives/dialog';
import { useToast } from '@documenso/ui/primitives/use-toast';

import { AgentThoughts } from './agent-thoughts';
import ShopifyConnectButton from './shopify-connect-button';
import { TaskProgress } from './task-progress';

// Define the store type based on your shop_installations table
type StoreType = {
  id: number;
  name: string;
  url: string;
  logoUrl?: string;
  platform: string;
  shopDomain: string; // Add this field to store the shop_domain
};

// Update the mock tasks to match the real tasks
const MOCK_TASKS: Task[] = [
  {
    id: 1,
    name: 'Extracting and analyzing visual elements from website',
    duration: 3000,
    agentId: 'web_scraper',
    agentRole: 'Web Scraper',
  },
  {
    id: 2,
    name: 'Categorizing images by type and purpose',
    duration: 5000,
    agentId: 'image_analysis',
    agentRole: 'Image Analysis Specialist',
  },
  {
    id: 3,
    name: 'Analyzing imagery style and visual patterns',
    duration: 4000,
    agentId: 'image_analysis',
    agentRole: 'Image Analysis Specialist',
  },
  {
    id: 4,
    name: 'Scraping sales copy and textual content',
    duration: 8000,
    agentId: 'content_analysis',
    agentRole: 'Content Analysis Expert',
  },
  {
    id: 5,
    name: 'Analyzing brand voice and messaging',
    duration: 6000,
    agentId: 'content_analysis',
    agentRole: 'Content Analysis Expert',
  },
  {
    id: 6,
    name: 'Generating product copywriting elements',
    duration: 5000,
    agentId: 'content_analysis',
    agentRole: 'Content Analysis Expert',
  },
  {
    id: 7,
    name: 'Conducting competitive analysis',
    duration: 4000,
    agentId: 'market_research',
    agentRole: 'Market Researcher',
  },
  {
    id: 8,
    name: 'Determining market positioning',
    duration: 4000,
    agentId: 'market_research',
    agentRole: 'Market Researcher',
  },
];

// Add mock thoughts for each agent based on real tasks
const MOCK_THOUGHTS = {
  web_scraper: [
    'Scanning website structure and identifying visual elements...',
    'Extracting logo URL and saving to structured format...',
    'Analyzing color palette and identifying primary, secondary, and accent colors...',
    'Extracting typography details including typefaces, sizes, and weights...',
    'Collecting all available images from the website with absolute URLs...',
    'Compiling visual elements into structured JSON format...',
  ],
  image_analysis: [
    'Categorizing extracted images into product, lifestyle, logo, banner, and other types...',
    'Analyzing product imagery for consistent visual patterns...',
    'Examining lifestyle imagery for brand storytelling elements...',
    'Determining overall visual style across all brand imagery...',
    'Creating detailed descriptions for key brand images...',
    'Identifying common visual elements and patterns across images...',
    'Developing style guidelines for creating new images that match brand aesthetic...',
  ],
  content_analysis: [
    'Scraping all textual content from homepage, product pages, and about sections...',
    'Extracting product descriptions, blog posts, and promotional content...',
    'Organizing content by page type and purpose in structured format...',
    'Analyzing brand voice characteristics (formality, tone, technical level)...',
    'Identifying key messaging themes and recurring topics...',
    'Extracting value propositions and unique selling points...',
    'Determining target audience based on language and messaging...',
    'Analyzing vocabulary patterns and sentence structure...',
    "Creating brand voice guidelines with do's and don'ts...",
    'Generating new copywriting elements for each product...',
    'Creating headlines, benefits, and calls to action that match brand voice...',
    'Developing email marketing templates aligned with brand messaging...',
  ],
  market_research: [
    'Identifying main competitors in the same market segment...',
    'Analyzing competitor brand positioning and unique selling propositions...',
    'Comparing competitors across key attributes (health focus, sustainability, quality)...',
    'Evaluating competitor visual identity and messaging style...',
    'Identifying strengths and weaknesses of each competitor...',
    'Determining key positioning elements that differentiate the brand...',
    'Evaluating strength of each positioning element...',
    'Developing strategic recommendations with priority levels...',
    "Creating comprehensive conclusion about brand's market position...",
  ],
};

// Update the AgentId type to match real agents
type AgentId = 'web_scraper' | 'image_analysis' | 'content_analysis' | 'market_research';

type Task = {
  id: number;
  name: string;
  duration: number;
  agentId: AgentId;
  agentRole: string;
};

export function BrandKitModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  // Use NextAuth session to get the user ID
  const { data: session } = useSession();
  const userId = (session?.user?.id || 'demo-user-id').toString();

  // Update the state management at the top of the component
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [activeTasks, setActiveTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [agentThoughts, setAgentThoughts] = useState<
    {
      id: string;
      agentId: string;
      agentRole: string;
      thought: string;
      timestamp: Date;
      isCollapsed: boolean;
    }[]
  >([]);
  const { toast } = useToast();
  const [stores, setStores] = useState<StoreType[]>([]);
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // State to control whether to show stores or the integration options
  const [hasIntegratedStores, setHasIntegratedStores] = useState(false);

  // Fetch user's stores when the modal opens
  useEffect(() => {
    if (open) {
      fetchUserStores();
    }
  }, [open, userId]);

  // Function to fetch user's stores from the database
  const fetchUserStores = async () => {
    setIsLoading(true);
    try {
      console.log('Fetching stores for user:', userId);
      const response = await fetch(`/api/user-stores?userId=${userId}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch stores: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);

      // Transform the data to match our StoreType
      const transformedStores: StoreType[] = data.stores.map((store: any) => ({
        id: store.id,
        name: store.shopName || store.myshopifyDomain?.split('.')[0] || 'My Store',
        url: `https://${store.shopDomain || store.myshopifyDomain || 'example.com'}`,
        logoUrl: undefined, // You might want to store logos in the future
        platform: 'shopify',
        shopDomain: store.shopDomain || store.myshopifyDomain || '',
      }));

      console.log('Transformed stores:', transformedStores);
      setStores(transformedStores);

      // If there are no stores, we should still show the store selection view
      // but with a "No stores found" message
      setHasIntegratedStores(true);

      // If there's at least one store, select it by default
      if (transformedStores.length > 0) {
        setSelectedStore(transformedStores[0]);
      }
    } catch (error) {
      console.error('Error fetching stores:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch your stores. Please try again.',
        variant: 'destructive',
      });
      setStores([]);
      setHasIntegratedStores(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!selectedStore) {
      toast({
        title: 'No store selected',
        description: 'Please select a store to generate a brand kit',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    setActiveTasks([]);
    setCompletedTasks([]);
    setAgentThoughts([]);

    // Get the brand URL from the selected store
    const brandUrl = selectedStore.shopDomain;

    try {
      // Configuration for CrewAI
      const baseUrl = 'https://automating-brand-kit-creation-from-url-input-de3f6b6b.crewai.com';
      const bearerToken = 'f9f7b4fd5f6a';
      const useLocalBackend = true; // Set to false if you want to use the remote API

      let response;
      let responseData;

      if (useLocalBackend) {
        // Use local backend
        console.log('Using local backend with brand_url:', brandUrl);
        response = await fetch('http://localhost:8000/create-brand-kit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            brand_url: brandUrl,
          }),
        });

        if (!response.ok) {
          throw new Error(`Local CrewAI service returned error: ${response.status}`);
        }

        responseData = await response.json();
        console.log('CrewAI response:', responseData);

        // Start the simulated workflow to show progress
        simulateAIAgentWorkflow();
      } else {
        // Use remote CrewAI service
        console.log('Using remote CrewAI service with brand_url:', brandUrl);
        const kickoffResponse = await fetch(
          `/api/crew-proxy?url=${encodeURIComponent(baseUrl)}&endpoint=kickoff`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify({
              inputs: {
                brand_url: brandUrl,
              },
            }),
          },
        );

        // Check for service unavailable error
        if (kickoffResponse.status === 503) {
          throw new Error('CrewAI service is temporarily unavailable. Please try again later.');
        }

        if (!kickoffResponse.ok) {
          const errorText = await kickoffResponse.text();
          // Check if the response is HTML (likely an error page)
          if (errorText.includes('<html>')) {
            throw new Error('CrewAI service returned an error. Please try again later.');
          }

          try {
            const errorData = JSON.parse(errorText);
            throw new Error(errorData.details || errorData.error || 'Failed to start crew');
          } catch (jsonError) {
            throw new Error(`Failed to start crew: ${errorText.substring(0, 100)}...`);
          }
        }

        const kickoffData = await kickoffResponse.json();
        console.log('CrewAI kickoff response:', kickoffData);

        if (!kickoffData.kickoff_id) {
          throw new Error('No kickoff ID returned from API');
        }

        // Start the simulated workflow to show progress
        simulateAIAgentWorkflow();
      }
    } catch (error) {
      console.error('Error starting CrewAI:', error);
      toast({
        title: 'Error',
        description:
          error instanceof Error ? error.message : 'Failed to start brand kit generation',
        variant: 'destructive',
      });
      setIsProcessing(false);
    }
  };

  const simulateAIAgentWorkflow = () => {
    let taskDelay = 0;

    // Simulate tasks being created and completed over time
    MOCK_TASKS.forEach((task, index) => {
      // Add a task after a delay
      setTimeout(() => {
        setActiveTasks((prev) => [...prev, task]);

        // Simulate agent thoughts for this task
        simulateAgentThoughts(task);
      }, taskDelay);

      // Mark task as completed after its duration
      setTimeout(() => {
        setCompletedTasks((prev) => [...prev, task.id]);

        // If this is the last task, we're done
        if (index === MOCK_TASKS.length - 1) {
          setTimeout(() => {
            toast({
              title: 'Brand Kit Complete!',
              description: 'Your brand kit has been generated successfully.',
            });
            setIsProcessing(false);
            setIsCompleted(true);
          }, 1000);
        }
      }, taskDelay + task.duration);

      taskDelay += task.duration / 2; // Overlap tasks for more realistic flow
    });
  };

  const simulateAgentThoughts = (task: Task) => {
    const thoughts = MOCK_THOUGHTS[task.agentId] || [];
    const thoughtInterval = task.duration / (thoughts.length + 1);

    thoughts.forEach((thought, index) => {
      setTimeout(
        () => {
          setAgentThoughts((prev) => [
            ...prev,
            {
              id: `${task.agentId}-thought-${index}`,
              agentId: task.agentId,
              agentRole: task.agentRole,
              thought,
              timestamp: new Date(),
              isCollapsed: false,
            },
          ]);

          // Auto-collapse older thoughts after a delay
          if (index > 0) {
            setTimeout(() => {
              setAgentThoughts((prev) =>
                prev.map((t) =>
                  t.id === `${task.agentId}-thought-${index - 1}` ? { ...t, isCollapsed: true } : t,
                ),
              );
            }, thoughtInterval * 1.5);
          }
        },
        thoughtInterval * (index + 1),
      );
    });
  };

  const toggleThoughtCollapse = (thoughtId: string) => {
    setAgentThoughts((prev) =>
      prev.map((thought) =>
        thought.id === thoughtId ? { ...thought, isCollapsed: !thought.isCollapsed } : thought,
      ),
    );
  };

  // Update the resetForm function to reset isCompleted
  const resetForm = () => {
    setSelectedStore(null);
    setIsProcessing(false);
    setIsCompleted(false);
    setActiveTasks([]);
    setCompletedTasks([]);
    setAgentThoughts([]);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  // Handlers for integration buttons
  const handleIntegrateShopify = () => {
    toast({
      title: 'Shopify Integration',
      description: 'Redirecting to Shopify integration...',
    });
    // In a real app, this would redirect to your Shopify integration flow
    // For demo purposes, we'll just simulate having stores after clicking
    setTimeout(() => {
      setHasIntegratedStores(true);
    }, 500);
  };

  const handleIntegrateBigCommerce = () => {
    toast({
      title: 'BigCommerce Integration',
      description: 'Redirecting to BigCommerce integration...',
    });
    // In a real app, this would redirect to your BigCommerce integration flow
    // For demo purposes, we'll just simulate having stores after clicking
    setTimeout(() => {
      setHasIntegratedStores(true);
    }, 500);
  };

  // For demo purposes - toggle between having stores and not having stores
  const toggleStoresDemo = () => {
    setHasIntegratedStores(!hasIntegratedStores);
  };

  // Update the return statement to include the completed view
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="flex max-h-[80vh] flex-col overflow-hidden sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>
            {isProcessing
              ? 'Generating Brand Kit...'
              : isCompleted
                ? 'Brand Kit Complete!'
                : !hasIntegratedStores
                  ? 'Connect Your Store'
                  : 'Select Your Store'}
          </DialogTitle>
        </DialogHeader>

        {!isProcessing && !isCompleted ? (
          !hasIntegratedStores ? (
            // No integrated stores view
            <div className="space-y-6 py-6">
              <div className="space-y-2 text-center">
                <h3 className="text-lg font-medium">Get started with Brand Kit Generator</h3>
                <p className="text-muted-foreground mx-auto max-w-md text-sm">
                  Connect your e-commerce store to generate a professional brand kit with colors,
                  typography, logo concepts, and more.
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="hover:border-primary/50 rounded-lg border p-6 text-center transition-colors">
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="30"
                      height="30"
                      viewBox="0 0 30 30"
                    >
                      <path d="M 13 1 C 11.393993 1 10.138283 2.1848392 9.3027344 3.6132812 C 8.6657258 4.7023016 8.2470434 5.9595896 8.0820312 7.1191406 L 5.6679688 7.6679688 L 3 24 L 18.332031 27 L 27 25.078125 L 24.332031 7 L 22.332031 6.5 L 20.332031 4.3320312 L 18.240234 4.8085938 C 18.128819 4.4221214 17.98999 4.0387914 17.802734 3.6816406 C 17.334682 2.7889297 16.562308 2 15.5 2 C 15.340386 2 15.191357 2.029562 15.041016 2.0546875 C 14.922231 1.8901067 14.792252 1.7332776 14.638672 1.5976562 C 14.217828 1.2260244 13.650428 1 13 1 z M 13 2 C 13.435572 2 13.725032 2.123585 13.976562 2.3457031 C 13.99876 2.3653051 14.015594 2.3984555 14.037109 2.4199219 C 13.720913 2.6050566 13.429473 2.8308585 13.181641 3.0976562 C 12.595251 3.7289177 12.172865 4.5276755 11.855469 5.3125 C 11.713212 5.6642582 11.598477 6.0094274 11.496094 6.3417969 L 9.1523438 6.875 C 9.3336887 5.9539384 9.673596 4.9609735 10.166016 4.1191406 C 10.903217 2.8588328 11.897007 2 13 2 z M 15.535156 3.0078125 C 16.081074 3.0260252 16.548246 3.4450442 16.916016 4.1464844 C 17.057627 4.4165787 17.167947 4.7216432 17.259766 5.03125 L 15.958984 5.3261719 C 15.908173 4.5335392 15.794795 3.7254813 15.535156 3.0078125 z M 14.554688 3.2617188 C 14.566594 3.2921492 14.582366 3.3143054 14.59375 3.3457031 C 14.818332 3.9651307 14.925561 4.7577661 14.970703 5.5507812 L 12.646484 6.0800781 C 12.69407 5.9477768 12.729373 5.8206067 12.783203 5.6875 C 13.072432 4.9723245 13.455421 4.2710822 13.914062 3.7773438 C 14.115999 3.5599546 14.329456 3.3913651 14.554688 3.2617188 z M 14.128906 9.6640625 C 14.443906 9.6640625 14.735813 9.6808906 15.007812 9.7128906 C 15.282813 9.7448906 15.533859 9.7935156 15.755859 9.8535156 C 15.980859 9.9125156 16.174031 9.9816406 16.332031 10.056641 L 15.371094 12.792969 C 15.244094 12.733969 15.090875 12.671234 14.921875 12.615234 C 14.750875 12.556234 14.565375 12.500078 14.359375 12.455078 C 14.158375 12.410078 13.938937 12.371609 13.710938 12.349609 C 13.482938 12.327609 13.242141 12.320984 12.994141 12.333984 C 12.766141 12.346984 12.562859 12.385312 12.380859 12.445312 C 12.201859 12.504312 12.043016 12.588453 11.916016 12.689453 C 11.789016 12.792453 11.643219 12.912734 11.574219 13.052734 C 11.502219 13.192734 11.386719 13.323813 11.386719 13.757812 C 11.386719 14.265813 11.722969 14.625531 12.167969 14.894531 C 13.167969 15.499531 14.996094 16.499156 14.996094 19.035156 C 14.996094 19.826156 14.772844 20.504359 14.464844 21.068359 C 14.161844 21.624359 13.744234 22.060906 13.240234 22.378906 C 12.747234 22.687906 12.176641 22.881984 11.556641 22.958984 C 10.953641 23.033984 10.502938 23.001234 9.8359375 22.865234 C 9.8309375 22.865234 9.8233594 22.863281 9.8183594 22.863281 C 9.8133594 22.863281 9.8076875 22.859375 9.8046875 22.859375 C 9.7996875 22.859375 9.7921094 22.857422 9.7871094 22.857422 C 9.7821094 22.857422 9.7745313 22.853516 9.7695312 22.853516 C 9.4575313 22.784516 9.1550469 22.692937 8.8730469 22.585938 C 8.5930469 22.480937 8.32975 22.362469 8.09375 22.230469 C 7.85775 22.101469 7.6449844 21.966172 7.4589844 21.826172 C 7.2769844 21.688172 7.121 21.542531 7 21.394531 L 7.7363281 19.123047 C 7.8603281 19.220047 8.0135469 19.331312 8.1855469 19.445312 C 8.3615469 19.561312 8.557625 19.677109 8.765625 19.787109 C 8.978625 19.898109 9.2045 19.998031 9.4375 20.082031 C 9.6735 20.166031 9.9182031 20.233625 10.158203 20.265625 C 10.371203 20.294625 10.561516 20.290859 10.728516 20.255859 C 10.895516 20.220859 11.041203 20.155453 11.158203 20.064453 C 11.277203 19.976453 11.369594 19.862422 11.433594 19.732422 C 11.497594 19.600422 11.533062 19.456781 11.539062 19.300781 C 11.547062 19.144781 11.530234 18.996469 11.490234 18.855469 C 11.447234 18.712469 11.378297 18.5755 11.279297 18.4375 C 11.180297 18.2995 11.051625 18.160578 10.890625 18.017578 C 10.729625 17.874578 10.536594 17.729219 10.308594 17.574219 C 10.025594 17.378219 9.765125 17.186922 9.453125 16.919922 C 9.204125 16.707922 8.9980781 16.435969 8.8300781 16.167969 C 8.6630781 15.902969 8.5303594 15.616687 8.4433594 15.304688 C 8.3563594 14.995688 8.3189375 14.661875 8.3359375 14.296875 C 8.3649375 13.687875 8.4948906 13.125188 8.7128906 12.617188 C 8.9358906 12.106188 9.2495781 11.648906 9.6425781 11.253906 C 10.043578 10.850906 10.53075 10.508047 11.09375 10.248047 C 11.67375 9.9800469 12.420344 9.8184688 13.152344 9.7304688 C 13.492344 9.6834687 13.820906 9.6640625 14.128906 9.6640625 z"></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-medium">Shopify</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Connect your Shopify store to generate a brand kit based on your store's design.
                  </p>
                  <ShopifyConnectButton userId={userId} className="w-full" />
                </div>

                <div className="hover:border-primary/50 rounded-lg border p-6 text-center transition-colors">
                  <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-zinc-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="30"
                      height="30"
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#34313f"
                        d="M24.557,26.203h4.917c1.398,0,2.284-0.77,2.284-2.006c0-1.166-0.886-2.006-2.284-2.006h-4.917 c-0.163,0-0.303,0.14-0.303,0.28v3.453C24.277,26.086,24.394,26.203,24.557,26.203z"
                      ></path>
                      <path
                        fill="#34313f"
                        d="M24.557,34.158h5.08c1.561,0,2.494-0.793,2.494-2.193c0-1.213-0.886-2.193-2.494-2.193h-5.08 c-0.163,0-0.303,0.14-0.303,0.28v3.803C24.277,34.041,24.394,34.158,24.557,34.158z"
                      ></path>
                      <path
                        fill="#34313f"
                        d="M42.548,4.086L28.006,18.597h2.377c3.705,0,5.896,2.333,5.896,4.876 c0,2.006-1.352,3.476-2.796,4.129c-0.233,0.093-0.233,0.42,0.023,0.513c1.678,0.653,2.866,2.403,2.866,4.456 c0,2.893-1.934,5.202-5.686,5.202h-10.3c-0.163,0-0.303-0.14-0.303-0.28V26.506L4.119,42.417C3.91,42.627,4.049,43,4.352,43h38.382 c0.14,0,0.256-0.117,0.256-0.257V4.296C43.06,4.04,42.734,3.9,42.548,4.086z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="mb-2 text-lg font-medium">BigCommerce</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    Connect your BigCommerce store to generate a brand kit based on your store's
                    design.
                  </p>
                  <Button onClick={handleIntegrateBigCommerce} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Connect BigCommerce
                  </Button>
                </div>
              </div>

              {/* This button is just for demo purposes to toggle between states */}
              <div className="mt-4 text-center">
                <Button
                  variant="link"
                  size="sm"
                  onClick={toggleStoresDemo}
                  className="text-muted-foreground text-xs"
                >
                  Back to stores
                </Button>
              </div>
            </div>
          ) : (
            // Store selection view
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Select a store</h3>
                <p className="text-muted-foreground text-sm">
                  Choose which of your integrated stores you want to create a brand kit for
                </p>

                <div className="mt-4 space-y-3">
                  {stores.length > 0 ? (
                    stores.map((store) => (
                      <div
                        key={store.id}
                        className={cn(
                          'flex cursor-pointer items-center space-x-3 rounded-md border p-3 transition-all',
                          selectedStore?.id === store.id
                            ? 'border-primary bg-primary/5'
                            : 'hover:border-primary/50',
                        )}
                        onClick={() => setSelectedStore(store)}
                      >
                        <div className="flex-shrink-0">
                          {store.logoUrl ? (
                            <img
                              src={store.logoUrl || '/placeholder.svg'}
                              alt={store.name}
                              className="h-10 w-10 rounded-md object-cover"
                            />
                          ) : (
                            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-md">
                              {store.platform === 'shopify' ? (
                                <ShoppingBag className="text-primary h-5 w-5" />
                              ) : (
                                <Store className="text-primary h-5 w-5" />
                              )}
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{store.name}</p>
                          <p className="text-muted-foreground truncate text-xs">{store.url}</p>
                        </div>

                        <div className="flex-shrink-0">
                          <div
                            className={cn(
                              'flex h-5 w-5 items-center justify-center rounded-full border-2',
                              selectedStore?.id === store.id ? 'border-primary' : 'border-muted',
                            )}
                          >
                            {selectedStore?.id === store.id && (
                              <div className="bg-primary h-3 w-3 rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Store className="h-12 w-12 text-gray-300" />
                      <h3 className="mt-2 text-sm font-medium">No stores found</h3>
                      <p className="text-muted-foreground mt-1 text-xs">
                        Connect a store to get started
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setHasIntegratedStores(false)}
                  className="gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  {stores.length > 0 ? 'Connect Another Store' : 'Connect Store'}
                </Button>

                {stores.length > 0 && (
                  <Button onClick={handleSubmit} disabled={!selectedStore}>
                    Generate Brand Kit
                  </Button>
                )}
              </div>
            </div>
          )
        ) : isCompleted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-300" />
            </div>

            <h3 className="mb-2 text-xl font-semibold">Your Brand Kit is Ready!</h3>

            <p className="text-muted-foreground mb-6 max-w-md">
              We've analyzed {selectedStore?.name} and created a complete brand kit including
              colors, typography, logo concepts, and brand guidelines.
            </p>

            <div className="mb-8 grid w-full max-w-md grid-cols-3 gap-4">
              <div className="flex flex-col items-center rounded-md border p-3">
                <Palette className="text-primary mb-2 h-5 w-5" />
                <span className="text-xs font-medium">Color Palette Guidelines</span>
              </div>
              <div className="flex flex-col items-center rounded-md border p-3">
                <Type className="text-primary mb-2 h-5 w-5" />
                <span className="text-xs font-medium">Typography Guidelines</span>
              </div>
              <div className="flex flex-col items-center rounded-md border p-3">
                <Layers className="text-primary mb-2 h-5 w-5" />
                <span className="text-xs font-medium">Competitive Analysis</span>
              </div>
              <div className="flex flex-col items-center rounded-md border p-3">
                <FileText className="text-primary mb-2 h-5 w-5" />
                <span className="text-xs font-medium">Brand Messaging Guidelines</span>
              </div>
              <div className="flex flex-col items-center rounded-md border p-3">
                <Image className="text-primary mb-2 h-5 w-5" />
                <span className="text-xs font-medium">Product-Specific Sales Copy</span>
              </div>
              <div className="flex flex-col items-center rounded-md border p-3">
                <Download className="text-primary mb-2 h-5 w-5" />
                <span className="text-xs font-medium">Full Brand Asset Package</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="gap-2">
                <Eye className="h-4 w-4" />
                View Brand Kit
              </Button>
              <Button variant="outline" size="lg" onClick={resetForm} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Create Another
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-1 gap-4 overflow-hidden">
            {/* Left column: Task progress */}
            <div className="flex-1 overflow-y-auto p-1">
              <div className="mb-4 space-y-1">
                <p className="text-sm font-medium">
                  Analyzing: {selectedStore?.name} ({selectedStore?.url})
                </p>
                <p className="text-muted-foreground text-sm">
                  Our AI agent team is working on your brand kit
                </p>
              </div>

              <TaskProgress tasks={activeTasks} completedTaskIds={completedTasks} />
            </div>

            {/* Right column: Agent thoughts */}
            <div className="w-1/2 overflow-y-auto border-l p-1 pl-4">
              <h4 className="mb-3 text-sm font-semibold">Agent Thoughts</h4>
              <AgentThoughts thoughts={agentThoughts} onToggleCollapse={toggleThoughtCollapse} />
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
