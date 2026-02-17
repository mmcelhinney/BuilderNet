"use client";

import * as React from "react";
import { BlockWrapper } from "./block-wrapper";
import { Button, Input } from "@buildernet/ui";
import type { PageBlock } from "@buildernet/utils";

type FormTemplate = "contact" | "review" | "general_enquiry";

const TEMPLATE_LABELS: Record<FormTemplate, string> = {
  contact: "Contact form",
  review: "Review form",
  general_enquiry: "General enquiry",
};

/** Form block: supports templates (contact, review, general enquiry) and submits to block-forms API. */
export function FormBlock({
  block,
  theme,
  isEditor,
}: {
  block: PageBlock;
  theme?: Record<string, unknown>;
  isEditor?: boolean;
}) {
  const config = (block.config || {}) as {
    formId?: string;
    formTemplate?: FormTemplate | string;
    formTitle?: string;
    submitLabel?: string;
    successMessage?: string;
  };
  const formTemplate = (config.formTemplate as FormTemplate) || "contact";
  const formTitle = config.formTitle ?? (formTemplate === "contact" ? "Get in touch" : formTemplate === "review" ? "Leave a review" : "Send an enquiry");
  const submitLabel = config.submitLabel ?? "Submit";
  const successMessage = config.successMessage ?? "Thanks for your message!";

  if (isEditor) {
    return (
      <BlockWrapper blockId={block.id} animation={block.animation} isEditor>
        <div className="rounded-xl border-2 border-dashed border-slate-300 p-8 text-center text-slate-500">
          <p className="font-medium text-slate-700">{TEMPLATE_LABELS[formTemplate as FormTemplate] ?? formTemplate}</p>
          <p className="text-sm mt-1">{formTitle}</p>
          <p className="text-xs mt-2">Select this block to choose form type and edit settings</p>
        </div>
      </BlockWrapper>
    );
  }

  return (
    <BlockWrapper blockId={block.id} animation={block.animation} isEditor={false}>
      <FormBlockRender
        blockId={block.id}
        siteId={theme?.siteId as string | undefined}
        formTemplate={formTemplate}
        formTitle={formTitle}
        submitLabel={submitLabel}
        successMessage={successMessage}
      />
    </BlockWrapper>
  );
}

function FormBlockRender({
  blockId,
  siteId,
  formTemplate,
  formTitle,
  submitLabel,
  successMessage,
}: {
  blockId: string;
  siteId?: string;
  formTemplate: FormTemplate | string;
  formTitle: string;
  submitLabel: string;
  successMessage: string;
}) {
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!siteId) {
      setError("Form is not configured.");
      return;
    }
    setError(null);
    const form = e.currentTarget;
    const data: Record<string, string> = {};
    new FormData(form).forEach((value, key) => {
      if (key !== "formTemplate" && key !== "siteId" && key !== "blockId") data[key] = String(value);
    });
    try {
      const res = await fetch("/api/block-forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId, blockId, formTemplate, ...data }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((json.error as string) || "Something went wrong.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong.");
    }
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-700">
        {successMessage}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {formTitle && <h3 className="text-xl font-semibold text-slate-900 mb-4">{formTitle}</h3>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="formTemplate" value={formTemplate} />
        {formTemplate === "contact" && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <Input id="name" name="name" type="text" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea id="message" name="message" rows={4} className="flex w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Your message" required />
            </div>
          </>
        )}
        {formTemplate === "review" && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <Input id="name" name="name" type="text" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
              <select id="rating" name="rating" className="flex h-10 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" required>
                <option value="">Select rating</option>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} star{n === 1 ? "" : "s"}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-slate-700 mb-1">Your review</label>
              <textarea id="comment" name="comment" rows={4} className="flex w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Share your experience" required />
            </div>
          </>
        )}
        {formTemplate === "general_enquiry" && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <Input id="name" name="name" type="text" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <Input id="email" name="email" type="email" placeholder="you@example.com" required />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <Input id="subject" name="subject" type="text" placeholder="What is this regarding?" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea id="message" name="message" rows={4} className="flex w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="Your enquiry" required />
            </div>
          </>
        )}
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" className="w-full">{submitLabel}</Button>
      </form>
    </div>
  );
}
