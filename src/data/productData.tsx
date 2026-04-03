import { Droplets, Zap, Shield, Settings } from "lucide-react";
import type { Locale } from "@/i18n/translations";
import icellImg from "@/assets/icell-product.jpg";
import icubeImg from "@/assets/icube-product.jpg";
import ishellImg from "@/assets/ishell-product.jpg";
import wwtpImg from "@/assets/wwtp-product.jpg";

import enProducts from "@/i18n/products/en.json";
import zhProducts from "@/i18n/products/zh.json";
import deProducts from "@/i18n/products/de.json";
import esProducts from "@/i18n/products/es.json";
import arProducts from "@/i18n/products/ar.json";

type BioTankRow = { mode: string; volTotal: string; biofillerVol: string; width: string; height: string; inletDia: string; inletHeight: string; weight: string };
type SpecRow = { model: string; capacity: string; size: string; inlet: string; outlet: string; power: string };
type WaterParam = { param: string; value: string };

export interface ProductData {
  slug: string;
  name: string;
  tagline: string;
  tag: string;
  img: string;
  description: string[];
  specs: SpecRow[];
  bioTankSpecs?: BioTankRow[];
  inletCriteria?: WaterParam[];
  outletCriteria?: WaterParam[];
  features: string[];
  advantages: string[];
  highlights: { icon: React.ReactNode; label: string; value: string }[];
  applicationAreas?: string[];
}

// Icons per product slot (order matches highlights array in JSON)
const highlightIcons = [
  <Droplets className="w-5 h-5" />,
  <Zap className="w-5 h-5" />,
  <Shield className="w-5 h-5" />,
  <Settings className="w-5 h-5" />,
];

const imgMap: Record<string, string> = {
  icell: icellImg,
  icube: icubeImg,
  ishell: ishellImg,
  wwtp: wwtpImg,
};

type RawProduct = Omit<ProductData, "img" | "highlights"> & {
  highlights: { label: string; value: string }[];
};

function hydrateProducts(raw: Record<string, RawProduct>): Record<string, ProductData> {
  return Object.fromEntries(
    Object.entries(raw).map(([slug, p]) => [
      slug,
      {
        ...p,
        img: imgMap[slug],
        highlights: p.highlights.map((h, i) => ({
          ...h,
          icon: highlightIcons[i],
        })),
      },
    ])
  );
}

const productData: Record<Locale, Record<string, ProductData>> = {
  en: hydrateProducts(enProducts as Record<string, RawProduct>),
  zh: hydrateProducts(zhProducts as Record<string, RawProduct>),
  de: hydrateProducts(deProducts as Record<string, RawProduct>),
  es: hydrateProducts(esProducts as Record<string, RawProduct>),
  ar: hydrateProducts(arProducts as Record<string, RawProduct>),
};

export const getProducts = (locale: Locale) => productData[locale] ?? productData["en"];
export const getProduct = (locale: Locale, slug: string) => (productData[locale] ?? productData["en"])[slug];
