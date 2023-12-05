"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Product } from "@prisma/client";

import { Button } from "@/components/ui/button";
import Productitem from "@/components/ui/product-item";

import { cn } from "@/lib/utils";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";

import { computeProductTotalPrice } from "@/helpers/product";

interface IProductListProps {
  products: Product[];
  heading: string;
  productType: string;
}

const ProductList = ({ products, heading, productType }: IProductListProps) => {
  return (
    <div className="">
      <div className="flex items-center justify-between pb-5">
        <p className={cn(" font-bold uppercase lg:text-xl")}>{heading}</p>

        <div className="flex items-center gap-1">
          <Button variant="ghost" className={`${productType}-prev`}>
            <ChevronLeftIcon size={16} />
          </Button>

          <Button variant="ghost" className={`${productType}-next`}>
            <ChevronRightIcon size={16} />
          </Button>
        </div>
      </div>

      <Swiper
        breakpoints={{
          390: {
            slidesPerView: 2.1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3.3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6.3,
            spaceBetween: 10,
          },
        }}
        slidesPerGroup={2}
        navigation={{
          prevEl: `.${productType}-prev`,
          nextEl: `.${productType}-next`,
        }}
        modules={[Navigation]}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <Productitem
              product={{
                ...product,
                totalPrice: computeProductTotalPrice(product),
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductList;
