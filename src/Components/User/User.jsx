import React from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { FaEnvelope, FaUser } from 'react-icons/fa';

const User = (props) => {
  return (
    <Table striped bordered hover style={{ tableLayout: 'fixed' }}>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>City</th>
          <th>Country</th>
          <th>Age</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Link to={`/user/${props.uKey}`} state={{ userDetails: props.userDetails }}>
              <FaUser size={25} />
            </Link>
          </td>
          <td>{props.nameF} {props.nameL}</td>
          <td>{props.city}</td>
          <td>{props.country}</td>
          <td>{props.age}</td>
          <td>
            <a href={`mailto:${props.email}`}>
              <FaEnvelope size={20} />
            </a>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default User;