import axios from 'axios';
import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import override from '../styles/spinner';

export default function EmployeesNew() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const form = e.target;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/auth/register/users`, formJSON)
            .then((res) => res.data.metadata);
            console.log(res);
            setIsLoading(false);
            toast.success(`${res?.msg}`);
            setTimeout(() => {
                navigate('/admin/dashboard/employees')
                
            }, 2000);
        } catch (error) {
            let errFromServer = error?.response?.data?.metadata;
            let errMsg = error.message;
            if (error.response?.status !== 500) {
                if (errFromServer?.msg) {
                  errMsg = errFromServer?.msg;
                } 
            }
            toast.error(`Error ${error?.response?.status} - ${errMsg}`);
            setIsLoading(false);
        }
    }
  return (
    <>
       {
          isLoading && 
          <div className='bg-base-100 absolute z-50 w-full left-0 top-0 min-h-screen'>
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
        <ToastContainer/>
        <div className='mb-20 '>
            <div className='text-2xl font-bold text-center text-base-content'>Tambah Pegawai</div>
            <form onSubmit={handleFormSubmit} className="w-full flex flex-col items-center">
                <div className="form-control w-full max-w-xs mt-4">
                    <label className="label" htmlFor="name">
                        <span className="label-text">Nama</span>
                    </label>
                    <input type="text" placeholder="Nama Karyawan" id="name" name='name' 
                    className="input input-bordered w-full max-w-xs " />
                </div>
                <div className="form-control w-full max-w-xs mt-4">
                    <label className="label" htmlFor="email">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Email Karyawan" id="email" name='email' className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs mt-4">
                    <label className="label" htmlFor="password">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" placeholder="Password akun yang akan dibuat" id="password" name='password' className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs mt-4">
                    <label className="label" htmlFor="confirm_password">
                        <span className="label-text">Konfirmasi Password</span>
                    </label>
                    <input type="password" placeholder="Ulangi Password" id="confirm_password" name='confirm_password' className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs mt-4">
                    <label className="label" htmlFor='phone_number'>
                        <span className="label-text">Nomor HP : ( Format +62 )</span>
                    </label>
                    <input type="text" name="phone_number" id="phone_number" placeholder="6281283007959" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control w-full max-w-xs mt-4">
                    <label className="label">
                        <span className="label-text">Hak Akses User</span>
                    </label>
                    <div className='flex ml-1 items-center'>
                        <input type="radio" 
                            name="role" 
                            className="radio radio-xs radio-primary" 
                            value="admin"
                            id='admin'
                            />
                        <label className='ml-2 text-xs' htmlFor='admin'>Admin</label>
                    </div>
                    <div className='flex items-center ml-1 mt-2 mb-4'>
                        <input type="radio" 
                            name="role" 
                            className="radio radio-xs radio-primary" 
                            value="kasir"
                            id='kasir'
                            />
                        <label htmlFor='kasir' className='ml-2 text-xs'>Kasir</label>
                    </div>
                    <button 
                    type='submit'
                    className='btn btn-primary text-primary-content mt-4 normal-case'> Daftar </button>
                </div>
            </form>
        </div>
    </>
  )
}
