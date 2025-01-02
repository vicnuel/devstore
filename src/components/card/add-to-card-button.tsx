"use client";
import { useCard } from "@/hooks/use-card";

export type AddToCardButtonProps = {
  productId: number;
};

export function AddToCardButton({ productId }: AddToCardButtonProps) {
  const { addCard } = useCard();

  const handleAddToCard = () => {
    addCard(productId);
  };

  return (
    <button
      type="button"
      className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 text-white font-semibold"
      onClick={handleAddToCard}
    >
      Adicionar ao carrinho
    </button>
  );
}
