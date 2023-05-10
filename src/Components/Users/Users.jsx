import React, { useEffect, useState } from 'react';
import User from '../User/User';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const getUsers = async () => {
    let url = "https://randomuser.me/api/?results=20";

    try {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data.results);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
      setError('Error fetching');
    }
  };
  //   fetch(url).then((response) => {
  //     return response.json()
  //   }).then((data) => {
  //     console.log("data", data)
  //     setUsers(data.results)
  //   }).catch((error) => {
  //     console.log("error", error)
  //   })
  // } 


  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-12'>
          <div className='row'>
            {/*conditional rendering-do always-good practice*/}
            {users && users.map((user) => {
              return <User key={user.phone} nameF={user.name.first} nameL={user.name.last} img={user.picture.large} />
            })}
            {loading && <h1>...Loading...</h1>}
            {error && <h1>{error}</h1>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Users;


