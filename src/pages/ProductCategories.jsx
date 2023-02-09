import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import ModalProductCategory from '../components/ModalProductCategory';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import override from '../styles/spinner';

export default function ProductCategories() {

    const [productCategories, setProductCategories] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [productCategory, setProductCategory] = useState({});
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const getCategoryById = async (id) => {
        try {
            setModalUpdate(true);
            setIsLoading(true);
            setSelectedCategoryId(id);
            const res = await axios.get(`${process.env.REACT_APP_API_HOST}/productCategories/${id}`).then((res) => res.data);
            setProductCategory(res.data);
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
    const handleDeleteCategory = async (id) => {
        try {
            setIsLoading(true);
            const res = await axios.delete(`${process.env.REACT_APP_API_HOST}/productCategories/${id}`).then(res => res.data?.metadata);
            setIsLoading(false);
            toast.success(`${res?.msg}`,{
                position: toast.POSITION.TOP_RIGHT
            });
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
    const handleSubmitEdit = async (e,id) => {
        e.preventDefault();
        setIsLoading(true);
        setModalUpdate(false);
        const form = e.target;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_HOST}/productCategories/${id}`, formJSON).then(res => res.data.metadata);
            setIsLoading(false);
            toast.success(`${res?.msg}`);
            setModalUpdate(false);
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
    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        setModalAdd(false);
        setIsLoading(true);
        const form = e.target;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/productCategories`, formJSON).then(res => res.data.metadata);
            setIsLoading(false);
            toast.success(`${res?.msg}`);
            setModalAdd(false);
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
    useEffect(() => {
      const getData = async () => {
        try {
            setIsLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API_HOST}/productCategories`).then((res) => res.data);
            setProductCategories(res.data);
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
    
      getData();
    }, [])
    
  return (
    <>
         {
          isLoading && 
          <div className='bg-base-100 fixed z-50 w-full left-0 top-0 right-0 min-h-screen'>
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
        {
            modalAdd ? 
            <ModalProductCategory
                header = 'Tambah Kategori'
                action = {handleSubmitAdd}
                isModalOpen = {setModalAdd}
            />
            : null
        }
        {
             modalUpdate  ? 
             <ModalProductCategory
                id = {selectedCategoryId}
                header = 'Edit Kategori'
                action = {handleSubmitEdit}
                isModalOpen = {setModalUpdate}
                editableData = {productCategory}
                editableAction = {setProductCategory}
                /> : null
        }
        <div className='flex justify-between my-4'>
            <div className='text-base-content font-bold text-2xl '>
                {productCategories.length === 0 ? '0 ' : `${productCategories.length} `}
                 Kategori
            </div>
            <div 
            onClick={() => setModalAdd((prev) => prev ? false : true)}
            className='btn btn-primary btn-outline normal-case btn-sm'>
                Tambah Kategori
            </div>
        </div>
        <div className="overflow-x-auto mt-10">
            <table className="table w-full">
                <thead>
                <tr>
                    <th className='bg-base-300 text-base-content normal-case'>Kategori</th>
                    <th className='bg-base-300 text-base-content normal-case'>Aksi</th>
                </tr>
                </thead>
                <tbody>
                    {
                        productCategories?.map((data, idx) => {
                            return (
                            <tr key={data.id}>
                                <td>{data?.name}</td>
                                <td className='flex'>
                                <div className='cursor-pointer'
                                    onClick={() => getCategoryById(data.id)}
                                >
                                        <FontAwesomeIcon icon={faPenToSquare} className="mr-4 text-info"></FontAwesomeIcon>
                                </div>
                                <div className='cursor-pointer text-warning'
                                    onClick={() => handleDeleteCategory(data.id)}
                                    >
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
    </>
  )
}
