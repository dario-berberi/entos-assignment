import React from 'react';
import Select from 'react-select';
//deconstruct props for easier access
function SearchForm({ companiesJSON, areasJSON, handleCountries, handleAreas }) {
  //populate the arr with ALL as the first option
  const countriesArr = [{ value: 'ALL', label: 'SELECT ALL' }];
  //loop through the companies array to display the available countries on the drop down
  companiesJSON.forEach((item) => {
    //check if the country is already in the array of countries for the drop down
    if (!countriesArr.some((country) => country.value === item.country)) {
      //add the new country to the drop down in the value and label structure
      countriesArr.push({ value: item.country, label: item.country });
    }
  });
  //use the same logic for the areas available here we dont have to check if it already exists
  const areasArr = [{ value: 'ALL', label: 'SELECT ALL' }];
  areasJSON.forEach((item) => {
    areasArr.push({ value: item.areaId, label: item.state});
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
      <div className="instructions-wrap" id="intructions">
        <h3 className="instructions-intro">
          Follow the steps below and begin your scouting process
          </h3>
          <ol className="instructions-list">
            <li>Choose which country you would like to operate</li>
            <li>Choose which area you ship to</li>
            <li>Click Show Results to recieve the results</li>
        </ol>
      </div>
      <div className='select-wrap'>
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
      
    </div>
  );
}

export default SearchForm;
