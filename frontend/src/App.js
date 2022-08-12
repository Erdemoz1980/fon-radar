import React from 'react';
import { Container } from 'react-bootstrap';
import './bootstrap.min.css';
import LoginScreen from './components/LoginScreen';
import RegisterUserScreen from './components/RegisterUserScreen';
import UserListScreen from './components/UserListScreen';
import UserProfileScreen from './components/UserProfileScreen';
import HomeScreen from './components/HomeScreen';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';


const App = () => {

  return (
    <Provider store={store}>
          <BrowserRouter>
          <Header />
          <Container>
          <Routes>
              <Route path='/' element={<HomeScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterUserScreen />} />
              <Route path='/userlist' element={<UserListScreen />} />
              <Route path='/search/:keyword' element={<UserListScreen />} />
              <Route path='/user/profile/:id' element={<UserProfileScreen />} />
            </Routes> 
            </Container>
            </BrowserRouter>
      </Provider>
  )
}

export default App