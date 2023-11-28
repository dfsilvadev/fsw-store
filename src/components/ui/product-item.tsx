import Image from "next/image";

import DiscountBadge from "./discount-badge";

import { ProductWithTotalPrice } from "@/helpers/product";

interface IProductItemProps {
  product: ProductWithTotalPrice;
}

const Productitem = ({ product }: IProductItemProps) => {
  return (
    <div className="flex min-w-[156px] flex-col gap-4">
      <div className="bg-accent relative flex aspect-square w-full items-center justify-center rounded-lg">
        <Image
          src={product?.imageUrls[0]}
          alt={product?.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
          loading="lazy"
        />

        {product.discountPercentage > 0 && (
          <DiscountBadge className="absolute left-3 top-3">
            {product.discountPercentage}
          </DiscountBadge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="truncate text-sm">{product.name}</p>

        <div className="flex items-center justify-between gap-2 ">
          {product.discountPercentage > 0 ? (
            <>
              <p className="truncate text-sm font-semibold md:text-lg">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(+product.totalPrice)}
              </p>

              <p className="truncate text-xs line-through opacity-75">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(+product.basePrice)}
              </p>
            </>
          ) : (
            <p className="truncate text-xs font-semibold">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(+product.basePrice)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Productitem;
