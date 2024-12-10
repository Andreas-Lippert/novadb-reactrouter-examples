import { NovaObject, NovaSimplHtml } from "./api.types";

export type WebText = NovaObject<WebTextProps>;

export type WebTextProps = {
  webContent: NovaSimplHtml;
};

export function isWebText(obj: NovaObject): obj is WebText {
  return obj.meta.type === "webText";
}
