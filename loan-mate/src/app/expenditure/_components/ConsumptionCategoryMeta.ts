import { ConsumptionCategory } from "@/models/expenditure-limit";
import {
  ArrowLeftRight,
  Utensils,
  Bus,
  ShoppingBag,
  Clapperboard,
  MoreHorizontal,
} from "lucide-react";

export const ConsumptionCategoryMeta = {
  TRANSFER: {
    icon: ArrowLeftRight,
    hex: "#64748B",
    bg: "bg-slate-500",
  },
  FOOD: {
    icon: Utensils,
    hex: "#F97316",
    bg: "bg-orange-500",
  },
  TRANSPORT: {
    icon: Bus,
    hex: "#3B82F6",
    bg: "bg-blue-500",
  },
  SHOPPING: {
    icon: ShoppingBag,
    hex: "#A855F7",
    bg: "bg-purple-500",
  },
  ENTERTAINMENT: {
    icon: Clapperboard,
    hex: "#EF4444",
    bg: "bg-red-500",
  },
  ETC: {
    icon: MoreHorizontal,
    hex: "#10B981",
    bg: "bg-emerald-500",
  },
} as const;

export type ConsumptionCategoryMetaType = typeof ConsumptionCategoryMeta;

export const ConsumptionCategoryKeyMap: Record<ConsumptionCategory, keyof typeof ConsumptionCategoryMeta> = {
  [ConsumptionCategory.TRANSFER]: "TRANSFER",
  [ConsumptionCategory.FOOD]: "FOOD",
  [ConsumptionCategory.TRANSPORT]: "TRANSPORT",
  [ConsumptionCategory.SHOPPING]: "SHOPPING",
  [ConsumptionCategory.ENTERTAINMENT]: "ENTERTAINMENT",
  [ConsumptionCategory.ETC]: "ETC",
};

