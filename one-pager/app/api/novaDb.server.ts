import type {
  NovaObject,
  NovaObjectListRoot,
  RequestFiltersParams,
  RequestObjectsParams,
} from "./api.types";
import { WebPage } from "./page";
import { mapReferences, resolveChildrenFor } from "./references";
import https from "node:https";
import { PassThrough } from "stream";

const TOKEN = process.env.BASIC_AUTH_TOKEN;
const NOVADB_ENDPOINT = process.env.DELIVERY_API;
const NOVADB_BRANCH = process.env.BRANCH;

const BASIC = `Basic ${TOKEN}`;

const buildTypedEndpoint = (type: string, id?: number) =>
  `${NOVADB_ENDPOINT}branches/${NOVADB_BRANCH}/types/${type}/objects${
    id ? id : ""
  }`;

/** Creates an Delivery API Request object including auth and content type headers */
export const deliveryApiRequest = (
  url: string,
  contentType: string = "application/json; charset=utf-8",
  additionalHeaders: [{ name: string; value: string }] | [] = []
) => {
  const headers = new Headers();
  headers.set("Authorization", BASIC);
  headers.set("Content-Type", contentType);
  for (const header of additionalHeaders) {
    headers.set(header.name, header.value);
  }
  return new Request(url, {
    method: "GET",
    headers,
  });
};

/**
 * Retrieves json from the given DeliveryApi endpoint
 * @param endpoint The DeliveryApi endpoint for the requested resource
 */
async function apiFetchJson<TR>(endpoint: string) {
  let data: TR | null = null;
  try {
    const response = await fetch(deliveryApiRequest(endpoint));
    if (response.status === 200) {
      data = (await response.json()) as TR;
    } else {
      console.error(`Api call ${endpoint} failed`);
    }
  } catch (e) {
    console.error(`Api call ${endpoint} failed`, e);
  }

  return data;
}

/**
 * Gets a binary stream object for the given endpoint
 */
function apiBinaryStream(endpoint: URL) {
  const passThrough = new PassThrough();
  const request = {
    hostname: endpoint.hostname,
    port: endpoint.port,
    path: endpoint.pathname,
    headers: {
      Authorization: BASIC,
    },
  };
  https
    .get(request, (response) => {
      if (response.statusCode !== 200) {
        passThrough.emit(
          "error",
          new Error(`Requested Failed: status ${response.statusCode}`)
        );
        return;
      }
      response.pipe(passThrough);
    })
    .on("error", (err) => {
      passThrough.emit("error", err);
    });
  return passThrough;
}

/**
 * Resolves all webpage modules an their references
 * @param page The webpage object
 * @param refs All loaded references for that page objects
 */
export async function resolvePageModules(
  page: WebPage,
  refs: NovaObject[]
): Promise<NovaObject[]> {
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
  return modules;
}

/**
 * Get a list of typed objects
 * @param type The object's ApiIdentifier
 * @param query The query parameter
 */
export async function getSingleObject<T extends NovaObject>(
  id: number,
  type: string,
  query: RequestObjectsParams
) {
  const searchParams = new URLSearchParams(query as Record<string, string>);
  const getObjectRequestEndpoint = `${buildTypedEndpoint(
    type,
    id
  )}?${searchParams}`;
  return await apiFetchJson<NovaObjectListRoot<T>>(getObjectRequestEndpoint);
}
/**
 * Get a list of typed objects
 * @param type The object's ApiIdentifier
 * @param query The query parameter
 */
export async function getObjects<T extends NovaObject>(
  type: string,
  query: RequestObjectsParams & RequestFiltersParams
) {
  const searchParams = new URLSearchParams(query as Record<string, string>);
  const getObjectRequestEndpoint = `${buildTypedEndpoint(
    type
  )}?${searchParams}`;
  return await apiFetchJson<NovaObjectListRoot<T>>(getObjectRequestEndpoint);
}

/**
 * Get an external binary by its checksum
 */
export function getFileStream(fileName: string, md5: string) {
  const splitByDot = fileName.split(".");
  const fileExtension = splitByDot[splitByDot.length - 1];

  return apiBinaryStream(
    new URL(`${NOVADB_ENDPOINT}files/${md5}.${fileExtension}`)
  );
}
