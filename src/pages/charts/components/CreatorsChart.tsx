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
import { Creators } from "../../../data/charts/charts";
import { useGetCreatorsChartDataMutation } from "../../../services/chartService";

export interface ChartProps {
  siteId: string;
}

const CreatorsChart = ({ siteId }: ChartProps) => {
  const [getCreators] = useGetCreatorsChartDataMutation();
  const [creators, setCreators] = useState<Creators[]>([]);
  const handleGetData = async () => {
    const response = await getCreators(siteId).unwrap();
    setCreators(response);
  };
  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart data={creators} margin={{ bottom: 50 }}>
        <Tooltip
          content={(props) => (
            <div>
              {props.payload?.map((item, index) => {
                return (
                  <div
                    className="bg-card-fields md:text-sm text-xs w-52 md:w-auto text-white py-2 px-4 rounded-md shadow-lg"
                    key={index}
                  >
                    <p>Creator: {item.payload.creator}</p>
                    <p>Total cards: {item.payload.totalCards}</p>
                  </div>
                );
              })}
            </div>
          )}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <YAxis dataKey={"totalCards"} />
        <XAxis
          dataKey={"creator"}
          angle={-15}
          textAnchor="end"
          className="md:text-sm text-xs"
        />
        <Bar dataKey="totalCards" fill="#6b3a5a" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default CreatorsChart;
