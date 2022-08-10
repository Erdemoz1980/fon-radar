import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { loginUser } from '../slices/userSlice';
import Message from './Message';
import Loader from './Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo, loading, error } = useSelector(state => state.user);
  
  
  useEffect(() => {
    if (userInfo) {
      return navigate('/userlist')
    }
  }, [navigate, userInfo]);
  

  function submitHandler(e) {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  }




//Enable show password option
//Enable required alert in red
  return (
    <Container>
      
      <Form style={{ maxWidth: '50%', margin: "4rem auto" }} onSubmit={submitHandler}>
      
        <h2>Kullanici Girisi</h2>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        <Form.Group className='mt-3' controlId='email'>
          <Form.Label>E-Posta Adresi</Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='E-Posta'
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password' className='mt-3'>
          <Form.Label>Password</Form.Label>
            <Form.Control
            required
            type='password'
            placeholder='Password'
            value={password}
            onChange={e=>setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          type='submit'
          variant="primary"
          style={{ width: '100%' }}
          className='mt-4'
        >Giris Yap</Button>
        
      </Form>
      <Row style={{textAlign:'center'}} className='mt-3'>
        <Col>
        Not registered? {' '} <Link to='/register'>Sign up</Link>
        </Col>
      </Row>
      </Container>
    )
    
  
  
}

export default LoginScreen