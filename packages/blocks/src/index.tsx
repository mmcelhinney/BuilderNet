/**
 * @buildernet/blocks
 * Reusable block components for the page builder.
 * Each block supports theme inheritance and optional animation on scroll.
 */
import type { ComponentType } from "react";
import type { PageBlock } from "@buildernet/utils";
export { HeroBlock } from "./hero";
export { BackgroundBlock } from "./background";
export { LogoBlock } from "./logo";
export { TextBlock } from "./text";
export { TextImageBlock } from "./text-image";
export { RichTextBlock } from "./rich-text";
export { AccordionBlock } from "./accordion";
export { PricingBlock } from "./pricing";
export { FormBlock } from "./form";
export { CarouselBlock } from "./carousel";
export { SocialBlock } from "./social";
export type { HeroBlockConfig } from "./hero";
export type { BlockWrapperProps } from "./block-wrapper";

import { HeroBlock } from "./hero";
import { BackgroundBlock } from "./background";
import { LogoBlock } from "./logo";
import { TextBlock } from "./text";
import { TextImageBlock } from "./text-image";
import { RichTextBlock } from "./rich-text";
import { AccordionBlock } from "./accordion";
import { PricingBlock } from "./pricing";
import { FormBlock } from "./form";
import { CarouselBlock } from "./carousel";
import { SocialBlock } from "./social";

export type BlockComponentProps = {
  block: PageBlock;
  theme?: Record<string, unknown>;
  isEditor?: boolean;
};

export const blockComponents: Record<string, ComponentType<BlockComponentProps>> = {
  hero: HeroBlock,
  background: BackgroundBlock,
  logo: LogoBlock,
  text: TextBlock,
  textImage: TextImageBlock,
  richText: RichTextBlock,
  accordion: AccordionBlock,
  pricing: PricingBlock,
  form: FormBlock,
  carousel: CarouselBlock,
  social: SocialBlock,
};
