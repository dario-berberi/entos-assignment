import { useState } from 'react';
import Header from './Header';
import companies from './assets/companies.json';
import areas from './assets/areas.json';
import companyAreas from './assets/company_area.json';
import allShipments from './assets/shipments.json';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

function App() {
  //state to store the seleceted countries from the select drop down
  const [selectedCountries, setSelectedCountries] = useState([]);
  //state to store the selected areas from the select drop down
  const [selectedAreas, setSelectedAreas] = useState([]);
  //state to store the resut of matched companies
  const [matchedComp, setMatchedComp] = useState([]);
  return (
    <div className="App">
      <Header />
      {/**pass companies and areas from the respective json files as props to populate the select drop down
       * pass the set functions as props to allow state change from the search form
       */}
      <SearchForm
        companies={companies}
        areas={areas}
        handleCountries={setSelectedCountries}
        handleAreas={setSelectedAreas}
      />
      <SearchResults
        countries={selectedCountries}
        areas={selectedAreas}
        companies={companies}
        company_areas={companyAreas}
        shipments={allShipments}
        matchResult={matchedComp}
        setResult={setMatchedComp}
      />
    </div>
  );
}

export default App;
