import Categories from "./components/categories";
import ProductList from "@/components/ui/product-list";
import PromoBanner from "./components/promo-banner";

import prisma from "@/lib/prisma";

export default async function Home() {
  const deals = await prisma.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prisma.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prisma.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <main>
      <div className="mx-auto flex flex-col gap-8 p-4 py-8 lg:container lg:gap-10">
        <PromoBanner
          src="/images/png/banner-header.png"
          alt="Até 55% de desconto esse mês."
        />

        <Categories />

        <ProductList heading="Ofertas" products={deals} productType="deals" />

        <PromoBanner
          src="/images/png/banner-fones.png"
          alt="Até 55% de desconto em mouses."
        />

        <ProductList
          heading="Teclados"
          products={keyboards}
          productType="keyboards"
        />

        <PromoBanner
          src="/images/png/banner-mouses.png"
          alt="Até 20% de desconto em fones."
        />

        <ProductList heading="Mouses" products={mouses} productType="mouses" />
      </div>
    </main>
  );
}
