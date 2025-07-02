'use client';

import { useQuery, gql } from '@apollo/client';

const COUNTRY_DATA_QUERY = gql`
  query CubeData($country: String!, $measure: String!) {
    cube_cube_M6Lh5is0FtqUhZ(
      where: { country: { _eq: $country }, measure: { _eq: $measure } }
    ) {
      value
      year
    }
  }
`;

export default function CountryData({ country, measure = "life_expectancy" }: { country?: string | null; measure?: string }) {
  if (!country) {
    return <div>No country selected</div>;
  }

  const { loading, error, data } = useQuery(COUNTRY_DATA_QUERY, {
    variables: {
      country,
      measure
    }
  });

  if (loading) return <div>Loading country data...</div>;
  if (error) return <div>Error loading country data: {error.message}</div>;

  const dataPoints = data?.cube_cube_M6Lh5is0FtqUhZ || [];

  // Calculate summary statistics
  const values = dataPoints.map((point: any) => point.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const avgValue = values.reduce((a: number, b: number) => a + b, 0) / values.length;
  const currentValue = dataPoints[dataPoints.length - 1]?.value;
  const oldestYear = dataPoints[0]?.year;
  const newestYear = dataPoints[dataPoints.length - 1]?.year;

  // Prepare chart data
  const chartData = dataPoints.map((point: any) => ({
    year: point.year,
    value: point.value
  }));

  // Calculate chart dimensions
  const chartHeight = 300;
  const chartWidth = 800;
  const padding = 40;
  const chartAreaWidth = chartWidth - (padding * 2);
  const chartAreaHeight = chartHeight - (padding * 2);

  // Calculate scales
  const yearRange = newestYear - oldestYear;
  const valueRange = maxValue - minValue;

  // Generate SVG path for the line
  const generatePath = () => {
    if (chartData.length === 0) return '';
    
    const points = chartData.map((point: any, index: number) => {
      const x = padding + ((point.year - oldestYear) / yearRange) * chartAreaWidth;
      const y = padding + chartAreaHeight - ((point.value - minValue) / valueRange) * chartAreaHeight;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <div style={{ 
      border: '1px solid #e2e8f0', 
      borderRadius: '8px', 
      padding: '20px',
      backgroundColor: 'white'
    }}>
      <h3 style={{ 
        marginBottom: '20px', 
        fontSize: '20px', 
        fontWeight: 'bold',
        color: '#2d3748'
      }}>
        {country.toUpperCase()} - {measure.replace('_', ' ').toUpperCase()} ({dataPoints.length} data points)
      </h3>

      {/* Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          backgroundColor: '#f0fff4',
          border: '1px solid #9ae6b4',
          borderRadius: '8px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#22543d' }}>
            {currentValue?.toFixed(1)}
          </div>
          <div style={{ fontSize: '14px', color: '#718096' }}>
            Latest Year ({newestYear})
          </div>
        </div>

        <div style={{
          backgroundColor: '#fffaf0',
          border: '1px solid #f6ad55',
          borderRadius: '8px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#744210' }}>
            {maxValue?.toFixed(1)}
          </div>
          <div style={{ fontSize: '14px', color: '#718096' }}>
            Highest Value
          </div>
        </div>

        <div style={{
          backgroundColor: '#fef5e7',
          border: '1px solid #f6ad55',
          borderRadius: '8px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#744210' }}>
            {minValue?.toFixed(1)}
          </div>
          <div style={{ fontSize: '14px', color: '#718096' }}>
            Lowest Value
          </div>
        </div>

        <div style={{
          backgroundColor: '#f0f9ff',
          border: '1px solid #90cdf4',
          borderRadius: '8px',
          padding: '16px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a365d' }}>
            {avgValue?.toFixed(1)}
          </div>
          <div style={{ fontSize: '14px', color: '#718096' }}>
            Average
          </div>
        </div>
      </div>

      {/* Data Range Info */}
      <div style={{
        backgroundColor: '#f7fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        padding: '12px',
        marginBottom: '20px',
        fontSize: '14px',
        color: '#4a5568'
      }}>
        📊 Data spans from {oldestYear} to {newestYear} ({newestYear - oldestYear} years)
      </div>

      {/* Line Chart */}
      <div style={{
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        padding: '20px',
        backgroundColor: '#fafafa',
        overflowX: 'auto'
      }}>
        <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 'bold', color: '#2d3748' }}>
          📈 Trend Over Time
        </h4>
        
        <svg width={chartWidth} height={chartHeight} style={{ display: 'block', margin: '0 auto' }}>
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <line
                x1={padding}
                y1={padding + (i * chartAreaHeight / 4)}
                x2={chartWidth - padding}
                y2={padding + (i * chartAreaHeight / 4)}
                stroke="#e2e8f0"
                strokeWidth="1"
              />
              <text
                x={padding - 10}
                y={padding + (i * chartAreaHeight / 4) + 4}
                fontSize="12"
                fill="#718096"
                textAnchor="end"
              >
                {(maxValue - (i * valueRange / 4)).toFixed(0)}
              </text>
            </g>
          ))}
          
          {/* Year labels */}
          {[0, 1, 2, 3, 4].map((i) => {
            const year = oldestYear + Math.floor((i * yearRange) / 4);
            return (
              <text
                key={i}
                x={padding + (i * chartAreaWidth / 4)}
                y={chartHeight - 10}
                fontSize="12"
                fill="#718096"
                textAnchor="middle"
              >
                {year}
              </text>
            );
          })}
          
          {/* Line chart */}
          <path
            d={generatePath()}
            stroke="#3182ce"
            strokeWidth="3"
            fill="none"
          />
          
          {/* Data points */}
          {chartData.map((point: any, index: number) => {
            const x = padding + ((point.year - oldestYear) / yearRange) * chartAreaWidth;
            const y = padding + chartAreaHeight - ((point.value - minValue) / valueRange) * chartAreaHeight;
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#3182ce"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '12px', 
          fontSize: '12px', 
          color: '#718096' 
        }}>
          Hover over points to see exact values
        </div>
      </div>
    </div>
  );
} 