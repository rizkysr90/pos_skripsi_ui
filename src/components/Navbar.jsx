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
        <div className="navbar bg-primary py-4 px-1 shadow-lg lg:px-10 ">
            <div className="navbar-start">
                <div className="dropdown block lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost btn-circle text-primary-content">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-72">
                        <li><Link to = "/">Homepage</Link></li>
                        <li><Link to = "/">Portfolio</Link></li>
                        <li><Link to = "/">About</Link></li>
                    </ul>
                </div>
                <Link to = "/" className="btn btn-ghost flex normal-case text-xl text-primary-content">Rizki Plastik</Link>
            </div>
            <div className="navbar-center">
                <div className="dropdown hidden lg:block">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to = "/">Homepage</Link></li>
                        <li><Link to = "/">Portfolio</Link></li>
                        <li><Link to = "/">About</Link></li>
                    </ul>
                </div>
            </div>
            
            <div className="navbar-end ">
                <div className="indicator" >
                    <span className="indicator-item badge-sm badge badge-warning text-warning-content">99</span> 
                    <Link to = "/" className=' text-primary-content'><FontAwesomeIcon icon={faCartShopping} size="xl" /></Link>
                </div>
                {user ? 
                <div className="dropdown ml-4 dropdown-end">
                    <label tabIndex={0} 
                        className="btn btn-ghost mr-2 normal-case text-primary-content px-4 flex flex-col">
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
