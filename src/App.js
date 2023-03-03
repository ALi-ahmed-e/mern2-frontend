import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Header from './components/Header';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
function App() {
  const { user } = useSelector((state) => state.auth)


  const CheckAuth = ({ children }) => {

    return user ? children : <Navigate to='/login' />
  }
  const CheckNotAuth = ({ children }) => {

    return user ? <Navigate to='/' /> : children
  }


  return (
    <>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/register' element={<CheckNotAuth><Register /></CheckNotAuth>} />
          <Route path='/login' element={<CheckNotAuth><Login /></CheckNotAuth>} />
          <Route path='/' element={<CheckAuth><Dashboard /></CheckAuth>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
