
import React from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line
} from 'recharts';
import { cn } from '@/lib/utils';

type ChartType = 'area' | 'bar' | 'line';

interface AnalyticsChartProps {
  data: any[];
  type?: ChartType;
  title: string;
  className?: string;
  height?: number;
  colors?: string[];
  dataKeys: string[];
  legendLabels?: { [key: string]: string };
  showLegend?: boolean;
  XAxisDataKey?: string;
  showGrid?: boolean;
  rightMargin?: number;
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({
  data,
  type = 'line',
  title,
  className = '',
  height = 300,
  colors = ['#4797FF', '#00B14F', '#EE4D2D', '#D70F64'],
  dataKeys,
  legendLabels,
  showLegend = true,
  XAxisDataKey = 'name',
  showGrid = true,
  rightMargin = 10
}) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data} margin={{ right: rightMargin }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey={XAxisDataKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: 'none'
              }}
            />
            {showLegend && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />}
            {dataKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                fillOpacity={0.2}
                fill={colors[index % colors.length]}
                name={legendLabels?.[key] || key}
                activeDot={{ r: 6 }}
              />
            ))}
          </AreaChart>
        );
      case 'bar':
        return (
          <BarChart data={data} margin={{ right: rightMargin }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey={XAxisDataKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: 'none'
              }}
            />
            {showLegend && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />}
            {dataKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                name={legendLabels?.[key] || key}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        );
      case 'line':
      default:
        return (
          <LineChart data={data} margin={{ right: rightMargin }}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis dataKey={XAxisDataKey} tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip
              contentStyle={{ 
                backgroundColor: 'white', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                border: 'none'
              }}
            />
            {showLegend && <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />}
            {dataKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                name={legendLabels?.[key] || key}
                activeDot={{ r: 6 }}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className={cn("glassmorphism rounded-xl p-4", className)}>
      <h3 className="font-bold mb-3">{title}</h3>
      <div className="w-full" style={{ height: height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
