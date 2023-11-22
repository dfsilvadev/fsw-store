"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  PercentIcon,
  ShoppingCartIcon,
} from "lucide-react";

import { Button } from "./button";
import { Card } from "./card";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Separator } from "./separator";
const Header = () => {
  const { status, data } = useSession();

  const handleLogin = async () => {
    await signIn();
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <Card className="flex items-center justify-between p-[1.875rem]">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <div>
            <div className="flex items-center justify-between pb-4 pt-4">
              {status === "authenticated" && data?.user && (
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                    </AvatarFallback>

                    {data.user.image && (
                      <AvatarImage
                        src={data.user.image}
                        alt={data.user.name!}
                      />
                    )}
                  </Avatar>

                  <p className="font-small">{data.user.name}</p>
                </div>
              )}

              <SheetHeader className="text-left text-lg font-semibold">
                Menu
              </SheetHeader>
            </div>

            <Separator />
          </div>

          <div className="mt-2 flex flex-col gap-2 pt-4">
            {status === "unauthenticated" && (
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleLogin}
              >
                <LogInIcon size={16} />
                Fazer login
              </Button>
            )}

            {status === "authenticated" && (
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={handleLogout}
              >
                <LogOutIcon size={16} />
                Fazer logout
              </Button>
            )}

            <Button variant="outline" className="w-full justify-start gap-2">
              <HomeIcon size={16} />
              Início
            </Button>

            <Button variant="outline" className="w-full justify-start gap-2">
              <PercentIcon size={16} />
              Ofertas
            </Button>

            <Button variant="outline" className="w-full justify-start gap-2">
              <ListOrderedIcon size={16} />
              Catálogo
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <h1 className="text-lg font-semibold">
        FSW <span className="text-primary">Store</span>
      </h1>

      <Button size="icon" variant="outline">
        <ShoppingCartIcon />
      </Button>
    </Card>
  );
};

export default Header;
