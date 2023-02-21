import { useState } from 'react';
import Hero from './Hero';
import COMPANIES from './assets/companies.json';
import AREAS from './assets/areas.json';
import COMPANY_AREAS from './assets/company_area.json';
import ALL_SHIPMENTS from './assets/shipments.json';
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
      <Hero />
      {/**pass companies and areas from the respective json files as props to populate the select drop down
       * pass the set functions as props to allow state change from the search form
       */}
      <SearchForm
        companiesJSON={COMPANIES}
        areasJSON={AREAS}
        handleCountries={setSelectedCountries}
        handleAreas={setSelectedAreas}
      />
      <SearchResults
        selCountries={selectedCountries}
        selAreas={selectedAreas}
        areasJSON = {AREAS}
        companiesJSON={COMPANIES}
        company_areasJSON={COMPANY_AREAS}
        shipmentsJSON={ALL_SHIPMENTS}
        matchResult={matchedComp}
        setResult={setMatchedComp}
      />
    </div>
  );
}

export default App;
