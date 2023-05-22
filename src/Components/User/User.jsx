import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import styles from './User.module.scss';
import { Link } from 'react-router-dom';

const User = (props) => {
  return (
    
    <div className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2'>
 <Link to={`/user/${props.uKey}`} >
      <Card className={`my-4 mx-1 ${styles['card-custom']}`}>
        <Card.Img variant="top" src={props.img} />
        <Card.Body>
          <Card.Title> {props.nameF} {props.nameL} </Card.Title>
          <Card.Text>

          </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item> {`City: ${props.city}`}</ListGroup.Item>
          <ListGroup.Item>{`Country: ${props.country}`}</ListGroup.Item>
          <ListGroup.Item>{`Age: ${props.age}`}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
          {`E-mail: ${props.email}`}
        </Card.Body>
      </Card>
      </Link>
    </div>
  );
};

export default User;
