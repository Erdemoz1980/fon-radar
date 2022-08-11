import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {  Table,Container } from 'react-bootstrap';
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
      <h3 className='mt-4'>Client List</h3>
      <SearchBox />
    
      <Table
        striped bordered hover responsive>
      <thead>
          <tr>
            <th style={{cursor:'pointer'}} onClick={()=>handleSort('companyName')}>Company Name</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('province')}>Province</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('taxNumber')}>Tax Number</th>
            <th style={{cursor:'pointer'}} onClick={()=>handleSort('taxOffice')}>Tax Office</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('countInvoice')}>Count of Invoice</th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('contactNumber')}>Contact Number</th>
        </tr>
      </thead>
      <tbody>
        {
            (!userList || userList.length < 1) ? <><Message variant='danger'>No results found...</Message><Link className='btn btn-dark d-flex' to='/userlist'>Back to Client List</Link></> : userList.map(user => (
            <tr key={user._id}>
              <td>{user.companyName}</td>
              <td>{user.province}</td>
              <td>{user.taxNumber}</td>
              <td>{user.taxOffice}</td>
              <td>{user.countInvoice}</td>
              <td>{user.contactNumber}</td>
            </tr>
          ))
        }
      
      </tbody>
      </Table>
      </Container>
  )
}

export default UserListScreen