import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Area } from "../../../data/charts/charts";
import { useGetAreasChartDataMutation } from "../../../services/chartService";
import Strings from "../../../utils/localizations/Strings";

export interface ChartProps {
  siteId: string;
}

const AreasChart = ({ siteId }: ChartProps) => {
  const [getAreas] = useGetAreasChartDataMutation();
  const [areas, setAreas] = useState<Area[]>([]);
  const handleGetData = async () => {
    const response = await getAreas(siteId).unwrap();
    setAreas(response);
  };
  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart data={areas} margin={{ bottom: 50 }}>
        <Tooltip
          content={(props) => (
            <div>
              {props.payload?.map((item) => {
                return (
                  <div
                    className="bg-card-fields md:text-sm text-xs w-52 md:w-auto text-white py-2 px-4 rounded-md shadow-lg"
                    key={item.payload.area}
                  >
                    <p>
                      {Strings.areaChart} {item.payload.area}
                    </p>
                    <p>
                      {Strings.totalCards} {item.payload.totalCards}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis dataKey={"totalCards"} />
        <XAxis
          dataKey={"area"}
          angle={-20}
          textAnchor="end"
          className="md:text-sm text-xs"
        />
        <Bar stroke="black" dataKey="totalCards" fill="#3b4d6b" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default AreasChart;
