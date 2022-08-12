import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');


  function submitHandler(e) {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
      setKeyword('');
    } else {
      navigate('/userlist')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex mb-3'>
      <Form.Control
          placeholder='Isim veya vergi numarasiyla arayin...'
          type='text'
          value={keyword}
          onChange={e=>setKeyword(e.target.value)}
          style={{outline:'none'}}
      >

      </Form.Control>

      <Button type='submit' className='btn-light m-1'>
      <i className="fa-solid fa-magnifying-glass"></i>
      </Button>
    </Form>
  )
}

export default SearchBox