'use client';

import { useQuery, gql } from '@apollo/client';

const COUNTRIES_QUERY = gql`
  query Countries {
    item(where: { class_id: { _eq: "Country" } }) {
      id
      name: name(path: "en")
      iso2: statements(where: { property_id: { _eq: "iso2" } }) {
        value: postgres_varchar
      }
    }
  }
`;

export default function CountriesList({ selectedCountry, setSelectedCountry }: { selectedCountry: string | null, setSelectedCountry: (country: string) => void }) {
  const { loading, error, data } = useQuery(COUNTRIES_QUERY);

  if (loading) return <div>Loading countries...</div>;
  if (error) return <div>Error loading countries: {error.message}</div>;

  // Sort countries by name
  const sortedCountries = data?.item ? [...data.item].sort((a: any, b: any) => a.name.localeCompare(b.name)) : [];

  return (
    <div>
      <h2>Countries ({data?.item?.length || 0})</h2>
      <ul>
        {sortedCountries?.map((country: any) => (
          <li key={country.id}>
            {country.name} ({country.iso2?.[0]?.value || 'N/A'})
            {selectedCountry === country.id && <span> (Selected)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
} 