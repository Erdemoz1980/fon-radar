import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Row, Col, Form, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Message from './Message';
import { registerUser } from '../slices/userSlice';

const RegisterUserScreen = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [province, setProvince] = useState('');
  const [taxNumber, setTaxNumber] = useState(0);
  const [taxOffice, setTaxOffice] = useState('');
  const [countInvoice, setCountInvoice] = useState(0);
  const [contactNumber, setContactNumber] = useState(0);
  const [alert, setAlert] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    if (userInfo) {
      return navigate('/userlist');
    }
  })
  

  function submitHandler(e) {
    e.preventDefault();
    if(password !== password2) {
      setAlert('Passwords do not match');
      setTimeout(() => {
        setAlert('')
      }, [3000]);
    } else {
      dispatch(registerUser({ companyName, email, password, province, taxNumber, taxOffice, countInvoice, contactNumber }));
    }
  }


//Enable show password option
//Enable required alert in red
  
  return (
    <Container>
      <Form style={{ maxWidth: '50%', margin: "4rem auto" }} onSubmit={submitHandler}>
        <h2>Register Company</h2>
        {alert && <Message variant='danger'>Passwords do not match</Message>}
       
        <Form.Group className='mt-3' controlId='name'>
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter company name'
            value={companyName}
            onChange={e=>setCompanyName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='mt-3' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='Enter email address'
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password' className='mt-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password2' className='mt-3'>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Confirm password'
            value={password2}
            onChange={e=>setPassword2(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='province' className='mt-3'>
          <Form.Label>Province</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter province'
            value={province}
            onChange={e=>setProvince(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='taxnumber' className='mt-3'>
          <Form.Label>Tax Number</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter tax number'
            value={taxNumber}
            onChange={e=>setTaxNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='taxoffice' className='mt-3'>
          <Form.Label>Tax Office</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter tax office'
            value={taxOffice}
            onChange={e=>setTaxOffice(e.target.value)}
          />
        </Form.Group>
          <Form.Group controlId='countInvoice' className='mt-3'>
          <Form.Label>Count of Invoice</Form.Label>
          <Form.Control
            required
            type='text'
            placeholder='Enter count of invoice'
            value={countInvoice}
            onChange={e=>setCountInvoice(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='contactNumber' className='mt-3'>
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            required
            type='tel'
            placeholder='Enter contact number'
            value={contactNumber}
            onChange={e=>setContactNumber(e.target.value)}
          />
        </Form.Group>
        <Button
          type='submit'
          variant="primary"
          style={{ width: '100%' }}
          className='mt-4'
        >Kayit Ol</Button>
      </Form>
      <Row style={{textAlign:'center'}} className='mt-3'>
        <Col>
        Already registered? {' '} <Link to='/login'>Sign In</Link>
        </Col>
      </Row>
      </Container>
    
  
  )
}

export default RegisterUserScreen;