import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Get the URL and extract the shopId from the search params
    const { searchParams } = new URL(request.url);
    const shopId = searchParams.get('shopId');

    if (!shopId) {
      return NextResponse.json({ error: 'Shop ID is required' }, { status: 400 });
    }

    // Convert shopId to a number if it's a string
    const gadgetShopId = parseInt(shopId, 10);

    if (isNaN(gadgetShopId)) {
      return NextResponse.json({ error: 'Invalid Shop ID format' }, { status: 400 });
    }

    // Make sure your API key is properly set in your environment variables
    const apiKey = process.env.GADGET_API_KEY;

    if (!apiKey) {
      console.error('GADGET_API_KEY is not defined in environment variables');
      return NextResponse.json({ error: 'API key configuration error' }, { status: 500 });
    }

    console.log('Using API key:', apiKey.substring(0, 5) + '...');

    const query = `
      query GetShopifyProducts($shopId: GadgetID!, $limit: Int!) {
        shopifyProducts(
          filter: { shopId: { equals: $shopId } }
          first: $limit
        ) {
          edges {
            node {
              id
              title
              body
              media {
                edges {
                  node {
                    id
                    mediaContentType
                    status
                    image
                    file {
                      url
                      filename
                      mimeType
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await fetch('https://soomdev.gadget.app/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        query,
        variables: {
          shopId: gadgetShopId,
          limit: 20,
        },
      }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL error:', data.errors);
      return NextResponse.json({ error: data.errors[0].message }, { status: 500 });
    }

    return NextResponse.json({ products: data.data.shopifyProducts });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
