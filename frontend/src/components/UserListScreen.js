import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {  Table, Container } from 'react-bootstrap';
import { getUserList, sortByField} from '../slices/userSlice';
import SearchBox from './SearchBox';
import Message from './Message';


const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [columnToSort, setColumnToSort] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const { keyword } = useParams();

  const { userInfo, userList, loading, error } = useSelector(state => state.user);
 
  useEffect(() => {
    if (!userInfo) {
      return navigate('/login')
    };
    dispatch(getUserList({ token: userInfo.token, keyword }));
  }, [userInfo, navigate, dispatch, keyword]);


  const invertDirection = {
    asc: "desc",
    desc: "asc"
};

 const  handleSort =(columnName)=> {
   setColumnToSort(columnName);
   setSortDirection(columnToSort === columnName ? invertDirection[sortDirection] : 'asc');
   dispatch(sortByField({columnName, sortDirection, token:userInfo.token}));
}

  return (
  
    <Container>
      <h3 className='mt-4'>Musteri Listesi</h3>
      <SearchBox />
      <Link to='/userlist' className='btn btn-dark mb-3'>Musteri Listesi</Link>
      <Table
        striped bordered hover responsive>
      <thead>
          <tr>
            <th style={{cursor:'pointer'}} onClick={()=>handleSort('companyName')}>Ticaret Unvani</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('province')}>Il</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('taxNumber')}>Vergi Numarasi</th>
            <th style={{cursor:'pointer'}} onClick={()=>handleSort('taxOffice')}>Vergi Dairesi</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('countInvoice')}>Fatura Numarasi</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('contactNumber')}>Telefon Numarasi</th>
        </tr>
      </thead>
      <tbody>
        {
            (!userList || userList.length < 1) ? <Message variant='danger'>Bu isimde veya numarada kayit bulunamadi</Message> : userList.map(user => (
              
              <LinkContainer key={user._id} to={`/user/profile/${user._id}`} style={{cursor:'pointer'}}>
              <tr >
                
                <td>{user.companyName}</td>
                <td>{user.province}</td>
                <td>{user.taxNumber}</td>
                <td>{user.taxOffice}</td>
                <td>{user.countInvoice}</td>
                <td>{user.contactNumber}</td>
           
                </tr>
                </LinkContainer>
               
          ))
        }
      
      </tbody>
      </Table>
      </Container>
  )
}

export default UserListScreen