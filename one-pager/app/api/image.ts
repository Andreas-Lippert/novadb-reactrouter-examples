import { NovaObject } from "./api.types";

export type Image = NovaObject<ImageProps>;

export type ImageProps = {
  externalBinaryFileName: string;
  externalBinaryMD5: string;
};

export function isImage(obj: NovaObject): obj is Image {
  return obj.meta.type === "image";
}
