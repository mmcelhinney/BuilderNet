"use client";

import * as React from "react";
import { BlockWrapper } from "./block-wrapper";
import { Card, CardContent, CardFooter, CardHeader } from "@buildernet/ui";
import type { PageBlock } from "@buildernet/utils";

type PricingTier = {
  id: string;
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta: string;
  ctaUrl: string;
  highlighted?: boolean;
};

export function PricingBlock({
  block,
  theme,
  isEditor,
}: {
  block: PageBlock;
  theme?: Record<string, unknown>;
  isEditor?: boolean;
}) {
  const config = (block.config || {}) as { title?: string; tiers?: PricingTier[] };
  const tiers = config.tiers ?? [];

  return (
    <BlockWrapper blockId={block.id} animation={block.animation} isEditor={isEditor}>
      <div className="py-12">
        {config.title && (
          <h2 className="text-3xl font-bold text-center mb-10">{config.title}</h2>
        )}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={tier.highlighted ? "border-2 border-slate-900 shadow-lg" : ""}
            >
              <CardHeader>
                <h3 className="text-xl font-semibold">{tier.name}</h3>
                <div className="text-3xl font-bold">
                  {tier.price}
                  {tier.period && (
                    <span className="text-sm font-normal text-slate-500">/{tier.period}</span>
                  )}
                </div>
                {tier.description && (
                  <p className="text-slate-600 text-sm">{tier.description}</p>
                )}
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-600">✓</span> {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <a
                  href={tier.ctaUrl}
                  className={`inline-flex items-center justify-center w-full h-10 rounded-lg font-medium transition-colors ${
                    tier.highlighted
                      ? "bg-slate-900 text-white border-slate-900 hover:bg-slate-800"
                      : "border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {tier.cta}
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </BlockWrapper>
  );
}
