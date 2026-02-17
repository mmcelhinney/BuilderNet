"use client";

import * as React from "react";
import { cn } from "@buildernet/ui";

export interface BlockWrapperProps {
  children: React.ReactNode;
  blockId: string;
  animation?: "none" | "fade" | "slideUp" | "slideLeft" | "zoom";
  className?: string;
  isEditor?: boolean;
}

/** Wraps block content with optional scroll animation (Intersection Observer) */
export function BlockWrapper({
  children,
  blockId,
  animation = "none",
  className,
  isEditor,
}: BlockWrapperProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(isEditor ?? false);

  React.useEffect(() => {
    if (isEditor || animation === "none") {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, isEditor]);

  const animationClass =
    animation === "fade"
      ? "animate-fade-in"
      : animation === "slideUp"
        ? "animate-slide-up"
        : animation === "slideLeft"
          ? "animate-slide-left"
          : animation === "zoom"
            ? "animate-zoom-in"
            : "";

  return (
    <div
      ref={ref}
      id={blockId}
      data-block-id={blockId}
      className={cn(
        "min-h-[2rem]",
        !visible && animation !== "none" && "opacity-0 translate-y-4 transition-all duration-500",
        visible && animation !== "none" && "opacity-100 translate-y-0 transition-all duration-500",
        animationClass,
        className
      )}
    >
      {children}
    </div>
  );
}
