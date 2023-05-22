import React from 'react';

const CountryFilter = ({ countryFilterInput, trackInputCountryFilterValue, originalUsers }) => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor="countryFilter">Filter by Country: </label>
          <select
            className="form-control-sm mx-3"
            id="countryFilter"
            value={countryFilterInput}
            onChange={trackInputCountryFilterValue}
          >
            <option value="all">All</option>
            {originalUsers.map((user) => (
              <option key={user.phone} value={user.location.country}>
                {user.location.country}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CountryFilter;
