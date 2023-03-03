import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { NavLink, useNavigate,Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../store/auth/authSlice'

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  return (
    <header className='header px-5'>
      <div className='logo'>
        <Link to='/'>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to='/login'>
                <FaSignInAlt /> Login
              </NavLink>
            </li>
            <li>
              <NavLink to='/register'>
                <FaUser /> Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header