import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function Employees() {
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
  const [loading,setLoading] = useState(false);
  const [employees,setEmployees] = useState([]);
  const handleDeleteUsers = async (deletedId) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${process.env.REACT_APP_API_HOST}/users/${deletedId}`).then(res => res.data.metadata);
      setLoading(false);
      toast.success(`${res.msg}`,{
        position: toast.POSITION.TOP_RIGHT
      });
    } catch (error) {
      let errMsg = 'Internal Server Error'
      if (error.response?.status !== 500) {
          errMsg = error.response?.data?.metadata?.msg
      }
      
      toast.error(`Error ${error?.response?.status} - ${errMsg}`, {
          position: toast.POSITION.TOP_RIGHT
      });
      setLoading(false);
    }
  }
  useEffect(() => {
      const getUsers = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`${process.env.REACT_APP_API_HOST}/users`).then((res) => res.data);
          setEmployees(res.data);
          setLoading(false);
        } catch (error) {
          let errMsg = 'Internal Server Error'
          if (error.response?.status !== 500) {
              errMsg = error.response?.data?.metadata?.msg
          }
          
          toast.error(`Error ${error?.response?.status} - ${errMsg}`, {
              position: toast.POSITION.TOP_RIGHT
          });
          setLoading(false);
        }
      }
      getUsers();
  }, [])
  return (
    <>
        <BeatLoader
            color={'#6419E6'}
            loading={loading}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
        /> 
        <ToastContainer/>
        <div className='flex justify-end'>
            <Link to = "/admin/dashboard/employees/new" className='btn btn-primary text-base-100'>
                Tambah Pegawai
            </Link>
        </div>
        <div className='bg-secondary mt-4'>
          {
            employees.length === 0 ? <div className='flex justify-center'>Data Kosong</div> : 
            <div className="overflow-x-auto">
              <table className="table w-full">
                {/* <!-- head --> */}
                <thead className=''>
                  <tr className=''>
                    <th></th>
                    <th>Nama</th>
                    <th>No HP</th>
                    <th>Email</th>
                    <th></th>
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
                                  <FontAwesomeIcon icon={faPenToSquare} className="mr-4"></FontAwesomeIcon>
                            </Link>
                            <div className='cursor-pointer' onClick={() => handleDeleteUsers(data.id)}>
                                  <FontAwesomeIcon icon={faTrash} className=""></FontAwesomeIcon>
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
