import React, { useEffect, useState } from 'react';
import User from '../User/User';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import { Link } from 'react-router-dom';


const Users = () => {
  const [originalUsers, setOriginalUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [genderFilterInput, setGenderFilterInput] = useState('all');
  const [countryFilterInput, setCountryFilterInput] = useState('all');
  const [searchInput, setSearchInput] = useState('');

  const getUsers = async () => {
    let url = 'https://randomuser.me/api/?results=200';

    try {
      const response = await fetch(url);
      const data = await response.json();
      setOriginalUsers(data.results);
      setUsers(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
      setError('Error fetching');
    }
  };

  useEffect(() => {
    getUsers();
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

  useEffect(() => {
    const filteredUsers = originalUsers.filter((user) => {
      if (genderFilterInput === 'all' && countryFilterInput === 'all' && searchInput === '') {
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

        return matchesFilters;
      }
    });

    setUsers(filteredUsers);
  }, [originalUsers, genderFilterInput, countryFilterInput, searchInput]);

  return (
    <>
      <Link to="/">Go to HomePage</Link>
      <div className="container">
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
            <div className="form-group">
              <label htmlFor="countryFilter">Filter by Country:  </label>
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
        <div className="row">
          <div className="col-12">
            <div className="row">
              {/*conditional rendering-do always-good practice*/}
              {users !== [] &&
                users.map((user) => {
                  return (
                    <User
                      key={user.phone}
                      nameF={user.name.first}
                      nameL={user.name.last}
                      img={user.picture.large}
                      city={user.location.city}
                      country={user.location.country}
                      age={user.dob.age}
                      email={user.email}
                    />
                  );
                })}
              {loading && <h1>...Loading...</h1>}
              {error && <h1>{error}</h1>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
