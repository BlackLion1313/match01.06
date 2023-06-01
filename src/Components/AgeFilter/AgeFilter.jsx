import React from 'react';

const AgeFilter = ({ ageFilterFrom, ageFilterTo, trackInputAgeFilterFrom, trackInputAgeFilterTo }) => {
  
  return (
    <div className="row mb-3">
      <div className="col-md-4">
        {/* Комментарий: Компонент фильтрации возраста.
        Принимает значения ageFilterFrom и ageFilterTo для задания диапазона возраста.
        Использует функции trackInputAgeFilterFrom и trackInputAgeFilterTo для обновления значений фильтра.
        */}
        <label htmlFor="ageFilterFrom">Age from:</label>
        <input
          type="number"
          id="ageFilterFrom"
          className="form-control-sm"
          value={ageFilterFrom}
          onChange={trackInputAgeFilterFrom}
        />
      </div>
      <div className="col-md-4">
        {/*Компонент фильтрации возраста.
        Принимает значения ageFilterFrom и ageFilterTo для задания диапазона возраста.
        Использует функции trackInputAgeFilterFrom и trackInputAgeFilterTo для обновления значений фильтра.
        */}
        <label htmlFor="ageFilterTo">Age to</label>
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


