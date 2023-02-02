import CompMatch from './CompMatch';

function SearchResults({ countries, areas, company_areas, shipments, companies, matchResult, setResult }) {
  //**returns an array with the ids and names of the companies that operate in the selected countries
  const selectedCompIdName = companies
    .filter((item) => countries.some((country) => country.value === item.country))
    .map((item) => {
      return {
        companyId: item.companyId,
        companyName: item.name,
      };
    });

  //**array of the selected areas id
  const selectedAreaId = areas.map((item) => item.value);

  //**total shipments array of objects that contains all the shipments for the selected companies and areas
  const totalShip = shipments.filter(
    (ship) =>
      selectedAreaId.includes(ship.areaId) && selectedCompIdName.some((company) => company.companyId === ship.companyId)
  );

  //**array with an object that has selected companies and inside the areasId is an array of the selected areas they operate
  const copmaniesWithArea = selectedCompIdName.map((company) => {
    const areasIdArr = [];
    //search through the company_areas data to get as a result only areas where companies are active
    company_areas.forEach((area) => {
      if (
        area.companyId === company.companyId &&
        selectedAreaId.includes(area.areaId) &&
        !areasIdArr.includes(area.areaId)
      ) {
        areasIdArr.push(area.areaId);
      }
    });
    //the structure will be an array holding objects structured like below
    return {
      companyId: company.companyId,
      companyName: company.companyName,
      areasId: areasIdArr,
    };
  });
  /*function called in the show results button
    takes as parameters: 
      the array of companies and areas selected
      array of all the shipments that include the selected companies and areas
      function that updates the state matchedComp
    the result will be updated state with the companies that have the most total shipments in the selected areas(max 2 companies)*/
  function handleClick(copmAndArea, totalSh, updateResult) {
    //map through all the companies to transform into a final structure that contains company id, name, array of shipments per area, total shipments
    const groupedStructure = copmAndArea.map((company) => {
      //map each company to access the array of areas and modify it so it shows {areaId, shipments for that area }
      const totalAreaArr = company.areasId.map((aId) => {
        //areaShip will be the total of shipments by the current company done in the current area
        const areaShip = totalSh.reduce((count, { areaId: area, companyId: comp }) => {
          if (area === aId && comp === company.companyId) {
            count++;
          }
          return count;
        }, 0);
        return {
          areaId: aId,
          shipAreaTotal: areaShip,
        };
      });
      //go through the array of areas and total per area to get a total of shipments completed by the company
      const totalShipments = totalAreaArr.reduce((count, { shipAreaTotal: currValue }) => count + currValue, 0);
      //return an object with current company id, name, array of shipments for each area and total shipments completed
      return {
        companyId: company.companyId,
        companyName: company.companyName,
        shipPerArea: totalAreaArr,
        totalSh: totalShipments,
      };
    });
    //sort the final structure in decending order because we need only the top 2 companies by total of shipments
    groupedStructure.sort((a, b) => {
      if (a.totalSh > b.totalSh) {
        return -1;
      }
      if (a.totalSh < b.totalSh) {
        return 1;
      }
      return 0;
    });
    //filter only the companies that have completed shipments in the selected areas
    const maxState = groupedStructure.filter((company) => company.totalSh > 0);
    //if more than 2 companies have completed shipments in the selected areas update the state with only the top 2
    //else update state with the filtered variable because it holds a maximum of 2 objects
    if (maxState.length > 2) {
      updateResult(maxState.slice(0, 2));
    } else {
      updateResult(maxState);
    }
    //log to the console the whole structure(not the state) for testing
    console.log('final structure', groupedStructure);
  }

  //map matchResult state to display the results
  const resultDisplay = matchResult.map((item) => {
    //map the shipments per area array into a list for easier display
    const areaAndShip = item.shipPerArea.map((ship) => (
      <li key={ship.areaId}>
        In area code {ship.areaId} has completed {ship.shipAreaTotal} shipments.
      </li>
    ));
    return (
      <CompMatch key={item.companyId} companyName={item.companyName} shipsPerArea={areaAndShip} total={item.totalSh} />
    );
  });

  return (
    <div className="results-wrap">
      <button className="result-button" onClick={() => handleClick(copmaniesWithArea, totalShip, setResult)}>
        Show results
      </button>
      <h3 className="result-header">Results:</h3>
      {matchResult.length > 0 ? (
        <div className="result-from-state">{resultDisplay}</div>
      ) : (
        <p>The selections are empty or no company matches the search</p>
      )}
    </div>
  );
}

export default SearchResults;
