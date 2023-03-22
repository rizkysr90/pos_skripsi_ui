import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBars, faPowerOff,  faClockRotateLeft, faLayerGroup, 
        faWarehouse, faMoneyCheckDollar, faUser, faCashRegister} 
        from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import override from '../styles/spinner';
import useSWR from 'swr';
import { ClipLoader } from 'react-spinners';
import { Link, Outlet, NavLink } from 'react-router-dom';
import { logoutUser, reset, firstLogin } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

export const Drawer = () => {
    const dispatch = useDispatch();
    const { isLoading, user, isSuccess } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const checkLoginFetcher = async (url) => await axios.get(url);
    const {error : IsUnauthorized} = useSWR(`${process.env.REACT_APP_API_HOST}/getAdmin`, checkLoginFetcher);
    const handleLogout = () => {
        dispatch(logoutUser());
    }
    useEffect(() => {
        if (IsUnauthorized && !isSuccess) {
            dispatch(reset());
            navigate('/');
        } else if (!IsUnauthorized && isSuccess) {
            dispatch(firstLogin());
        }
        else if (!user) {
            dispatch(reset());
            navigate('/');
        }
    }, [IsUnauthorized, dispatch, navigate, user, isSuccess])
  return (
    <>
        {
            isLoading &&
            <div className='bg-base-100 absolute z-50 w-full min-h-screen'>
                <ClipLoader
                color={"#1eb854"}
                loading={isLoading}
                size={35}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
                />
            </div>
        }
        { isLoading && <div>Okeee</div>}
       <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-base-200">
                {/* <!-- Page content here --> */}
                <div className=' p-4 md:p-8  bg-base-200 relative pb-20'>
                    <div className="btm-nav bg-neutral lg:hidden z-10">
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
                    <Outlet/>
                </div>
            </div> 
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label> 
                <ul className="menu p-4 w-80 bg-base-100 relative min-h-screen text-base-content">
                {/* <!-- Sidebar content here --> */}
                    <li><Link to="/" className='font-bold text-3xl mb-4 text-primary'>
                            <span className='text-left w-full'>Nama Toko</span>
                        </Link>
                    </li>
                    <li><NavLink to ="/admin/dashboard/cashier" 
                            className= {({isActive}) => isActive ? 
                            'btn btn-primary normal-case font-bold text-primary-content '
                            :
                            'btn btn-ghost normal-case '}
                            >
                            <span className='text-left w-full flex items-center'>
                                <FontAwesomeIcon icon={faCashRegister}  className="mr-3" />
                                Penjualan Offline
                            </span>
                        </NavLink>
                    </li>
                    <li><NavLink to ="/admin/dashboard/onlineSales" 
                                className= {({isActive}) => isActive ? 
                                'btn btn-primary normal-case font-bold text-primary-content '
                                :
                                'btn btn-ghost normal-case '}
                            >
                            <span className='text-left w-full flex items-center'>
                                <FontAwesomeIcon icon={faMoneyCheckDollar}  className="mr-3" />
                                Penjualan Online</span>
                        </NavLink>
                    </li>
                    <li><NavLink to="/admin/dashboard/products" 
                                className= {({isActive}) => isActive ? 
                                'btn btn-primary normal-case font-bold text-primary-content '
                                :
                                'btn btn-ghost normal-case '}
                            >
                            <span className='text-left w-full flex items-center'>
                                <FontAwesomeIcon icon={faWarehouse}  className="mr-3" />
                                Kelola Produk</span>
                        </NavLink>
                    </li>
                    <li><NavLink to="/admin/dashboard/productCategories" 
                            className= {({isActive}) => isActive ? 
                            'btn btn-primary normal-case font-bold text-primary-content '
                            :
                            'btn btn-ghost normal-case '}
                        >
                            <span className='text-left w-full flex items-center'>
                                <FontAwesomeIcon icon={faLayerGroup}  className="mr-3" />
                                Kelola Kategori</span>
                        </NavLink>
                    </li>
                    {
                        user?.role === 'admin' ? 
                        <li><NavLink to="/admin/dashboard/employees" 
                                className= {({isActive}) => isActive ? 
                                'btn btn-primary normal-case font-bold text-primary-content '
                                :
                                'btn btn-ghost normal-case '}
                            >
                                <span className='text-left w-full flex items-center'>
                                    <FontAwesomeIcon icon={faUser}  className="mr-3" />
                                    Kelola Pegawai</span>
                            </NavLink>
                        </li>
                        : null
                    }
                    <li><NavLink to={'transactions'}  
                                className= {({isActive}) => isActive ? 
                                'btn btn-primary normal-case font-bold text-primary-content '
                                :
                                'btn btn-ghost normal-case '}
                            >
                            <span className='text-left w-full flex items-center'>
                                <FontAwesomeIcon icon={faClockRotateLeft}  className="mr-3" />
                                Riwayat Penjualan
                            </span>
                        </NavLink>
                    </li>
                    <li className='mt-auto'>
                        <button onClick={handleLogout} className='btn btn-ghost normal-case '>
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
