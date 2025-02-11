import { ResponsiveBar } from '@nivo/bar';
import React from 'react';

const TopHoldingsBarChart = ({
  holdings,
}: {
  holdings: { name: string; weighting: number }[];
}) => {
  const data = holdings.map((holding) => {
    const [firstName, lastName] = holding.name.split(' ');
    return {
      name: `${firstName}-${lastName}`, // Optional adjustment for name
      weighting: holding.weighting,
    };
  });

  // Check data.name doesn't have duplicates and if it does add a number to the end of the name
  const nameCount = new Map();
  data.forEach((item) => {
    if (nameCount.has(item.name)) {
      const count = nameCount.get(item.name);
      item.name = `${item.name}[${count}]`;
      nameCount.set(item.name, count + 1);
    } else {
      nameCount.set(item.name, 1);
    }
  });

  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <div style={{ aspectRatio: 3 / 3 }} data-testid="top-holdings-bar-chart">
      <ResponsiveBar
        data={data}
        keys={['weighting']}
        indexBy="name"
        margin={{ top: 0, right: 10, bottom: 30, left: 100 }}
        padding={0.4}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={'#79bff1'}
        borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        borderWidth={1}
        axisTop={null}
        axisRight={null}
        labelSkipWidth={20}
        labelSkipHeight={20}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        layout="horizontal"
      />
    </div>
  );
};

export default TopHoldingsBarChart;
