'use client';

import { useQuery, gql } from '@apollo/client';
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Text, 
  VStack,
  Skeleton
} from '@chakra-ui/react';

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

  if (loading) return <Skeleton height="200px" />;
  if (error) return (
    <Box p={4} bg="red.50" border="1px" borderColor="red.200" borderRadius="md" color="red.800">
      Error loading countries: {error.message}
    </Box>
  );

  // Sort countries by name
  const sortedCountries = data?.item ? [...data.item].sort((a: any, b: any) => a.name.localeCompare(b.name)) : [];

  return (
    <Box border="1px" borderColor="gray.200" borderRadius="lg" p={4} bg="gray.50">
      <Heading size="md" mb={4} color="gray.800">
        Countries ({sortedCountries.length})
      </Heading>
      <Box maxH="300px" overflowY="auto">
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={2}>
          {sortedCountries.map((country: any) => (
            <Box
              key={country.id}
              onClick={() => setSelectedCountry(country.id)}
              p={3}
              border="1px"
              borderColor={selectedCountry === country.id ? "blue.500" : "gray.200"}
              borderRadius="md"
              bg={selectedCountry === country.id ? "blue.50" : "white"}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{
                bg: selectedCountry === country.id ? "blue.100" : "gray.50",
                borderColor: selectedCountry === country.id ? "blue.600" : "gray.300"
              }}
            >
              <VStack align="start" gap={1}>
                <Text fontWeight="medium" color="gray.800">
                  {country.name}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {country.iso2?.[0]?.value || 'N/A'}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
} 