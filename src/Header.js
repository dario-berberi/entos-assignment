function Header() {
  return (
    <div className="header-wrap">
      <h1 className="header-title">Find the company best suited for your demands</h1>
      <h3 className="header-intro">
        entOS team developed an algorithm that presents you with the top 2 candidates based on your criteria.
      </h3>
      <div className="instructions-wrap">
        <span className="instructions-intro">In order to begin please fill out the short form below:</span>
        <ol className="instructions-list">
          <li>Choose which country you would like to operate</li>
          <li>Choose which area you ship to</li>
          <li>Click Show Results to recieve the results</li>
        </ol>
      </div>
    </div>
  );
}

export default Header;
