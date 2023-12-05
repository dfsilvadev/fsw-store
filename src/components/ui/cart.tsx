import { useContext } from "react";
import { ShoppingCartIcon } from "lucide-react";

import { Badge } from "./badge";
import { Button } from "./button";
import CartItem from "./cart-item";
import { ScrollArea } from "./scroll-area";
import { Separator } from "./separator";

import { CartContext } from "@/providers/cart";

import { computeProductTotalPrice } from "@/helpers/product";

const Cart = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
        variant="outline"
      >
        <ShoppingCartIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex h-full max-h-full flex-col gap-5 overflow-hidden">
        <Separator />

        <div className="flex items-center justify-between text-xs lg:text-sm">
          <p>Itens</p>
          <p>{String(products.length).padStart(2, "0")}</p>
        </div>

        <ScrollArea className="h-full w-full rounded-md border p-4">
          <div className="flex h-full flex-col gap-8">
            {products.length > 0 ? (
              products.map((product) => (
                <CartItem
                  key={product.id}
                  product={{
                    ...product,
                    totalPrice: computeProductTotalPrice(product),
                  }}
                />
              ))
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 opacity-25">
                <ShoppingCartIcon size={46} />
                <p className="text-center font-semibold">
                  Seu carrinho está vazio :(
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {products.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs lg:text-sm">
            <p>Subtotal</p>
            <p>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(subtotal)}
            </p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs lg:text-sm">
            <p>Entrega</p>
            <p className="uppercase">Grátis</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs lg:text-sm">
            <p>Descontos</p>
            <p>
              -{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(totalDiscount)}
            </p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm font-bold lg:text-base">
            <p>Total</p>
            <p>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(total)}
            </p>
          </div>

          <Separator />

          <Button className="mt-7 font-bold uppercase">Finalizar compra</Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
