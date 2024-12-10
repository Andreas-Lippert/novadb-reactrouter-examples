import { LanguageKey, NovaObject } from "./api.types";
import { getObjects } from "./novaDb.server";
import { mapReferences, resolveChildrenFor } from "./references";

export async function loadWebPage(lang: LanguageKey) {
  // We load a single webPage object and all its references
  const helloNovaDB = await getObjects<WebPage>("WebPage", {
    resolve: "webModuleRefs,chartDataSetRefs,chartDataPointRefs",
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
  // We map the list of resolved references to their modules
  firstPage.references = resolvePageModules(firstPage, helloNovaDB.refs);
  return firstPage;
}
/**
 * Resolves all webpage modules and their references
 * @param page The webpage object
 * @param refs All loaded references for that page objects
 */
export function resolvePageModules(
  page: WebPage,
  refs: NovaObject[]
): PageReferences {
  const moduleReferences = mapReferences(refs);
  const modules: NovaObject[] = [];

  for (const refId of page.props.webModuleRefs) {
    if (!moduleReferences.has(refId)) {
      console.warn(`Page feference ${refId} was not found`);
      continue;
    }

    const pageModule = moduleReferences.get(refId) as NovaObject;
    resolveChildrenFor(pageModule, moduleReferences);
    modules.push(pageModule);
  }
  return { modules };
}

//** Page types ** //

export type WebPage = NovaObject<PageProps, PageReferences>;

export type PageProps = {
  webTitle: string;
  webModuleRefs: number[];
};

export type PageReferences = {
  modules: NovaObject[];
};
