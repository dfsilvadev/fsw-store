import { useContext } from "react";
import Image from "next/image";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";

import { Button } from "./button";

import { CartContext, ICartProduct } from "@/providers/cart";

interface ICartItemProps {
  product: ICartProduct;
}

const CartItem = ({ product }: ICartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useContext(CartContext);

  const handleDecreaseProductQuantity = () => {
    decreaseProductQuantity(product.id);
  };

  const handleIncreaseProductQuantity = () => {
    increaseProductQuantity(product.id);
  };

  const handleRemoveProduct = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent lg:h-[120px] lg:w-[120px]">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>

        <div className="flex flex-col gap-1 lg:gap-2">
          <p className="text-xs lg:text-sm">{product.name}</p>

          <div className="flex items-center gap-2">
            <p className="text-sm font-bold lg:text-base">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(+product.totalPrice)}
            </p>

            {product.discountPercentage > 0 && (
              <p className="text-xs line-through opacity-75 lg:text-sm">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(+product.basePrice)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 lg:gap-3">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 lg:h-9 lg:w-9"
              onClick={handleDecreaseProductQuantity}
            >
              <MinusIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>

            <span className="px-1 text-sm">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 lg:h-9 lg:w-9"
              onClick={handleIncreaseProductQuantity}
            >
              <PlusIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="outline"
        className="h-8 w-8 lg:h-9 lg:w-9"
        onClick={handleRemoveProduct}
      >
        <TrashIcon className="h-4 w-4 lg:h-5 lg:w-5" />
      </Button>
    </div>
  );
};

export default CartItem;
