import { NovaObject } from "./api.types";
import { resolveChildrenFor } from "./references";

/**
 * Retrieves all webChartDataSets for the given webChart module
 * @param webChart The parent webCart module
 * @param resolvedReferences All loaded references
 */
export function resolveWebChartSets(
  webChart: WebChart,
  resolvedReferences: Map<number, NovaObject>
) {
  const dataSets: WebChartDataSet[] = [];

  for (const dataSetRef of webChart.props.chartDataSetRefs) {
    if (!resolvedReferences.has(dataSetRef)) {
      console.warn(`Chart data set ${dataSetRef} was not found`);
      continue;
    }

    const dataSet = resolvedReferences.get(dataSetRef) as WebChartDataSet;

    resolveChildrenFor(dataSet, resolvedReferences);
    dataSets.push(dataSet);
  }
  if (!webChart.references) {
    webChart.references = { sets: [] };
  }
  webChart.references.sets = dataSets;
  if (webChart.props.chartType === "Stacked") {
    webChart.references.stacked = stackDataSets(webChart);
    webChart.references.sets = []; // Cleared, as we only need the stacked data
  }
  return dataSets;
}

/**
 * Retrieves all webChartDataPoints for the given webChartDataSet
 * @param webChartDataSet The parent WebChartDataSet
 * @param resolvedReferences All loaded references
 */
export function resolveWebChartDataPoints(
  webChartDataSet: WebChartDataSet,
  resolvedReferences: Map<number, NovaObject>
) {
  const data: RechartPoint[] = [];
  for (const dataPointRef of webChartDataSet.props.chartDataPointRefs) {
    if (!resolvedReferences.has(dataPointRef)) {
      console.warn(`Chart data point ${dataPointRef} was not found`);
      continue;
    }

    const dataPoint = resolvedReferences.get(dataPointRef) as NovaObject;
    if (!isWebChartDataPoint(dataPoint)) {
      console.error(
        `Invalid object type ${dataPoint?.meta.type} for chartDataPoint`
      );
      break;
    }

    data.push({
      name: dataPoint.props.webTitle,
      value: dataPoint.props.chartDataPointValue,
    });
  }
  if (!webChartDataSet.references) {
    webChartDataSet.references = { data: [] };
  }
  webChartDataSet.references.data = data;
  return data;
}

function stackDataSets(webChart: WebChart) {
  let stack: Record<string, any>[] = [];
  const dataSets = webChart.references?.sets;
  if (dataSets && dataSets.length > 0) {
    let firstSet = dataSets[0];
    if (!firstSet.references) return stack;

    let index = 0;
    stack = firstSet.references.data.map((rootGroup) => {
      let group: Record<string, any> = { name: rootGroup.name };
      for (const set of dataSets) {
        if (!set.references) continue;

        const point = set.references.data[index];
        group[set.props.webTitle] = point.value;
      }
      index++;
      return group;
    });
  }
  return stack;
}

//** WebChart types ** //

export type WebChart = NovaObject<WebChartProps, WebChartReferences>;
export type WebChartType = "Pie chart" | "Stacked";

export type WebChartProps = {
  webTitle: string;
  chartDataSetRefs: number[];
  chartType: WebChartType;
};

export type WebChartReferences = {
  sets: WebChartDataSet[];
  stacked?: Record<string, any>[];
};

export type WebChartDataSet = NovaObject<
  WebChartDataSetProps,
  WebChartDataSetReferences
>;

export type WebChartDataSetProps = {
  webTitle: string;
  chartDataPointRefs: number[];
};

export type WebChartDataPoint = NovaObject<WebChartDataPointProps>;

export type WebChartDataPointProps = {
  webTitle: string;
  chartDataPointValue: number;
};

export type RechartPoint = {
  name: string;
  value: number;
};

export type WebChartDataSetReferences = {
  data: RechartPoint[];
};

//** WebChart type guards ** //

export function isWebChart(obj: NovaObject): obj is WebChart {
  return obj.meta.type === "webChart";
}

export function isWebChartDataSet(obj: NovaObject): obj is WebChartDataSet {
  return obj.meta.type === "chartDataSet";
}

export function isWebChartDataPoint(obj: NovaObject): obj is WebChartDataPoint {
  return obj.meta.type === "chartDataPoint";
}
