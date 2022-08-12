import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { getUserDetails } from '../slices/userSlice';
import { Link } from 'react-router-dom';



const UserProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [province, setProvince] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [taxOffice, setTaxOffice] = useState('');
  const [countInvoice, setCountInvoice] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [activityArea, setActivityArea] = useState('');
  const [guarantee, setGuarantee] = useState('');
  const [capital, setCapital] = useState('');
  const [profitInfo, setProfitInfo] = useState('');
  const [terms, setTerms] = useState('');

  const { userInfo, userDetails } = useSelector(state => state.user);
  const userId = params.id;

  useEffect(() => {
    if (!userInfo) return navigate('/login');
    if (!userDetails) {
      console.log(userId);
      dispatch(getUserDetails({ userId, token: userInfo.token }))
    }
  }, [userId, userInfo, userDetails, dispatch, navigate]);
 


  function submitHandler(e) {
    e.preventDefault();
  }




  return (
    <>
      
      <Container>
      
      <Form style={{ maxWidth: '75%', margin: "4rem auto" }} onSubmit={submitHandler}>
      <Link className='btn btn-dark mb-4' to='/userlist'>Go Back</Link>
          <h2>Kullanici Detaylari</h2>
        <Row>
          <Col>
          <Form.Group className='mt-3' controlId='companyname'>
          <Form.Label>Company Name</Form.Label>
          <Form.Control required type='text' value={companyName} onChange={e=>setCompanyName(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='email'>
          <Form.Label>E-mail</Form.Label>
          <Form.Control required type='email' value={email} onChange={e=>setEmail(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control required type='password' value={password} onChange={e=>setPassword(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='password2'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control required type='password' value={password2} onChange={e=>setPassword2(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='province'>
          <Form.Label>Province</Form.Label>
          <Form.Control required type='text' value={province} onChange={e=>setProvince(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='taxnumber'>
          <Form.Label>Tax Number</Form.Label>
          <Form.Control required type='text' value={taxNumber} onChange={e=>setTaxNumber(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='taxoffice'>
          <Form.Label>Tax Office</Form.Label>
          <Form.Control required type='text' value={taxOffice} onChange={e=>setTaxOffice(e.target.value)} />
        </Form.Group></Col>
          <Col>
          <Form.Group className='mt-3' controlId='countInvoice'>
          <Form.Label>Count of Invoice</Form.Label>
          <Form.Control required type='text' value={countInvoice} onChange={e=>setCountInvoice(e.target.value)} />
      </Form.Group>

      <Form.Group className='mt-3' controlId='contactnumber'>
          <Form.Label>Contact Number</Form.Label>
          <Form.Control required type='tel' value={contactNumber} onChange={e=>setContactNumber(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='activityarea'>
          <Form.Label>Activity Area</Form.Label>
          <Form.Control type='text' value={activityArea} onChange={e=>setActivityArea(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='guarantee'>
          <Form.Label>Guarantee</Form.Label>
          <Form.Control type='text' value={guarantee} onChange={e=>setGuarantee(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='capital'>
          <Form.Label>Capital</Form.Label>
          <Form.Control type='text' value={capital} onChange={e=>setCapital(e.target.value)} />
        </Form.Group>

        <Form.Group className='mt-3' controlId='profitinfo'>
          <Form.Label>Profit Info</Form.Label>
          <Form.Control type='text' value={profitInfo} onChange={e=>setProfitInfo(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='terms'>
          <Form.Label>Terms</Form.Label>
          <Form.Control type='text' value={terms} onChange={e=>setTerms(e.target.value)} />
        </Form.Group></Col>
        </Row>
       
        
        
        <Button type='submit'
          variant="primary"
          style={{ width: '100%' }}
          className='mt-4'>Bilgileri Kaydet</Button>
      </Form>
      </Container>
      </>
  )
}

export default UserProfileScreen