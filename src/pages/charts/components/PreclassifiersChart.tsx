import { useEffect, useState } from "react";

import { Preclassifier } from "../../../data/charts/charts";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getColorForMethodology } from "../../../utils/Extensions";
import { useGetPreclassifiersChartDataMutation } from "../../../services/chartService";
import { CardTypesCatalog } from "../../../data/cardtypes/cardTypes";
import Strings from "../../../utils/localizations/Strings";

export interface ChartProps {
  siteId: string;
  methodologiesCatalog: CardTypesCatalog[];
}

const PreclassifiersChart = ({ siteId, methodologiesCatalog }: ChartProps) => {
  const [getAnomalies] = useGetPreclassifiersChartDataMutation();
  const [preclassifiers, setPreclassifiers] = useState<Preclassifier[]>([]);
  const handleGetData = async () => {
    const response = await getAnomalies(siteId).unwrap();
    setPreclassifiers(response);
  };
  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <BarChart data={preclassifiers} margin={{ bottom: 80 }}>
        <Tooltip
          content={(props) => (
            <div>
              {props.payload?.map((item, index) => {
                return (
                  <div
                    className="bg-card-fields md:text-sm text-xs w-52 md:w-auto text-white py-2 px-4 rounded-md shadow-lg"
                    key={index}
                  >
                    <p>
                      {Strings.preclassifierChart} {item.payload.preclassifier}
                    </p>
                    <p>
                      {Strings.totalCards} {item.payload.totalCards}
                    </p>
                    <p>
                      {Strings.methodologyChart} {item.payload.methodology}
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
          dataKey={"preclassifier"}
          angle={-20}
          textAnchor="end"
          className="md:text-sm text-xs"
        />
        <Bar dataKey="totalCards">
          {preclassifiers.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={getColorForMethodology(
                methodologiesCatalog,
                entry.methodology
              )}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
export default PreclassifiersChart;
