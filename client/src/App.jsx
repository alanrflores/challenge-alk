import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Home from './components/pages/Home';
import Layout from './components/pages/Layout';
import {useDispatch} from 'react-redux';
import { checkUserState } from './store/user/actions';
import PrivateRoute from './components/private/PrivateRoute';
const App = () => {
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(checkUserState())
  },[]);

  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>
       <Route path='/register' element={<Register />}/>
       <Route path="/login" element={<Login />} />
       <Route exact path='/' element={<PrivateRoute />}>
       <Route exact path='/' element={<Home/>}/>
      </Route>
       {/* <Route path="/home" element={<Home />} /> */}
       </Route>
    </Routes>
    </BrowserRouter>
  );
}


export default App;
