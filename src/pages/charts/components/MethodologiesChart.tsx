import { Methodology } from "../../../data/charts/charts";
import {
  Cell,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { getColorForMethodology } from "../../../utils/Extensions";
import { CardTypesCatalog } from "../../../data/cardtypes/cardTypes";

export interface ChartProps {
  methodologies: Methodology[];
  methodologiesCatalog: CardTypesCatalog[];
}

const MethodologiesChart = ({
  methodologies,
  methodologiesCatalog,
}: ChartProps) => {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: PieLabelRenderProps | any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <PieChart>
        <Pie
          dataKey="totalCards"
          data={methodologies}
          cx="50%"
          cy="45%"
          outerRadius={100}
          labelLine={false}
          label={renderCustomizedLabel}
        >
          {methodologies.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getColorForMethodology(
                methodologiesCatalog,
                entry.methodology
              )}
            />
          ))}
        </Pie>
        <Tooltip
          content={({ payload }) => (
            <div>
              {payload?.map((item, index) => (
                <div
                  className="bg-card-fields md:text-sm text-xs w-52 md:w-auto text-white py-2 px-4 rounded-md shadow-lg"
                  key={index}
                >
                  <p>Methodology: {item.payload.methodology}</p>
                  <p>Total cards: {item.payload.totalCards}</p>
                </div>
              ))}
            </div>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MethodologiesChart;
