import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faPowerOff,  faClockRotateLeft, faLayerGroup, 
    faWarehouse, faMoneyCheckDollar, faUser} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Link, Outlet, NavLink } from 'react-router-dom';
import { logoutUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

export const Drawer = () => {
    const dispatch = useDispatch();
    // const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/')
    }
  return (
    <>
       <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-base-200">
                {/* <!-- Page content here --> */}
                <div className="btm-nav bg-neutral lg:hidden">
                    <label htmlFor="my-drawer-2" className="text-neutral-content">
                        <FontAwesomeIcon icon={faBars} size='xl'/>
                    </label>
                    <button className="text-neutral-content active">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </button>
                    <button className="text-neutral-content">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    </button>
                </div>
                <div className='p-8 min-h-screen bg-base-200'>
                    <Outlet/>
                </div>
                {/* Start Of Navbar */}
                {/* <div className='flex py-4 fixed top-0 left-0 z-50 w-full justify-end px-4 items-center bg-secondary'>
                    {user ? 
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} 
                            className="btn btn-ghost normal-case text-primary flex flex-col">
                                <FontAwesomeIcon icon={faUser} size='xl'/>
                                <span className='text-xs'>
                                    {user.role === "admin" || user.role === "superadmin" ? 'Admin' : 'Akun'}
                                </span>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52">
                            <Link to = "/" className='btn normal-case btn-ghost text-neutral-content'>Lihat Toko</Link>
                            <button 
                            onClick={handleLogout}
                            className='btn normal-case btn-ghost text-neutral-content'>Logout</button>
                        </ul>
                    </div> 
                    : 
                    <Link to = "/auth/login" className='btn normal-case ml-8 px-4'>Login</Link>
                    }
                </div> */}
                {/* End Of Navbar */}
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 bg-primary relative min-h-screen text-base-100">
                {/* <!-- Sidebar content here --> */}
                    <li><Link to="/" className='btn btn-lg btn-ghost normal-case font-bold text-3xl mb-4 text-base-100 '>
                            <span className='text-left w-full'>Nama Toko</span>
                        </Link>
                    </li>
                    <li><Link to ="/" className='btn btn-lg btn-ghost normal-case font-normal text-base-100 '>
                            <span className='text-left w-full'>
                                <FontAwesomeIcon icon={faMoneyCheckDollar}  className="mr-3" />
                                Penjualan Offline</span>
                        </Link>
                    </li>
                    <li><Link to="/" className='btn btn-lg btn-ghost normal-case font-normal text-base-100 '>
                            <span className='text-left w-full'>
                                <FontAwesomeIcon icon={faMoneyCheckDollar}  className="mr-3" />
                                Penjualan Online</span>
                        </Link>
                    </li>
                    <li><Link to="/" className='btn btn-lg btn-ghost normal-case font-normal text-base-100 '>
                            <span className='text-left w-full'>
                                <FontAwesomeIcon icon={faWarehouse}  className="mr-3" />
                                Kelola Produk</span>
                        </Link>
                    </li>
                    <li><NavLink to="/admin/dashboard/productCategories" 
                         className= {({isActive}) => isActive ? 
                            'btn btn-lg btn-secondary normal-case font-normal text-neutral '
                        :
                            'btn btn-lg btn-ghost normal-case font-normal text-base-100 '}
                        >
                            <span className='text-left w-full'>
                                <FontAwesomeIcon icon={faLayerGroup}  className="mr-3" />
                                Kelola Kategori</span>
                        </NavLink>
                    </li>
                    <li><NavLink to="/admin/dashboard/employees" 
                        className= {({isActive}) => isActive ? 
                            'btn btn-lg btn-secondary normal-case font-normal text-neutral '
                        :
                            'btn btn-lg btn-ghost normal-case font-normal text-base-100 '}
                        >
                            <span className='text-left w-full'>
                                <FontAwesomeIcon icon={faUser}  className="mr-3" />
                                Kelola Pegawai</span>
                        </NavLink>
                    </li>
                    <li><Link className='btn btn-lg btn-ghost normal-case font-normal text-base-100 '>
                            <span className='text-left w-full'>
                                <FontAwesomeIcon icon={faClockRotateLeft}  className="mr-3" />
                                Riwayat Penjualan
                            </span>
                        </Link>
                    </li>
                    <li><button onClick={handleLogout} className='btn w-full btn-lg absolute btn-ghost normal-case font-normal text-base-100 '>
                            <span className='text-left w-full'>
                                <FontAwesomeIcon icon={faPowerOff}  className="mr-3" />
                                Keluar
                            </span>
                        </button>
                    </li>
                </ul>
            
            </div>
            </div>
    </>
  )
}
