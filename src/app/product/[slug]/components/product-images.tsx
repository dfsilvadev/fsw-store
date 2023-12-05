"use client";

import { useState } from "react";
import Image from "next/image";

interface IProductImagesProps {
  productName: string;
  imageUrls: string[];
}

const ProductImages = ({ productName, imageUrls }: IProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);

  const handleToggleImage = (newImageUrl: string) => {
    setCurrentImage(newImageUrl);
  };

  return (
    <div className="flex flex-col lg:min-h-full lg:w-3/5">
      <div className="flex h-[380px] w-full items-center justify-center bg-accent lg:h-full lg:rounded-lg">
        <Image
          src={currentImage}
          alt={productName}
          height={0}
          width={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%] object-contain"
        />
      </div>

      <div className="mt-8 grid grid-cols-4 gap-4 px-5 lg:px-0">
        {imageUrls.map((url) => (
          <button
            key={url}
            className={`flex h-[100px] items-center justify-center rounded-lg bg-accent
                ${
                  url === currentImage && "border-2 border-solid border-primary"
                }
            `}
            onClick={() => handleToggleImage(url)}
          >
            <Image
              src={url}
              alt={productName}
              height={0}
              width={0}
              sizes="100vw"
              className="h-auto max-h-[70%] w-auto max-w-[80%]"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
