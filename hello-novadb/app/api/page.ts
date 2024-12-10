import { LanguageKey, NovaObject } from "./api.types";
import { getObjects } from "./novaDb";

export async function loadWebPage(lang: LanguageKey) {
  // We load a single webPage object
  const helloNovaDB = await getObjects<WebPage>("WebPage", {
    lang,
    take: 1,
  });
  if (helloNovaDB === null || helloNovaDB.count === 0) {
    throw new Response(null, {
      status: 400,
      statusText: "Not Found",
    });
  }

  const firstPage = helloNovaDB.objs[0];
  return firstPage;
}

export type WebPage = NovaObject<PageProps>;

export type PageProps = {
  webTitle: string;
};
