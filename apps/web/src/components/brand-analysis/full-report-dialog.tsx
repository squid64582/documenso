import React from 'react';

import { ChevronRight } from 'lucide-react';

import { Button } from '@documenso/ui/primitives/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@documenso/ui/primitives/dialog';
import { ScrollArea } from '@documenso/ui/primitives/scroll-area';

interface FullReportDialogProps {
  trigger?: React.ReactNode;
}

export default function FullReportDialog({ trigger }: FullReportDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="mt-4 bg-rose-600 hover:bg-rose-700" size="sm">
            View Full Report
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] sm:max-w-[800px] md:max-w-[900px] lg:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle className="text-xl text-rose-600">
            Competitive Analysis and Market Positioning of Lifeboost Coffee
          </DialogTitle>
          <DialogDescription>Comprehensive market research report</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="prose prose-zinc max-w-none">
            <h2 className="text-lg font-semibold text-zinc-800">Market Positioning Insights</h2>
            <p>
              Lifeboost Coffee firmly establishes itself within the premium coffee market by
              aligning its brand identity with health, sustainability, and quality. Here are key
              elements contributing to its market positioning:
            </p>

            <ol className="mt-4 space-y-4">
              <li>
                <strong className="text-rose-600">Health-Oriented Focus:</strong> Lifeboost Coffee
                distinguishes itself through its unique TrustPure® process, which ensures that its
                coffee is free from mycotoxins, heavy metals, and pesticides, appealing to
                health-conscious consumers. This positioning particularly resonates in a market that
                increasingly prioritizes health and wellness.
              </li>

              <li>
                <strong className="text-lime-600">Sustainability Commitment:</strong> The brand's
                commitment to fair trade and sustainable farming practices enhances its appeal among
                environmentally-conscious consumers. Lifeboost explicitly ties its success to
                helping farmers and protecting wildlife, which fosters a sense of community and
                responsibility.
              </li>

              <li>
                <strong className="text-cyan-600">Consumer Assurance:</strong> Lifeboost bolsters
                consumer trust through its 30-day money-back guarantee, which encourages first-time
                purchases by reducing perceived risk. This strategy can significantly enhance
                customer loyalty and retention.
              </li>

              <li>
                <strong className="text-rose-600">Unique Selling Proposition (USP):</strong> With a
                focus on low-acid, stomach-friendly offerings, Lifeboost positions itself
                attractively against competitors that may not prioritize these health benefits.
              </li>

              <li>
                <strong className="text-cyan-600">Brand Messaging:</strong> The tone of voice used
                by Lifeboost conveys an informative and friendly approach, ensuring that
                communication resonates with its target demographic. Lifestyle imagery utilized in
                marketing conveys a vibrant, high-quality coffee experience, further enhancing brand
                sentiment.
              </li>
            </ol>

            <h2 className="mt-8 text-lg font-semibold text-zinc-800">Competitor Comparison</h2>
            <p>
              Analyzing the major competitors provides crucial insights into Lifeboost's
              positioning:
            </p>

            <ol className="mt-4 space-y-4">
              <li>
                <strong className="text-cyan-600">Blue Bottle Coffee:</strong> This brand emphasizes
                quality and experience rather than health attributes, appealing primarily to upscale
                consumers who appreciate artisanal coffee-making processes. Lifeboost's focus on
                health gives it an edge in markets where wellness is a primary concern.
              </li>

              <li>
                <strong className="text-lime-600">Stumptown Coffee Roasters:</strong> While also
                emphasizing quality through direct trade and sourcing, its messaging is less
                centered on health, suggesting an opportunity for Lifeboost to attract customers
                looking for both quality and wellness in their coffee choices.
              </li>

              <li>
                <strong className="text-rose-500">Death Wish Coffee:</strong> By focusing on extreme
                strength, this brand appeals more to younger, perhaps less health-focused
                demographics. Lifeboost's emphasis on health makes it more suitable for a diverse
                range of consumers, including those concerned about the health implications of
                caffeine.
              </li>

              <li>
                <strong className="text-zinc-600">Peet's Coffee:</strong> With a traditional
                approach orienting towards flavor profiles, Peet's does not leverage health
                messaging effectively. Lifeboost's combination of premium quality and
                health-conscious marketing presents a differentiated offering.
              </li>
            </ol>

            <h2 className="mt-8 text-lg font-semibold text-zinc-800">Strategic Recommendations</h2>
            <p>
              To strengthen its market position and capitalize on current trends, Lifeboost Coffee
              should consider the following strategies:
            </p>

            <ol className="mt-4 space-y-4">
              <li>
                <strong className="text-rose-600">Expand Health Messaging:</strong> Enhancing online
                content and materials that directly address health benefits can better educate
                consumers and differentiate its coffee as not only premium but also beneficial for
                well-being.
              </li>

              <li>
                <strong className="text-cyan-600">Utilize Influencer Marketing:</strong> Partnering
                with health and wellness influencers could amplify brand awareness and reach
                health-focused consumer segments, driving customer acquisition and engagement.
              </li>

              <li>
                <strong className="text-cyan-600">Loyalty Program Development:</strong> Implementing
                a customer loyalty program can incentivize repeat purchases, thereby driving
                long-term brand loyalty amidst rising competition.
              </li>

              <li>
                <strong className="text-rose-600">Broaden Product Offerings:</strong> Introducing
                new flavor profiles or health-oriented coffee blends would cater to evolving
                consumer interests while boosting market share.
              </li>

              <li>
                <strong className="text-lime-600">Emphasize Sustainability:</strong> Continuing to
                highlight the environmental impact of purchasing Lifeboost Coffee, supported by
                compelling storytelling around sustainability efforts, could enhance emotional
                connections with consumers.
              </li>
            </ol>

            <h2 className="mt-8 text-lg font-semibold text-zinc-800">Conclusion</h2>
            <p>
              Lifeboost Coffee is strategically positioned to capitalize on the growing health and
              wellness trend in the coffee market. By focusing on its unique health benefits,
              sustainability efforts, and customer-centric strategies, Lifeboost can effectively
              carve out a significant niche in the competitive landscape. The recommendations
              outlined above aim to further strengthen its market position and appeal to an
              increasingly health-conscious audience.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
