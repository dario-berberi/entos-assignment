# A website that takes selections from the user and returns the best matches

The user has to choose one or more options from the drop down lists which contains different countries and areas.
Companies will be generated from the selected countries to get a list of companies that oparate in those countries.
Areas will determine which shipments will be filtered for the selection process.
The algorithm will filter the areas later based on the company_area file to consider only areas where companies are still active.  
After selecting the user has to click `show results` and the section under will display the top 2 matches based on the selections

The match-making alorithm can be found at `SearchResults.js`

## Used libraies

 ### `react-select`
 Start by installing react-select

    yarn add react-select
    
    or

    npm i --save react-select

Import the default export and render in your component:

    import React from 'react'
    import Select from 'react-select'

    const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
    ]

    const MyComponent = () => (
        <Select options={options} />
    )

 ### check out [react-select documentation](https://react-select.com/home)

## Possible upgrades and optimization
    Expand the top companies to gain more detailed information 