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

export default function CountryData() {
  const { loading, error, data } = useQuery(COUNTRY_DATA_QUERY, {
    variables: {
      country: "poland",
      measure: "life_expectancy"
    }
  });

  if (loading) return <div>Loading country data...</div>;
  if (error) return <div>Error loading country data: {error.message}</div>;

  const dataPoints = data?.cube_cube_M6Lh5is0FtqUhZ || [];

  return (
    <div>
      <h3>Poland - Life Expectancy ({dataPoints.length} data points)</h3>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {dataPoints.slice(0, 10).map((point: any, index: number) => (
          <div key={index} style={{ margin: '5px 0' }}>
            <strong>{point.year}:</strong> {point.value} years
          </div>
        ))}
        {dataPoints.length > 10 && (
          <div style={{ color: 'gray', fontStyle: 'italic' }}>
            ... and {dataPoints.length - 10} more data points
          </div>
        )}
      </div>
    </div>
  );
} 