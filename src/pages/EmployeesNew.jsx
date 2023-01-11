import axios from 'axios';
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

export default function EmployeesNew() {
    const navigate = useNavigate();
    const override = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        left:"0",
        top:"0",
        backgroundColor:"rgba(0,0,0,.3)",
        width: "100%",
        zIndex: "99",
        minHeight: "100%",
        margin: "0 auto",
    };
    const [isLoading, setisLoading] = useState(false);
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true);
        const form = e.target;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());
        console.log(formJSON);
        try {
            const res = await axios.post('http://localhost:8080/auth/register', formJSON);
            setisLoading(false);
            toast.success(`${res.response?.data.metadata.msg}`,{
                position: toast.POSITION.TOP_RIGHT
            });
            navigate('/admin/dashboard/employees')
        } catch (error) {
            let errMsg = 'Internal Server Error'
            if (error.response?.status !== 500) {
                errMsg = error.response?.data?.metadata?.msg
            }
            
            toast.error(`Error ${error?.response?.status} - ${errMsg}`, {
                position: toast.POSITION.TOP_RIGHT
            });
            setisLoading(false);
            console.log(error);
        }
    }
  return (
    <>
        <BeatLoader
            color={'#6419E6'}
            loading={isLoading}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
        /> 
        <ToastContainer/>
        <div className='mb-20'>
            <div className='text-3xl text-primary'>Tambah Pegawai</div>
            <form onSubmit={handleFormSubmit}>
                <div className="form-control w-full max-w-xs mt-4">
                    <label className="label" htmlFor="name">
                        <span className="label-text">Nama</span>
                    </label>
                    <input type="text" placeholder="Nama Karyawan" id="name" name='name' className="input input-bordered w-full max-w-xs" />
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
                    <label className="input-group">
                        <span className='bg-primary text-base-100'>+62</span>
                        <input type="text" name="phone_number" id="phone_number" placeholder="81283007959" className="input input-bordered w-full max-w-xs" />
                    </label>
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
                    className='btn btn-primary hover:text-white'>Simpan Data</button>
                </div>
            </form>
        </div>
    </>
  )
}
