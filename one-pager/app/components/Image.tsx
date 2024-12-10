import { ImageProps } from "~/api/image";

export const Image = (image: ImageProps) => {
  return (
    <img
      src={`/image/${image.externalBinaryMD5}/${image.externalBinaryFileName}`}
      alt=""
    />
  );
};
