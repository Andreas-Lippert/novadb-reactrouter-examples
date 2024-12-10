export type LanguageKey = "de-DE" | "en-US";

type ResolvedReferences<T = {}> = T extends NovaObject ? T[] : never;

/*
 * Represents a list root in NovaDB, containing multiple objects and their references.
 *`TO` is the type of the objects, and `TR` is the type of their references.
 */
export type NovaObjectListRoot<TO, TR = {}> = {
  skip: number;
  count: number;
  more: boolean;
  objs: TO[];
  refs: ResolvedReferences<TR>;
};

/*
 * Represents the root of an object in NovaDB, containing the main object and its references.
 *`TO` is the type of the object, and `TR` is the type of its references.
 */
export type NovaObjectRoot<TO, TR = {}> = {
  object: NovaObject<TO>;
  references: ResolvedReferences<TR>;
};

/* Represents the metadata information for an object in NovaDB.*/
export type NovaMeta = {
  id: number;
  guid: string;
  type?: string;
  typeRef: number;
  lastTransaction: number;
  lastModified: Date;
  deleted: boolean;
  eTag: string;
};

/* Represents a generic object in NovaDB with associated metadata and properties.
 * The type `T` defines the structure of the properties.
 */
export type NovaObject<T = unknown> = {
  meta: NovaMeta;
  props?: T;
  sortReverse?: { [key: string]: number[] };
};

export type RequestObjectsParams = {
  /** The localization language as an ID or a culture name
   *Default value : en-US
   */
  lang?: LanguageKey;
  /**
   *A comma separated list of ApiIdentifiers attributes to be resolved and returned in a "refs" list. Wrong ApiIdentifiers are ignored.
   */
  resolve?: string;
  /** The maximum depth to resolve referred objects
   * @default 100
   */
  resoveDepth?: number;
  /** The maximum depth to resolve reverse references*
   * @default 100
   */
  resolveReverseDepth?: number;
  /** Resolve units of measure
   * @default false*/
  resolveUnits?: boolean;
  /**
   * Mode to show properties (0 = configured by ObjectTypeApiAttributes, 1 = all with API identifiers, 2 = none)
   * @default 0
   */
  props?: 0 | 1 | 2;
  /** Skip a number of items. Must not be negative
   * @default 0*/
};

export type RequestFiltersParams = {
  /** A list of filter conditions joined with the AND operator '&&'. A condition is build from an ApiIdentifier, a compare operator (=, !=, <, >, <=, >=, :) and a value. Prefix with 'meta.' to access meta data.
   * */
  filter?: string;
  /** A comma separated list of attribute IDs or ApiIdentifiers used as sort criteria. 'asc' or 'desc' can be used as an additional keyword to set the sort order. The default sort order is by object ID.*/
  sort?: string;
  /** Skip a number of items. Must not be negative
   * @default 0*/
  skip?: number;
  /** Take this number of items. Must be in the range 1..1000
   * @default 0
   */
  take?: number;
};
