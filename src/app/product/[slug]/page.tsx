import prisma from "@/lib/prisma";

import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import ProductList from "@/components/ui/product-list";

import { computeProductTotalPrice } from "@/helpers/product";

interface IProductDetailsPageProps {
  params: {
    slug: string;
  };
}
const ProductDetailsPage = async ({
  params: { slug },
}: IProductDetailsPageProps) => {
  const product = await prisma.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) return null;

  return (
    <div className="flex flex-col gap-8 pb-8 lg:container lg:mx-auto lg:gap-10 lg:py-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-9  lg:px-5">
        <ProductImages
          imageUrls={product.imageUrls}
          productName={product.name}
        />
        <ProductInfo
          product={{
            ...product,
            totalPrice: computeProductTotalPrice(product),
          }}
        />
      </div>

      <div className="px-5">
        <ProductList
          heading="Produtos Recomendados"
          products={product.category.products}
          productType="related-products"
        />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
