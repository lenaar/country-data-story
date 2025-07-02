'use client';

import { useState } from 'react';
import CountriesList from '../components/CountriesList';
import CountryData from '../components/CountryData';

const MEASURES = [
  { label: 'Life Expectancy', value: 'life_expectancy' },
  { label: 'GDP per Capita', value: 'gdp_per_capita' },
  { label: 'Population', value: 'population' },
];

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState<string | null>('sweden');
  const [selectedMeasure, setSelectedMeasure] = useState<string>(MEASURES[0].value);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Country Data Dashboard</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <CountriesList selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry}/>
      </div>
      
      <div>
        <CountryData country={selectedCountry} measure={selectedMeasure}/>
      </div>
    </div>
  );
}
