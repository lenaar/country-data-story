import CountriesList from '../components/CountriesList';
import CountryData from '../components/CountryData';

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Country Data Dashboard</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <CountriesList />
      </div>
      
      <div>
        <CountryData />
      </div>
    </div>
  );
}
