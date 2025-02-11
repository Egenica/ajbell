import { PieTooltipProps, ResponsivePie } from '@nivo/pie';

import { colors } from './colors';

type PortfolioAsset = {
  label: string;
  value: number;
};

const PortfolioPieChart = ({ portfolio }: { portfolio: PortfolioAsset[] }) => {
  const data = portfolio.map((asset: PortfolioAsset) => ({
    id: asset.label,
    label: asset.label,
    value: Math.round(asset.value),
  }));

  const Tooltip = ({ datum }: PieTooltipProps<PortfolioAsset>) => (
    <div className="border border-gray-300 bg-white p-1">
      <strong>{datum.id}</strong>: {datum.value}%
    </div>
  );

  return (
    <>
      <div className="my-3 flex items-center justify-center gap-1 md:gap-5">
        {data.map((item, i) => (
          <div key={item.id} className="legend-item flex items-center">
            <div
              style={{
                backgroundColor: colors[i],
              }}
              className="mr-1 h-4 w-4 rounded-full"
            ></div>
            <span className="text-xs">{item.label}</span>
          </div>
        ))}
      </div>
      <div style={{ aspectRatio: 1 / 1 }}>
        <ResponsivePie
          data={data}
          margin={{ top: 10, right: 8, bottom: 10, left: 8 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={colors.map((color) => color)}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [['darker', 0.8]] }}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          activeOuterRadiusOffset={8}
          tooltip={Tooltip}
        />
      </div>
    </>
  );
};

export default PortfolioPieChart;
