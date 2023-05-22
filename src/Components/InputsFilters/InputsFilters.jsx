import React from 'react';

const InputsFilters = ({
  searchInput,
  trackInputSearchValue,
  genderFilterInput,
  trackInputGenderFilterValue
}) => {
  return (
    <div className="row mb-3">
      <div className="col-md-4">
        <input
          type="text"
          id="searchInput"
          className="form-control-sm"
          placeholder="Search users..."
          value={searchInput}
          onChange={trackInputSearchValue}
        />
      </div>
      <div className="container">
        <div className="col-md-6">
          <div className="form-group">
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  value="all"
                  checked={genderFilterInput === 'all'}
                  onChange={trackInputGenderFilterValue}
                />
                All
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  value="female"
                  checked={genderFilterInput === 'female'}
                  onChange={trackInputGenderFilterValue}
                />
                Female
              </label>
            </div>
            <div className="form-check form-check-inline">
              <label className="form-check-label">
                <input
                  className="form-check-input"
                  type="radio"
                  value="male"
                  checked={genderFilterInput === 'male'}
                  onChange={trackInputGenderFilterValue}
                />
                Male
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputsFilters;
