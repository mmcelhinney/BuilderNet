"use client";

import * as React from "react";
import { Input } from "@buildernet/ui";
import type { PageBlock } from "@buildernet/utils";

interface BlockSettingsProps {
  block: PageBlock | null;
  onUpdate: (config: Partial<PageBlock["config"]>) => void;
}

export function BlockSettings({ block, onUpdate }: BlockSettingsProps) {
  if (!block) {
    return (
      <div className="p-4 text-sm text-slate-500">
        Select a block to edit its settings
      </div>
    );
  }

  const config = (block.config || {}) as Record<string, unknown>;

  const handleChange = (key: string, value: unknown) => {
    onUpdate({ [key]: value });
  };

  if (block.type === "hero") {
    return (
      <div className="p-4 space-y-4">
        <p className="text-xs font-medium text-slate-500 uppercase">Hero</p>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <Input
            value={(config.title as string) ?? ""}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Heading"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
          <Input
            value={(config.subtitle as string) ?? ""}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            placeholder="Subheading"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Background image URL</label>
          <Input
            value={(config.backgroundImage as string) ?? ""}
            onChange={(e) => handleChange("backgroundImage", e.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>
    );
  }

  if (block.type === "text") {
    const alignment = (config.alignment as string) || "left";
    const presetColors = [
      { value: "", label: "Default" },
      { value: "#0f172a", label: "Dark" },
      { value: "#374151", label: "Gray" },
      { value: "#1e40af", label: "Blue" },
      { value: "#166534", label: "Green" },
      { value: "#b91c1c", label: "Red" },
    ];
    return (
      <div className="p-4 space-y-4">
        <p className="text-xs font-medium text-slate-500 uppercase">Text</p>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Content</label>
          <textarea
            className="flex min-h-[80px] w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
            value={(config.content as string) ?? ""}
            onChange={(e) => handleChange("content", e.target.value)}
            placeholder="Your text..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Alignment</label>
          <div className="flex gap-2">
            {(["left", "center", "right"] as const).map((align) => (
              <button
                key={align}
                type="button"
                onClick={() => handleChange("alignment", align)}
                className={`flex-1 rounded-lg border px-3 py-2 text-sm capitalize ${
                  alignment === align
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {align === "center" ? "Centre" : align}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Formatting</label>
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={!!config.bold}
                onChange={(e) => handleChange("bold", e.target.checked)}
              />
              <span className="font-bold">Bold</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={!!config.italic}
                onChange={(e) => handleChange("italic", e.target.checked)}
              />
              <span className="italic">Italic</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={!!config.underline}
                onChange={(e) => handleChange("underline", e.target.checked)}
              />
              <span className="underline">Underline</span>
            </label>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Text colour</label>
          <div className="flex flex-wrap gap-2 items-center">
            <select
              value={(config.color as string) ?? ""}
              onChange={(e) => handleChange("color", e.target.value)}
              className="flex h-9 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm"
            >
              {presetColors.map((c) => (
                <option key={c.value || "default"} value={c.value}>{c.label}</option>
              ))}
            </select>
            <input
              type="color"
              value={(config.color as string) ?? "#0f172a"}
              onChange={(e) => handleChange("color", e.target.value)}
              className="h-9 w-12 cursor-pointer rounded border border-slate-200"
              title="Pick a colour"
            />
          </div>
        </div>
      </div>
    );
  }

  if (block.type === "pricing") {
    type Tier = { id: string; name: string; price: string; period?: string; description?: string; features: string[]; cta: string; ctaUrl: string; highlighted?: boolean };
    const tiers = (config.tiers as Tier[]) ?? [];
    const updateTiers = (next: Tier[]) => handleChange("tiers", next);
    const addTier = () => updateTiers([...tiers, { id: `tier_${Date.now()}`, name: "Plan", price: "$0", period: "month", features: [], cta: "Get started", ctaUrl: "#", highlighted: false }]);
    const removeTier = (index: number) => updateTiers(tiers.filter((_, i) => i !== index));
    const updateTier = (index: number, updates: Partial<Tier>) => updateTiers(tiers.map((t, i) => (i === index ? { ...t, ...updates } : t)));
    const setTierFeatures = (index: number, text: string) => updateTier(index, { features: text.split("\n").filter(Boolean) });

    return (
      <div className="p-4 space-y-4">
        <p className="text-xs font-medium text-slate-500 uppercase">Pricing</p>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Section title</label>
          <Input
            value={(config.title as string) ?? ""}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Pricing"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-slate-700">Plans</label>
            <button type="button" onClick={addTier} className="text-xs text-slate-600 hover:text-slate-900 underline">
              + Add plan
            </button>
          </div>
          <div className="space-y-4">
            {tiers.map((tier, index) => (
              <div key={tier.id || `tier-${index}`} className="rounded-lg border border-slate-200 p-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-slate-500">Plan {index + 1}</span>
                  <button type="button" onClick={() => removeTier(index)} className="text-xs text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
                <Input value={tier.name} onChange={(e) => updateTier(index, { name: e.target.value })} placeholder="Plan name" />
                <div className="grid grid-cols-2 gap-2">
                  <Input value={tier.price} onChange={(e) => updateTier(index, { price: e.target.value })} placeholder="Price" />
                  <Input value={tier.period ?? ""} onChange={(e) => updateTier(index, { period: e.target.value })} placeholder="e.g. month" />
                </div>
                <Input value={tier.description ?? ""} onChange={(e) => updateTier(index, { description: e.target.value })} placeholder="Short description" />
                <div>
                  <label className="block text-xs text-slate-500 mb-0.5">Features (one per line)</label>
                  <textarea
                    className="flex min-h-[60px] w-full rounded border border-slate-200 px-2 py-1 text-sm"
                    value={(tier.features ?? []).join("\n")}
                    onChange={(e) => setTierFeatures(index, e.target.value)}
                    placeholder="Feature 1&#10;Feature 2"
                  />
                </div>
                <Input value={tier.cta} onChange={(e) => updateTier(index, { cta: e.target.value })} placeholder="Button text" />
                <Input value={tier.ctaUrl} onChange={(e) => updateTier(index, { ctaUrl: e.target.value })} placeholder="Button URL" />
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={!!tier.highlighted} onChange={(e) => updateTier(index, { highlighted: e.target.checked })} />
                  Highlight this plan
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (block.type === "form") {
    const formTemplates = [
      { value: "contact", label: "Contact form" },
      { value: "review", label: "Review form" },
      { value: "general_enquiry", label: "General enquiry" },
    ] as const;
    const formTemplate = (config.formTemplate as string) || "contact";

    return (
      <div className="p-4 space-y-4">
        <p className="text-xs font-medium text-slate-500 uppercase">Form</p>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Form type</label>
          <select
            value={formTemplate}
            onChange={(e) => handleChange("formTemplate", e.target.value)}
            className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            {formTemplates.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Form title</label>
          <Input
            value={(config.formTitle as string) ?? ""}
            onChange={(e) => handleChange("formTitle", e.target.value)}
            placeholder="Get in touch"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Submit button text</label>
          <Input
            value={(config.submitLabel as string) ?? "Submit"}
            onChange={(e) => handleChange("submitLabel", e.target.value)}
            placeholder="Submit"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Success message</label>
          <Input
            value={(config.successMessage as string) ?? ""}
            onChange={(e) => handleChange("successMessage", e.target.value)}
            placeholder="Thanks for your message!"
          />
        </div>
      </div>
    );
  }

  if (block.type === "carousel") {
    type CarouselImage = { id: string; url: string; alt?: string };
    const images = (config.images as CarouselImage[]) ?? [];
    const minImages = 3;
    const updateImages = (next: CarouselImage[]) => handleChange("images", next);
    const addImage = () =>
      updateImages([
        ...images,
        { id: `img_${Date.now()}`, url: "", alt: "" },
      ]);
    const removeImage = (index: number) =>
      updateImages(images.filter((_, i) => i !== index));
    const updateImage = (index: number, updates: Partial<CarouselImage>) =>
      updateImages(images.map((img, i) => (i === index ? { ...img, ...updates } : img)));

    return (
      <div className="p-4 space-y-4">
        <p className="text-xs font-medium text-slate-500 uppercase">Carousel</p>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Behaviour</label>
          <select
            value={(config.behavior as string) ?? "smooth"}
            onChange={(e) => handleChange("behavior", e.target.value)}
            className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm"
          >
            <option value="smooth">Smooth scroll</option>
            <option value="snap">Snap / Flick</option>
          </select>
          <p className="text-xs text-slate-500 mt-1">
            Smooth: gradual transition. Snap: quick flick to next slide.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Autoplay speed (seconds)</label>
          <Input
            type="number"
            min={0}
            step={1}
            value={config.autoplaySpeed ?? 5}
            onChange={(e) => handleChange("autoplaySpeed", e.target.value ? Number(e.target.value) : 0)}
            placeholder="0 = off"
          />
          <p className="text-xs text-slate-500 mt-1">0 = no autoplay. How many seconds between slides.</p>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-slate-700">Images (min {minImages})</label>
            <button type="button" onClick={addImage} className="text-xs text-slate-600 hover:text-slate-900 underline">
              + Add image
            </button>
          </div>
          <div className="space-y-3">
            {images.map((img, index) => (
              <div key={img.id} className="rounded-lg border border-slate-200 p-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Image {index + 1}</span>
                  {images.length > minImages && (
                    <button type="button" onClick={() => removeImage(index)} className="text-xs text-red-600 hover:underline">
                      Remove
                    </button>
                  )}
                </div>
                <Input
                  value={img.url}
                  onChange={(e) => updateImage(index, { url: e.target.value })}
                  placeholder="Image URL"
                />
                <Input
                  value={img.alt ?? ""}
                  onChange={(e) => updateImage(index, { alt: e.target.value })}
                  placeholder="Alt text (optional)"
                />
              </div>
            ))}
          </div>
          {images.length < minImages && (
            <p className="text-xs text-amber-600 mt-1">Add at least {minImages - images.length} more image(s).</p>
          )}
        </div>
      </div>
    );
  }

  if (block.type === "social") {
    const SOCIAL_PLATFORMS = [
      { id: "facebook", label: "Facebook" },
      { id: "twitter", label: "X (Twitter)" },
      { id: "instagram", label: "Instagram" },
      { id: "linkedin", label: "LinkedIn" },
      { id: "youtube", label: "YouTube" },
      { id: "tiktok", label: "TikTok" },
    ];
    type SocialLink = { platform: string; url: string };
    const links = (config.links as SocialLink[]) ?? [];
    const updateLinks = (next: SocialLink[]) => handleChange("links", next);
    const addLink = () => updateLinks([...links, { platform: "facebook", url: "" }]);
    const removeLink = (index: number) => updateLinks(links.filter((_, i) => i !== index));
    const updateLink = (index: number, updates: Partial<SocialLink>) =>
      updateLinks(links.map((l, i) => (i === index ? { ...l, ...updates } : l)));

    return (
      <div className="p-4 space-y-4">
        <p className="text-xs font-medium text-slate-500 uppercase">Social links</p>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Button alignment</label>
          <div className="flex gap-2">
            {(["left", "center", "right"] as const).map((align) => (
              <button
                key={align}
                type="button"
                onClick={() => handleChange("alignment", align)}
                className={`flex-1 rounded-lg border px-2 py-1.5 text-sm ${
                  (config.alignment ?? "center") === align
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {align === "center" ? "Centre" : align}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-slate-700">Profile links</label>
            <button type="button" onClick={addLink} className="text-xs text-slate-600 hover:text-slate-900 underline">
              + Add platform
            </button>
          </div>
          <p className="text-xs text-slate-500 mb-2">Add a platform and paste the link to your profile.</p>
          <div className="space-y-3">
            {links.map((link, index) => (
              <div key={index} className="rounded-lg border border-slate-200 p-2 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-500">Link {index + 1}</span>
                  <button type="button" onClick={() => removeLink(index)} className="text-xs text-red-600 hover:underline">
                    Remove
                  </button>
                </div>
                <select
                  value={link.platform}
                  onChange={(e) => updateLink(index, { platform: e.target.value })}
                  className="flex h-9 w-full rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm"
                >
                  {SOCIAL_PLATFORMS.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
                <Input
                  value={link.url}
                  onChange={(e) => updateLink(index, { url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 text-sm text-slate-500">
      Settings for &quot;{block.type}&quot; block
    </div>
  );
}
