import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import override from '../styles/spinner';
export default function Employees() {
  const customId = "custom-id-yes";
  const [isLoading,setIsLoading] = useState(false);
  const [employees,setEmployees] = useState([]);
  const handleDeleteUsers = async (deletedId) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`${process.env.REACT_APP_API_HOST}/users/${deletedId}`).then(res => res.data.metadata);
      setIsLoading(false);
      toast.success(`${res.msg}`,{
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      let errMsg = 'Internal Server Error'
      if (error.response?.status !== 500) {
          errMsg = error.response?.data?.metadata?.msg
      }
      
      toast.error(`Error ${error?.response?.status} - ${errMsg}`, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: customId
      });
      setIsLoading(false);
    }
  }
  useEffect(() => {
      const getUsers = async () => {
        try {
          setIsLoading(true);
          const res = await axios.get(`${process.env.REACT_APP_API_HOST}/users`).then((res) => res.data);
          setEmployees(res.data);
          setIsLoading(false);
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
      getUsers();
  }, [])
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
        <ToastContainer
           autoClose={3000}
           limit={1}
           hideProgressBar={false}
           newestOnTop={false}
           closeOnClick={false}
           rtl={false}
           pauseOnFocusLoss={false}
           draggable={false}
           pauseOnHover
           theme="dark"
        />
        <div className='md:hidden text-base-content font-bold text-2xl text-center'>Kelola Pegawai</div>
        <div className=' mt-4'>
            <Link to = "/admin/dashboard/employees/new" className='btn btn-primary btn-outline normal-case btn-sm'>
                Tambah Pegawai
            </Link>
        </div>
        <div className='mt-4'>
          {
            employees.length === 0 ? <div className='flex justify-center'>Data Kosong</div> : 
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* <!-- head --> */}
                <thead className=''>
                  <tr className=''>
                    <th className='bg-base-300 text-base-content normal-case'></th>
                    <th className='bg-base-300 text-base-content normal-case'>Nama</th>
                    <th className='bg-base-300 text-base-content normal-case'>No HP</th>
                    <th className='bg-base-300 text-base-content normal-case'>Email</th>
                    <th className='bg-base-300 text-base-content normal-case'>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    employees?.map((data,idx) => {
                      return (
                        <tr key={data.id}>
                          <th>{idx+1}</th>
                          <td>{data?.name}</td>
                          <td>{data?.phone_number}</td>
                          <td>{data?.email}</td>
                          <td className='flex'>
                            <Link to={`/admin/dashboard/employees/edit/${data.id}`}>
                                  <FontAwesomeIcon icon={faPenToSquare} className="mr-4 text-info"></FontAwesomeIcon>
                            </Link>
                            <div className='cursor-pointer' onClick={() => handleDeleteUsers(data.id)}>
                                  <FontAwesomeIcon icon={faTrash} className="text-warning"></FontAwesomeIcon>
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          }
        </div>
    </>
  )
}
