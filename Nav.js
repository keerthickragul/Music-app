import './NavCss.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import {useSelector} from "react-redux";
const Nav = () => {
    // const count = useSelector(state => state.cart.items)
    return (
        <>
            <nav className="navbar">
                <h2 className='logo'>LOGO</h2>
                {/* <div className='searchbar'>
                    <input type='text' placeholder='search'/>
                </div> */}
                <div className='topics'>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
                <Link to='/music'>Tracks</Link>
                <Link to="/control">Contact</Link>

                </div>
            </nav>

            
        </>
    );
};

export default Nav;
