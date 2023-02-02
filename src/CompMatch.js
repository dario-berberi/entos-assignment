function CompMatch({ companyName, shipsPerArea, total }) {
  //Display each result by comany name total shipments and a list of shipments for each area
  return (
    <div className="match">
      <h3 className="match-company">{companyName}</h3>
      <p className="match-total">Total shipments: {total}</p>
      <p>Shipments for each of the selected areas:</p>
      <ul className="match-area-list">{shipsPerArea}</ul>
    </div>
  );
}

export default CompMatch;
