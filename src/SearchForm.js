import React from 'react';
import Select from 'react-select';
//deconstruct props for easier access
function SearchForm({ companies, areas, handleCountries, handleAreas }) {
  //populate the arr with ALL as the first option
  const countriesArr = [{ value: 'ALL', label: 'SELECT ALL' }];
  //loop through the companies array to display the available countries on the drop down
  companies.forEach((item) => {
    //check if the country is already in the array of countries for the drop down
    if (!countriesArr.some((country) => country.value === item.country)) {
      //add the new country to the drop down in the value and label structure
      countriesArr.push({ value: item.country, label: item.country });
    }
  });
  //use the same logic for the areas available here we dont have to check if it already exists
  const areasArr = [{ value: 'ALL', label: 'SELECT ALL' }];
  areas.forEach((item) => {
    areasArr.push({ value: item.areaId, label: item.state });
  });

  //handle change on the country select drop down
  const handleChangeCountry = (selectedOption) => {
    //check if the select all option is selected
    selectedOption.some((option) => option.value === 'ALL')
      ? //if it is then udate state with all the options array without the ALL value
        handleCountries(countriesArr.slice(1))
      : //otherwise update state with the selected options
        handleCountries(selectedOption);
  };

  //handle change on the area select drop down
  const handleChangeArea = (selectedOption) => {
    //check if the ALL option is selected
    selectedOption.some((option) => option.value === 'ALL')
      ? //if it is then update the area state with the options array without the ALL value
        handleAreas(areasArr.slice(1))
      : //otherwise update state with the selected options
        handleAreas(selectedOption);
  };

  return (
    <div className="searchForm-wrap">
      <label className="select-label">
        {' '}
        Select Countries
        <Select
          isMulti
          name="countries"
          options={countriesArr}
          closeMenuOnSelect={false}
          className="basic-multi-select"
          onChange={handleChangeCountry}
        />
      </label>
      <label className="select-label">
        {' '}
        Select Areas
        <Select
          isMulti
          name="areas"
          options={areasArr}
          closeMenuOnSelect={false}
          className="basic-multi-select"
          onChange={handleChangeArea}
        />
      </label>
    </div>
  );
}

export default SearchForm;
