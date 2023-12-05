import { Badge } from "@/components/ui/badge";
import Productitem from "@/components/ui/product-item";

import prisma from "@/lib/prisma";

import { computeProductTotalPrice } from "@/helpers/product";

import { CATEGORIES_ICONS } from "@/constants/category-icon";

interface ICategoryProductsPageProps {
  params: {
    slug: string;
  };
}

const CategoryProductsPage = async ({ params }: ICategoryProductsPageProps) => {
  const category = await prisma.category.findFirst({
    where: {
      slug: params.slug,
    },
    include: {
      products: true,
    },
  });

  if (!category) {
    return null;
  }

  return (
    <div className="mx-auto flex flex-col gap-8 p-5 lg:container lg:gap-10 lg:py-10">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        {CATEGORIES_ICONS[params.slug as keyof typeof CATEGORIES_ICONS]}
        {category.name}
      </Badge>

      <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
        {category.products.map((product) => (
          <Productitem
            product={{
              ...product,
              totalPrice: computeProductTotalPrice(product),
            }}
            key={product.id}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryProductsPage;
