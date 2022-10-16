import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login/Login';
import Register from './components/login/Register';
import Home from './components/pages/Home';
import Layout from './components/pages/Layout';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Layout />}>
       <Route path='/register' element={<Register />}/>
       <Route path="/login" element={<Login />} />
       <Route path="/home" element={<Home />} />
       </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
