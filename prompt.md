Here’s a **production-ready master prompt** you can paste into **Cursor** to generate this app from scratch using modern, industry-standard technologies, while prioritising a **clean, non-technical user experience**.

You can tweak stack choices if you prefer, but this uses a very solid 2026-ready stack.

---

## ✅ MASTER PROMPT FOR CURSOR

---

**You are a senior full-stack architect and product designer.
Build a production-ready SaaS Website Builder application from scratch.
This product is designed for non-technical users.
The UI must be extremely intuitive, clean, modern, and frictionless.**

---

# 1️⃣ High-Level Requirements

Build a **Brand New Website Builder Platform** with the following goals:

- Non-technical friendly
- Drag-and-drop editing experience
- Fast frontend rendering (Google PageSpeed friendly)
- Modular block-based page builder
- Multi-tenant SaaS ready
- 14-day free trial
- Database independent (support PostgreSQL by default but abstract via ORM)
- Production ready architecture

---

# 2️⃣ Technology Stack (Industry Standard)

Use the following stack unless technically necessary to improve:

### Frontend (Editor + Rendered Sites)

- **Next.js (App Router)**
- **React**
- **TypeScript**
- **TailwindCSS**
- **ShadCN UI**
- **Framer Motion** (animations)
- **React Hook Form**
- **Zod**
- **dnd-kit** (drag & drop canvas builder)

### Backend

- Next.js server actions + API routes
- Prisma ORM (database abstraction)
- PostgreSQL (default)
- Redis (caching)
- Stripe (billing + 14 day trial)
- JWT session auth

### Media & Storage

- S3 compatible storage
- Image optimisation pipeline
- Sharp for image processing

### Infrastructure

- Docker ready
- Environment-based config
- Multi-tenant architecture

---

# 3️⃣ Core Architecture

Design system should follow:

- Modular block schema architecture
- Each page is JSON driven
- Blocks stored as structured JSON
- Server-side rendering for public sites
- Static optimisation where possible
- Edge caching

### Data Model Overview

Include models for:

- User
- Site
- Page
- Block
- Theme
- Media
- Form
- FormSubmission
- Subscription
- Backup

---

# 4️⃣ Features To Implement

---

## 🧱 Page Builder (Drag & Drop Canvas)

Build a grid-based drag and drop canvas:

- Drag blocks into layout
- Resize blocks (grid based)
- Reorder blocks
- Edit inline
- Live preview
- Undo/Redo history

Use:

- dnd-kit
- Controlled state architecture
- JSON layout persistence

---

## 🎨 Theme Designer

Create global style management:

- Colors
- Typography
- Spacing
- Border radius
- Buttons
- Shadows

Theme applies globally to all pages.

---

## 🖼 Configurable Blocks

Create reusable block components:

### Hero Blocks

- Image background
- Video background
- Overlay
- CTA buttons

### Content Blocks

- Text + Image
- Rich Text editor
- Custom Code block
- Accordion (FAQs)
- Pricing tables
- Reviews
- People / Bio blocks

Each block must:

- Be editable in side panel
- Support theme inheritance
- Support animation on scroll (Intersection Observer)

---

## 🧾 Custom Form Builder

- Drag form fields
- Field types: text, email, textarea, select, checkbox
- Validation rules
- Store submissions
- Email notification system
- Spam protection

---

## 🖌 Header & Footer Designer

- Fully editable
- Navigation builder
- Sticky option
- Mobile responsive
- Dropdown support

---

## 📁 Media Library

- Upload
- Folder organisation
- Image optimisation
- Automatic WebP conversion
- Lazy loading
- Alt tag management

---

## 🔍 SEO & Google Optimization

- Per page SEO editor
- Schema / structured data editor
- Meta tags
- OpenGraph
- Sitemap generation
- robots.txt editor
- PageSpeed optimised rendering

---

## ⚡ Performance Optimisation

- Static page generation when possible
- Image optimisation
- Code splitting
- Dynamic imports
- Caching
- Lazy loaded blocks

Must aim for:

- 90+ Google PageSpeed score

---

## 💾 Backup System

- Manual backup trigger
- Snapshot JSON storage
- Restore functionality

---

## 💳 SaaS + Free Trial

- Stripe integration
- 14-day free trial
- Plan tiers
- Usage limits
- Billing portal

---

# 5️⃣ UX Design Principles

Design specifically for non-tech users:

- No technical language
- Friendly microcopy
- Visual icons
- Large buttons
- Clear Save / Publish flow
- Guided onboarding wizard
- Tooltips
- Minimal cognitive load

Design aesthetic:

- Modern SaaS
- Soft shadows
- Rounded corners
- Neutral palette
- Clean spacing

---

# 6️⃣ Folder Structure

Generate a clean scalable monorepo structure:

- /apps/web
- /packages/ui
- /packages/editor
- /packages/blocks
- /packages/database
- /packages/utils

---

# 7️⃣ Deliverables Required From You

1. Full architecture plan
2. Database schema
3. Core components implementation
4. Block rendering engine
5. Page builder implementation
6. Theme system
7. SaaS billing flow
8. Example seeded demo site
9. Setup instructions
10. Docker configuration
11. Production deployment guide

---

# 8️⃣ Constraints

- Code must be clean
- Strict TypeScript
- Reusable components
- Scalable architecture
- No shortcuts
- Production ready
- Commented where helpful
- No deprecated libraries

---

# 9️⃣ Output Format

Respond with:

1. Architecture Overview
2. Step-by-step implementation plan
3. Database schema
4. Core code examples
5. Folder structure
6. Deployment guide

Build this like a real startup product, not a demo.

Over arching thought - Think like this is a VC-backed SaaS aiming to compete with Webflow, Wix and Framer.
