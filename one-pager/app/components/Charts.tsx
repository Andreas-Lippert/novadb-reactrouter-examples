import { WebChart } from "~/api/webChart";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  TooltipProps,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const renderToolTip = (props: TooltipProps<string, number>) => {
  return (
    <div className="bg-slate-50/90 dark:bg-black/80 pb-2 pt-2 pl-4 pr-4 rounded-md shadow-md dark:shadow-none dark:border dark:border-white/40">
      <ul>
        {props.payload?.map((point) =>
          point.value ? (
            <li
              key={point.name}
              style={{ color: point.color }}
              className="clear-both"
            >
              {point.name}
              <span className="float-right ml-5">{point.value}</span>
            </li>
          ) : null
        )}
      </ul>
    </div>
  );
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA80EE"];

export const Charts = (webChart: WebChart) => {
  const chartType = webChart.props.chartType;
  const firstSet = webChart.references?.sets[0];
  const dataFirstSet = firstSet?.references?.data ?? [];
  let stackFields: Record<string, any> = [];
  if (chartType === "Stacked" && webChart.references?.stacked) {
    stackFields = webChart.references?.stacked;
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-center mt-16 text-gray-950 dark:text-gray-50">
        {webChart.props.webTitle}
      </h2>
      {chartType === "Pie chart" && (
        <ResponsiveContainer height={500}>
          <PieChart
            width={500}
            height={500}
            className="ml-auto mr-auto mb-16 mt-5"
          >
            <Pie
              data={dataFirstSet}
              dataKey="value"
              cx="50%"
              cy="50%"
              fill="#8884d8"
            >
              {dataFirstSet.map((_entry, index) => {
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                );
              })}
              <LabelList dataKey="value" position="insideBottomRight" />
              <LabelList dataKey="name" position="outside" stroke="gray" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
      {chartType === "Stacked" && (
        <ResponsiveContainer height={600}>
          <AreaChart
            width={1000}
            height={600}
            data={webChart.references?.stacked}
            className="ml-auto mr-auto mt-12 mb-16 pr-5"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={renderToolTip} />
            {Object.entries(stackFields[0]).map(([key, _], index) => {
              if (index === 0) return null;
              const color = COLORS[index % COLORS.length];

              return (
                <Area
                  key={key}
                  type="monotone"
                  dataKey={key}
                  stackId="1"
                  stroke={color}
                  fill={color}
                />
              );
            })}
          </AreaChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
