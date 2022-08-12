import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { getUserDetails, updateUser, updateProfileReset,resetSuccess } from '../slices/userSlice';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Message from './Message';

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
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { userInfo, userDetails, success, updateProfileSuccess, loading, error } = useSelector(state => state.user);
  const userId = params.id;


  useEffect(() => {
    if (!userInfo) return navigate('/login');
    if (!userDetails || userDetails._id !== userId || updateProfileSuccess) {
      dispatch(getUserDetails({ userId, token: userInfo.token }))
      dispatch(updateProfileReset());
      if (success) {
        setSuccessMessage('Kullanıcı profili güncellendi')
        setTimeout(() => {
          setSuccessMessage('');
          dispatch(resetSuccess())
        }, 3000)
      
      }
    } else {
      setCompanyName(userDetails.companyName)
      setEmail(userDetails.email)
      setProvince(userDetails.province || '')
      setTaxNumber(userDetails.taxNumber|| '')
      setTaxOffice(userDetails.taxOffice || '')
      setCountInvoice(userDetails.countInvoice || '')
      setContactNumber(userDetails.contactNumber || '')
      setActivityArea(userDetails.activityArea || '')
      setGuarantee(userDetails.guarantee || '')
      setCapital(userDetails.capital || '')
      setProfitInfo(userDetails.profitInfo || '')
      setTerms(userDetails.terms)
    }
  }, [userId, userInfo, userDetails, dispatch, navigate, updateProfileSuccess]);
 

  function submitHandler(e) {
    e.preventDefault();
    if (password !== password2) {
      setMessage('Sifreler uyuşmuyor')
      setTimeout(() => {
        setMessage('')
      },3000)
    } else {
      dispatch(updateUser({
        user: { _id: userId, companyName, email, password, province, taxNumber, taxOffice, countInvoice, contactNumber, activityArea, guarantee, capital, profitInfo },
        token: userInfo.token
      }));
    }
  }

  return (    
      <Container>
      <Form style={{ maxWidth: '75%', margin: "4rem auto" }} onSubmit={submitHandler}>
      <Link className='btn btn-dark mb-4' to='/userlist'>Geri Gidin</Link>
          <h2>Kullanici Detaylari</h2>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {message && <Message variant='danger'>{message}</Message>}
        {successMessage && <Message variant='success'>{successMessage}</Message> }
        <Row>
          <Col>
          <Form.Group className='mt-3' controlId='companyname'>
          <Form.Label>Ticaret Unvani</Form.Label>
          <Form.Control required type='text' value={companyName} onChange={e=>setCompanyName(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='email'>
          <Form.Label>E-mail</Form.Label>
          <Form.Control required type='email' value={email} onChange={e=>setEmail(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='password'>
          <Form.Label>Sifre</Form.Label>
          <Form.Control type='password' value={password} onChange={e=>setPassword(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='password2'>
          <Form.Label>Sifre Onayi</Form.Label>
          <Form.Control type='password' value={password2} onChange={e=>setPassword2(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='province'>
          <Form.Label>Il</Form.Label>
          <Form.Control type='text' value={province} onChange={e=>setProvince(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='taxnumber'>
          <Form.Label>Vergi Numarasi</Form.Label>
          <Form.Control type='text' value={taxNumber} onChange={e=>setTaxNumber(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='taxoffice'>
          <Form.Label>Vergi Ofisi</Form.Label>
          <Form.Control type='text' value={taxOffice} onChange={e=>setTaxOffice(e.target.value)} />
        </Form.Group></Col>
          <Col>
          <Form.Group className='mt-3' controlId='countInvoice'>
          <Form.Label>Fatura Numarasi</Form.Label>
          <Form.Control type='text' value={countInvoice} onChange={e=>setCountInvoice(e.target.value)} />
      </Form.Group>

      <Form.Group className='mt-3' controlId='contactnumber'>
          <Form.Label>Telefon Numarasi</Form.Label>
          <Form.Control type='tel' value={contactNumber} onChange={e=>setContactNumber(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='activityarea'>
          <Form.Label>Faaliyet Alani</Form.Label>
          <Form.Control type='text' value={activityArea} onChange={e=>setActivityArea(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='guarantee'>
          <Form.Label>Teminat</Form.Label>
          <Form.Control type='text' value={guarantee} onChange={e=>setGuarantee(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='capital'>
          <Form.Label>Sermaye</Form.Label>
          <Form.Control type='text' value={capital} onChange={e=>setCapital(e.target.value)} />
        </Form.Group>

        <Form.Group className='mt-3' controlId='profitinfo'>
          <Form.Label>Kar Bilgileri</Form.Label>
          <Form.Control type='text' value={profitInfo} onChange={e=>setProfitInfo(e.target.value)} />
        </Form.Group>
        
        <Form.Group className='mt-3' controlId='terms'>
          <Form.Label>Calisma Kosullari</Form.Label>
          <Form.Control type='text' value={terms} onChange={e=>setTerms(e.target.value)} />
        </Form.Group></Col>
        </Row>  
        <Button type='submit'
          variant="primary"
          style={{ width: '100%' }}
          className='mt-4'>Bilgileri Kaydet</Button>
      </Form>
      </Container>
  )
}

export default UserProfileScreen