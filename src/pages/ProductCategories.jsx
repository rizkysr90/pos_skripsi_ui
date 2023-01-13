import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { BeatLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import ModalProductCategory from '../components/ModalProductCategory';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ProductCategories() {
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
    const [productCategories, setProductCategories] = useState([]);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [productCategory, setProductCategory] = useState({});
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const getCategoryById = async (id) => {
        try {
            setModalUpdate(true);
            setisLoading(true);
            setSelectedCategoryId(id);
            const res = await axios.get(`${process.env.REACT_APP_API_HOST}/productCategories/${id}`).then((res) => res.data);
            setProductCategory(res.data);
            setisLoading(false);
        } catch (error) {
            let errMsg = 'Internal Server Error'
            if (error.response?.status !== 500) {
                errMsg = error.response?.data?.metadata?.msg
            }
            
            toast.error(`Error ${error?.response?.status} - ${errMsg}`, {
                position: toast.POSITION.TOP_RIGHT
            });
            setisLoading(false);

        }
    }
    const handleDeleteCategory = async (id) => {
        try {
            setisLoading(true);
            const res = await axios.delete(`${process.env.REACT_APP_API_HOST}/productCategories/${id}`).then(res => res.data?.metadata);
            setisLoading(false);
            toast.success(`${res?.msg}`,{
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
            setisLoading(false);
        }
    }
    const handleSubmitEdit = async (e,id) => {
        e.preventDefault();
        setisLoading(true);
        const form = e.target;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());

        try {
            const res = await axios.put(`${process.env.REACT_APP_API_HOST}/productCategories/${id}`, formJSON).then(res => res.data.metadata);
            setisLoading(false);
            toast.success(`${res?.msg}`,{
                position: toast.POSITION.TOP_RIGHT
            });
            setModalUpdate(false);
        } catch (error) {
            let errMsg = 'Internal Server Error'
            if (error.response?.status !== 500) {
                errMsg = error.response?.data?.metadata?.msg
            }
            
            toast.error(`Error ${error?.response?.status} - ${errMsg}`, {
                position: toast.POSITION.TOP_RIGHT
            });
            setisLoading(false);
        }
    }
    const handleSubmitAdd = async (e) => {
        e.preventDefault();
        setisLoading(true);
        const form = e.target;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/productCategories`, formJSON).then(res => res.data.metadata);
            setisLoading(false);
            toast.success(`${res?.msg}`,{
                position: toast.POSITION.TOP_RIGHT
            });
            setModalAdd(false);
        } catch (error) {
            let errMsg = 'Internal Server Error'
            if (error.response?.status !== 500) {
                errMsg = error.response?.data?.metadata?.msg
            }
            
            toast.error(`Error ${error?.response?.status} - ${errMsg}`, {
                position: toast.POSITION.TOP_RIGHT
            });
            setisLoading(false);
        }
    }
    useEffect(() => {
      const getData = async () => {
        try {
            setisLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_API_HOST}/productCategories`).then((res) => res.data);
            setProductCategories(res.data);
            setisLoading(false);            
           
        } catch (error) {
            let errMsg = 'Internal Server Error'
            if (error.response?.status !== 500) {
                errMsg = error.response?.data?.metadata?.msg
            }
            
            toast.error(`Error ${error?.response?.status} - ${errMsg}`, {
                position: toast.POSITION.TOP_RIGHT
            });
            setisLoading(false);
        }

      }
    
      getData();
    }, [])
    
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
        <div className='flex justify-between '>
            <div className='font-bold text-lg text-neutral'>
                {productCategories.length === 0 ? '0 ' : `${productCategories.length} `}
                 Kategori
            </div>
            <div 
            onClick={() => setModalAdd((prev) => prev ? false : true)}
            className='btn btn-primary hover:text-white'>
                Tambah Kategori
            </div>
        </div>
        <div className="overflow-x-auto mt-10">
            <table className="table w-full">
                <thead>
                <tr>
                    <th>Kategori</th>
                    <th>Aksi</th>
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
                                        <FontAwesomeIcon icon={faPenToSquare} className="mr-4"></FontAwesomeIcon>
                                </div>
                                <div className='cursor-pointer'
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
