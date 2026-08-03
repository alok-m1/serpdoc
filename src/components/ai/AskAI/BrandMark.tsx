"use client";
import Image from "next/image";
import { cn } from "@/lib/cn";

export function BrandMark({
  size = "md",
  className,
}: {
  size?: "md" | "sm" | "lg";
  className?: string;
}) {
  const sizeClass =
    size === "sm"
      ? "size-7 rounded-lg"
      : size === "lg"
        ? "size-14 rounded-2xl"
        : "size-9 rounded-xl";

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden shadow-md shadow-fd-primary/20",
        sizeClass,
        className,
      )}
    >
      <Image
        src="/serphouse-logo.svg"
        alt="SERPHouse"
        fill
        sizes="3rem"
        className="object-cover"
      />
    </div>
  );
}
