"use client";
import { useCard } from "@/hooks/use-card";
import { ShoppingBag } from "lucide-react";

export function CardWidget() {
  const { items } = useCard();
  return (
    <div className="flex items-center gap-2">
      <ShoppingBag className="w-5 h-5" />
      <span>Cart ({items.length})</span>
    </div>
  );
}
