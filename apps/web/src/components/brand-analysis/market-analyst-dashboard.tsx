import { Badge } from "@documenso/ui/primitives/badge"
import { Button } from "@documenso/ui/primitives/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@documenso/ui/primitives/card"
import { ScrollArea } from "@documenso/ui/primitives/scroll-area"
import { Separator } from "@documenso/ui/primitives/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@documenso/ui/primitives/tabs"
import { Leaf, Lightbulb, Shield, TrendingUp, Users } from "lucide-react"
import CompetitorComparison from "./competitor-comparison"
import MarketPositioningChart from "./market-positioning-chart"
import RecommendationCard from "./recommendation-card"
import FullReportDialog from "./full-report-dialog"

export default function MarketAnalystDashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      

      <main className="flex-1">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Lifeboost Coffee Analysis</h2>
                <p className="text-muted-foreground">Competitive Analysis and Market Positioning</p>
              </div>
              <Badge variant="default" className="w-fit bg-rose-100 text-rose-600">
                Premium Coffee Market
              </Badge>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Brand Focus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-rose-600" />
                    <span className="font-medium">Health-Oriented</span>
                  </div>
                  <Badge className="bg-lime-100 text-lime-800">Primary</Badge>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Leaf className="h-5 w-5 text-lime-600" />
                    <span className="font-medium">Sustainability</span>
                  </div>
                  <Badge className="bg-cyan-100 text-cyan-800">Strong</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Target Audience</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-cyan-600" />
                  <div>
                    <p className="font-medium">Health-conscious consumers</p>
                    <p className="text-sm text-muted-foreground">Premium coffee enthusiasts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Market Position</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-rose-600" />
                  <div>
                    <p className="font-medium">Premium Segment</p>
                    <p className="text-sm text-muted-foreground">Health & Quality Focused</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="positioning" className="mt-6">
            <TabsList className="grid w-full grid-cols-3 bg-zinc-100 text-zinc-600 [&>[data-state=active]]:bg-rose-600 [&>[data-state=active]]:text-white">
              <TabsTrigger value="positioning">Market Positioning</TabsTrigger>
              <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="positioning" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Market Positioning Insights</CardTitle>
                  <CardDescription>Key elements contributing to Lifeboost Coffee's market position</CardDescription>
                </CardHeader>
                <CardContent>
                  <MarketPositioningChart />

                  <div className="mt-6 space-y-4">
                    <div className="rounded-lg border bg-white p-4">
                      <h3 className="flex items-center gap-2 font-semibold">
                        <Shield className="h-5 w-5 text-rose-600" />
                        Health-Oriented Focus
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Lifeboost Coffee distinguishes itself through its unique TrustPure® process, which ensures that
                        its coffee is free from mycotoxins, heavy metals, and pesticides, appealing to health-conscious
                        consumers.
                      </p>
                    </div>

                    <div className="rounded-lg border bg-white p-4">
                      <h3 className="flex items-center gap-2 font-semibold">
                        <Leaf className="h-5 w-5 text-lime-600" />
                        Sustainability Commitment
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        The brand's commitment to fair trade and sustainable farming practices enhances its appeal among
                        environmentally-conscious consumers. Lifeboost explicitly ties its success to helping farmers
                        and protecting wildlife.
                      </p>
                    </div>

                    <div className="rounded-lg border bg-white p-4">
                      <h3 className="flex items-center gap-2 font-semibold">
                        <Shield className="h-5 w-5 text-cyan-600" />
                        Consumer Assurance
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Lifeboost bolsters consumer trust through its 30-day money-back guarantee, which encourages
                        first-time purchases by reducing perceived risk.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="competitors" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Competitor Comparison</CardTitle>
                  <CardDescription>Analysis of major competitors in the premium coffee market</CardDescription>
                </CardHeader>
                <CardContent>
                  <CompetitorComparison />

                  <ScrollArea className="mt-6 h-[400px] rounded-md border">
                    <div className="p-4 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold">Blue Bottle Coffee</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          This brand emphasizes quality and experience rather than health attributes, appealing
                          primarily to upscale consumers who appreciate artisanal coffee-making processes. Lifeboost's
                          focus on health gives it an edge in markets where wellness is a primary concern.
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-semibold">Stumptown Coffee Roasters</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          While also emphasizing quality through direct trade and sourcing, its messaging is less
                          centered on health, suggesting an opportunity for Lifeboost to attract customers looking for
                          both quality and wellness in their coffee choices.
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-semibold">Death Wish Coffee</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          By focusing on extreme strength, this brand appeals more to younger, perhaps less
                          health-focused demographics. Lifeboost's emphasis on health makes it more suitable for a
                          diverse range of consumers, including those concerned about the health implications of
                          caffeine.
                        </p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-semibold">Peet's Coffee</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          With a traditional approach orienting towards flavor profiles, Peet's does not leverage health
                          messaging effectively. Lifeboost's combination of premium quality and health-conscious
                          marketing presents a differentiated offering.
                        </p>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Strategic Recommendations</CardTitle>
                  <CardDescription>
                    Strategies to strengthen market position and capitalize on current trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <RecommendationCard
                      title="Expand Health Messaging"
                      description="Enhance online content and materials that directly address health benefits to better educate consumers and differentiate the brand."
                      icon={<Shield className="h-5 w-5" />}
                      priority="High"
                    />

                    <RecommendationCard
                      title="Utilize Influencer Marketing"
                      description="Partner with health and wellness influencers to amplify brand awareness and reach health-focused consumer segments."
                      icon={<Users className="h-5 w-5" />}
                      priority="Medium"
                    />

                    <RecommendationCard
                      title="Loyalty Program Development"
                      description="Implement a customer loyalty program to incentivize repeat purchases and drive long-term brand loyalty."
                      icon={<TrendingUp className="h-5 w-5" />}
                      priority="Medium"
                    />

                    <RecommendationCard
                      title="Broaden Product Offerings"
                      description="Introduce new flavor profiles or health-oriented coffee blends to cater to evolving consumer interests."
                      icon={<Lightbulb className="h-5 w-5" />}
                      priority="High"
                    />
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold">Conclusion</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Lifeboost Coffee is strategically positioned to capitalize on the growing health and wellness
                      trend in the coffee market. By focusing on its unique health benefits, sustainability efforts, and
                      customer-centric strategies, Lifeboost can effectively carve out a significant niche in the
                      competitive landscape.
                    </p>
                    <FullReportDialog />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

