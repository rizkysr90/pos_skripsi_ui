import React, {} from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from './../features/authSlice.js'

export const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logoutUser());
    }
    
  return (
        <div className="navbar bg-primary py-4 px-1 shadow-lg lg:px-10 drop-shadow-lg ">
            <div className="navbar-start">
                <Link to = "/" className="btn btn-ghost flex normal-case text-xl text-base-100">Logo</Link>
            </div>
            <div className="navbar-end ">
                {user ? 
                <div className="dropdown ml-4 dropdown-end">
                    <label tabIndex={0} 
                        className="btn btn-ghost mr-2 normal-case text-base-100 px-4 flex flex-col">
                            <FontAwesomeIcon icon={faUser} size='xl'/>
                            <span className='text-xs'>{user.role === "admin" ? 'Admin' : 'Akun'}</span>
                    </label>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52">
                        {user.role === "admin" || user.role === "superadmin" ? 
                            <Link to = "/admin/dashboard" className='btn normal-case btn-ghost text-neutral-content'>Kelola Toko</Link>
                            :
                            <Link to = "/dashboard" className='btn normal-case btn-ghost text-neutral-content'>Akun Saya</Link>
                        } 
                        <button 
                        onClick={handleLogout}
                        className='btn normal-case btn-ghost text-neutral-content'>Logout</button>
                    </ul>
                </div> 
                : 
                <Link to = "/auth/login" className='btn normal-case ml-8 px-4'>Login</Link>}
            </div>
        </div>
        
  )
}
