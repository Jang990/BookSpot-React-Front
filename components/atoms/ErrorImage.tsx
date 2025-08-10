interface Props {
  src: string;
  alt: string;
}
export const ErrorImage = ({ src, alt }: Props) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      style={{ aspectRatio: "1 / 1" }}
    />
  );
};
