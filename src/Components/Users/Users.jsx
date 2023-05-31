import React, { useEffect, useState } from 'react';
import User from '../User/User';
import InputsFilters from '../InputsFilters/InputsFilters';
import CountryFilter from '../CountryFilter/CountryFilter';
import AgeFilter from '../AgeFilter/AgeFilter';
import { Spinner } from 'react-bootstrap';

const Users = () => {
  const [originalUsers, setOriginalUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [genderFilterInput, setGenderFilterInput] = useState('all');
  const [countryFilterInput, setCountryFilterInput] = useState('all');
  const [searchInput, setSearchInput] = useState('');
  const [ageFilterFrom, setAgeFilterFrom] = useState('');
  const [ageFilterTo, setAgeFilterTo] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=70');
        const data = await response.json();
        const usersData = data.results;
        setOriginalUsers(usersData);
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching users:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const trackInputGenderFilterValue = (event) => {
    setGenderFilterInput(event.target.value);
  };

  const trackInputCountryFilterValue = (event) => {
    setCountryFilterInput(event.target.value);
  };

  const trackInputSearchValue = (event) => {
    setSearchInput(event.target.value);
  };

  const trackInputAgeFilterFrom = (event) => {
    setAgeFilterFrom(event.target.value);
  };

  const trackInputAgeFilterTo = (event) => {
    setAgeFilterTo(event.target.value);
  };

  useEffect(() => {
    const filteredUsers = originalUsers.filter((user) => {
      if (
        genderFilterInput === 'all' &&
        countryFilterInput === 'all' &&
        searchInput === '' &&
        ageFilterFrom === '' &&
        ageFilterTo === ''
      ) {
        return true; // return all users when no filters applied
      } else {
        let matchesFilters = true;

        if (genderFilterInput !== 'all') {
          matchesFilters = matchesFilters && user.gender === genderFilterInput;
        }

        if (countryFilterInput !== 'all') {
          matchesFilters = matchesFilters && user.location.country === countryFilterInput;
        }

        if (searchInput !== '') {
          const searchTerm = searchInput.toLowerCase();
          matchesFilters =
            matchesFilters &&
            (user.name.first.toLowerCase().includes(searchTerm) ||
              user.name.last.toLowerCase().includes(searchTerm));
        }

        if (ageFilterFrom !== '') {
          matchesFilters = matchesFilters && user.dob.age >= parseInt(ageFilterFrom);
        }

        if (ageFilterTo !== '') {
          matchesFilters = matchesFilters && user.dob.age <= parseInt(ageFilterTo);
        }

        return matchesFilters;
      }
    });

    setUsers(filteredUsers);
  }, [originalUsers, genderFilterInput, countryFilterInput, searchInput, ageFilterFrom, ageFilterTo]);

  return (
    <>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
          <InputsFilters
            searchInput={searchInput}
            trackInputSearchValue={trackInputSearchValue}
            genderFilterInput={genderFilterInput}
            trackInputGenderFilterValue={trackInputGenderFilterValue}
          />
          <div>
            <CountryFilter
              countryFilterInput={countryFilterInput}
              trackInputCountryFilterValue={trackInputCountryFilterValue}
              originalUsers={originalUsers}
            />
            <AgeFilter
              ageFilterFrom={ageFilterFrom}
              ageFilterTo={ageFilterTo}
              trackInputAgeFilterFrom={trackInputAgeFilterFrom}
              trackInputAgeFilterTo={trackInputAgeFilterTo}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {loading ? (
              <div className="text-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : error ? (
              <h1>{error}</h1>
            ) : users.length > 0 ? (
              users.map((user) => (
                <User
                  key={user.phone}
                  userDetails={user}
                  uKey={user.phone}
                  nameF={user.name.first}
                  nameL={user.name.last}
                  img={user.picture.large}
                  city={user.location.city}
                  country={user.location.country}
                  age={user.dob.age}
                  email={user.email}
                  user={user}
                />
              ))
            ) : (
              <h1>No developers found.</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
