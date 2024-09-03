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
import { useGetMachinesChartDataMutation } from "../../../services/chartService";
import Strings from "../../../utils/localizations/Strings";
import { Machine } from "../../../data/charts/charts";

export interface ChartProps {
  siteId: string;
}

const MachinesChart = ({ siteId }: ChartProps) => {
  const [getMachines] = useGetMachinesChartDataMutation();
  const [machines, setMachines] = useState<Machine[]>([]);
  const handleGetData = async () => {
    const response = await getMachines(siteId).unwrap();
    setMachines(response);
  };
  useEffect(() => {
    handleGetData();
  }, []);
  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart data={machines} margin={{ bottom: 50 }}>
        <Tooltip
          content={(props) => (
            <div>
              {props.payload?.map((item) => {
                return (
                  <div
                    className="bg-card-fields md:text-sm text-xs w-52 md:w-auto text-white py-2 px-4 rounded-md shadow-lg"
                    key={item.payload.machine}
                  >
                    <p>
                      {Strings.location} {item.payload.location}
                    </p>
                    <p>
                      {Strings.machine} {item.payload.machine}
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
          dataKey={"machine"}
          angle={-20}
          textAnchor="end"
          className="md:text-sm text-xs"
        />
        <Bar stroke="black" dataKey="totalCards" fill="#6b5454" />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default MachinesChart;
