import axios from 'axios';

const loginUser = async (email, password) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

  const { data } = await axios.post('/api/users/login', {email,password}, config);
  return data;
    
};

const registerUser = async ({ companyName, email, password, province, taxNumber, taxOffice, countInvoice, contactNumber }) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const { data } = await axios.post('/api/users/register', { companyName, email, password, province, taxNumber, taxOffice, countInvoice, contactNumber }, config);
  return data;
};

const getUserList = async (token, keyword = '') => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(`/api/users?keyword=${keyword}`, config);
  return data;
};

const sortByField = async ({ columnName, sortDirection, token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.get(`/api/users/sort/${columnName},${sortDirection}`, config);
  return data;
};

const getUserDetails = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const { data } = await axios.get(`/api/users/profile/${userId}`, config);
  return data;
};


const updateUser = async (user, token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };

  const { data } = await axios.put(`/api/users/update/${user._id}`, user, config);
  return data
};



const userService = {
  loginUser, registerUser, getUserList, getUserDetails, sortByField, updateUser
};

export default userService;