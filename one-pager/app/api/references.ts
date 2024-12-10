import { NovaObject } from "./api.types";
import {
  isWebChart,
  isWebChartDataSet,
  resolveWebChartDataPoints,
  resolveWebChartSets,
} from "./webChart";

/*
 * Resolves known module references and their references
 * @param module The parent module
 * @param resolvedReferences All loaded references for the given parent object
 */
export async function resolveChildrenFor<TM extends NovaObject>(
  module: TM,
  resolvedReferences: Map<number, NovaObject>
) {
  switch (module.meta.type) {
    case "webChart":
      if (!isWebChart(module)) {
        break;
      }
      resolveWebChartSets(module, resolvedReferences);
      break;
    case "chartDataSet":
      if (!isWebChartDataSet(module)) {
        break;
      }
      resolveWebChartDataPoints(module, resolvedReferences);
      break;
  }
  return module;
}
/** Collects all loaded references in a Map
 * @param flatReferences The flat list of references retrieved from the Delivery Api
 */
export function mapReferences(flatReferences: NovaObject[]) {
  const references = new Map<number, NovaObject>();

  for (const ref of flatReferences) {
    references.set(ref.meta.id, ref);
  }
  return references;
}
