import type {
  NovaObject,
  NovaObjectListRoot,
  RequestFiltersParams,
  RequestObjectsParams,
} from "./api.types";

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
 *  Get a list of typed objects
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
