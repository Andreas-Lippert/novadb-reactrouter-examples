import { NovaObject } from "./api.types";
import { ImageProps } from "./image";
import { WebTextProps } from "./webText";

export type WebTeaser = NovaObject<TeaserProps>;

export type TeaserAlignment = "Text|Image" | "Image|Text" | "Stacked";

export type TeaserProps = WebTextProps &
  ImageProps & {
    teaserAlignment: TeaserAlignment;
  };

export function isTeaser(obj: NovaObject): obj is WebTeaser {
  return obj.meta.type === "webTeaser";
}
