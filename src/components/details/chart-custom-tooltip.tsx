import { FormattedStockTimeSerie } from "@/types/types";

export const ChartCustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { payload?: FormattedStockTimeSerie }[];
  label?: string;
}) => {
  if (!active || !payload || !payload[0] || !payload[0].payload) return null;
  return (
    <div className="p-3 bg-slate-200 text-xs">
      <p>{label}</p>
      <p className="font-bold">{payload[0].payload.close}</p>
      <p>Open: {payload[0].payload.open}</p>
      <p>High: {payload[0].payload.high}</p>
      <p>Low: {payload[0].payload.low}</p>
      <p>Close: {payload[0].payload.close}</p>
      <p>Volume: {payload[0].payload.volume}</p>
    </div>
  );
};
