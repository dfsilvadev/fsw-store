import Image, { ImageProps } from "next/image";

const PromoBanner = ({ alt, ...props }: ImageProps) => {
  return (
    <Image
      {...props}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw"
      className="h-auto w-full"
      loading="lazy"
    />
  );
};

export default PromoBanner;
