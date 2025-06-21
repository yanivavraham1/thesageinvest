import Image from "next/image";
type ImageType = {
  src: string | null | undefined;
  alt?: string | null | undefined;
  caption?: string | null | undefined;
  priority?: boolean | undefined;
};

interface PostImageProps {
  image: ImageType;
}

export function PostImage({ image }: PostImageProps) {
  const fallbackImage =
    "https://res.cloudinary.com/dz5yhvdqt/image/upload/v1743437176/static/h5nzxswtrjhabostjqda.svg";
  const fallbackAlt = "something went wrong, image not found";

  return (
    <figure className="w-full">
      <div className="overflow-hidden rounded-lg w-full">
        <Image
          src={image.src || fallbackImage}
          alt={image.alt || fallbackAlt}
          width={1200}
          height={630}
          className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          priority={image.priority || true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
        />
      </div>
      {image.caption && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground italic px-4">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
