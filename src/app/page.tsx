'use client';

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  VStack, 
  HStack, 
  Text, 
  Button,
  SimpleGrid
} from '@chakra-ui/react';
import CountriesList from '../components/CountriesList';
import CountryData from '../components/CountryData';

const MEASURES = [
  { label: 'Life Expectancy', value: 'life_expectancy' },
  { label: 'Population', value: 'population' },
  { label: 'Net Migration Rate', value: 'net_migration_rate' },
];

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>('sweden');
  const [selectedMeasure, setSelectedMeasure] = useState<string>(MEASURES[0].value);

  return (
    <Container maxW="container.xl" py={8}>
      <VStack gap={6} align="stretch">
        <Heading size="lg" color="gray.800">
          Country Data Dashboard
        </Heading>
        
        {selectedCountry && (
          <Box
            bg="blue.50"
            border="1px"
            borderColor="blue.200"
            borderRadius="lg"
            p={4}
          >
            <HStack gap={3}>
              <Box
                w="40px"
                h="40px"
                bg="blue.500"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                fontWeight="bold"
              >
                🌍
              </Box>
              <Box>
                <Text fontWeight="bold" fontSize="lg" color="gray.800">
                  Currently Viewing: {selectedCountry.toUpperCase()}
                </Text>
                <Text fontSize="sm" color="gray.600">
                  {selectedMeasure.replace('_', ' ').toUpperCase()} data
                </Text>
              </Box>
            </HStack>
          </Box>
        )}
        
        <Box>
          <CountriesList 
            selectedCountry={selectedCountry} 
            setSelectedCountry={setSelectedCountry}
          />
        </Box>
        
        <Box>
          <VStack gap={4} align="stretch">
            <Box>
              <Text fontWeight="semibold" mb={2}>Select Measure:</Text>
              <SimpleGrid columns={3} gap={2}>
                {MEASURES.map((measure) => (
                  <Button
                    key={measure.value}
                    variant={selectedMeasure === measure.value ? "solid" : "outline"}
                    colorScheme="blue"
                    onClick={() => setSelectedMeasure(measure.value)}
                    size="sm"
                  >
                    {measure.label}
                  </Button>
                ))}
              </SimpleGrid>
            </Box>
            <CountryData country={selectedCountry} measure={selectedMeasure}/>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}
