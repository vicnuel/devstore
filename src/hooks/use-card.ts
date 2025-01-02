import { CardContext } from "@/context/card-context";
import { useContext } from "react";

export function useCard() {
  return useContext(CardContext);
}
