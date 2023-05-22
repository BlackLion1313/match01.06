import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const { userId } = useParams();

  // Fetch user details based on the user ID and display them

  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {userId}</p>
      {/* Display other user details */}
    </div>
  );
};

export default UserDetails;
