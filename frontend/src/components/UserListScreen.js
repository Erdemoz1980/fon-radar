import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {  Table,Container } from 'react-bootstrap';
import { getUserList } from '../slices/userSlice';
import SearchBox from './SearchBox';
import Message from './Message';


const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const { keyword } = useParams();
  console.log(keyword)

  const { userInfo, userList, loading, error } = useSelector(state => state.user);
 
  useEffect(() => {
    if (!userInfo) {
      return navigate('/login')
    };
    dispatch(getUserList({ token:userInfo.token, keyword }));
  }, [userInfo, navigate, dispatch,keyword]);

  
  return (
    <Container>
      <h3 className='mt-4'>Client List</h3>
      <SearchBox />
    
    <Table striped bordered hover>
      <thead>
        <tr>
        <th>Company Name</th>
        <th>Province</th>
        <th>Tax Number</th>
        <th>Tax Office</th>
        <th>Count of Invoice</th>
        <th>Contact Number</th>
        </tr>
      </thead>
      <tbody>
        {
            (!userList || userList.length < 1) ? <><Message variant='danger'>No results found...</Message><Link className='btn btn-dark d-flex' style={{textAlign:'center'}}  to='/userlist'>Back to Client List</Link></> : userList.map(user => (
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