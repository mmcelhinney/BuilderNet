"use client";

import { Button, Input } from "@buildernet/ui";
import { createSite } from "@/app/actions/site";

export function CreateSiteForm() {
  return (
    <form action={createSite} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          Site name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="My awesome site"
          required
        />
      </div>
      <Button type="submit">Create site</Button>
    </form>
  );
}
