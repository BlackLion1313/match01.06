import React from 'react';

const AgeFilter = ({ ageFilterFrom, ageFilterTo, trackInputAgeFilterFrom, trackInputAgeFilterTo }) => {
  return (
    <div className="row mb-3">
      <div className="col-md-4">
        <label htmlFor="ageFilterFrom">Age From:</label>
        <input
          type="number"
          id="ageFilterFrom"
          className="form-control-sm"
          value={ageFilterFrom}
          onChange={trackInputAgeFilterFrom}
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="ageFilterTo">Age To:</label>
        <input
          type="number"
          id="ageFilterTo"
          className="form-control-sm"
          value={ageFilterTo}
          onChange={trackInputAgeFilterTo}
        />
      </div>
    </div>
  );
};

export default AgeFilter;

