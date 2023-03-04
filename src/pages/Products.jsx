import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import CardProduct from '../components/CardProduct';
import override from '../styles/spinner';
export default function Products() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]); 
  const unArchiveProduct = async (id) => {
      try {
        setIsLoading(true);
        const res = await axios.patch(`${process.env.REACT_APP_API_HOST}/products/archive/${id}?is_active=true`).then(res => res.data.metadata);
        setIsLoading(false);
        toast.success(`${res.msg}`);
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
  const archiveProduct = async (id) => {
      try {
        setIsLoading(true);
        const res = await axios.patch(`${process.env.REACT_APP_API_HOST}/products/archive/${id}?is_active=false`).then(res => res.data.metadata);
        setIsLoading(false);
        toast.success(`${res.msg}`);
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
  const handleDeleteProduct = async (deletedId) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`${process.env.REACT_APP_API_HOST}/products/${deletedId}`).then(res => res.data.metadata);
      setIsLoading(false);
      toast.success(`${res.msg}`);
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
    const getProduct = async () => {
          try {
            setIsLoading(true)
            const res = await axios.get(`${process.env.REACT_APP_API_HOST}/products`).then((res) => res.data);
            setProducts(res.data)
            setIsLoading(false);
          } catch (error) {
            
          }
    }
    getProduct();
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
        <div className='flex justify-end my-4'>
            <Link 
            to='/admin/dashboard/products/new'
            className='btn btn-primary btn-outline normal-case btn-sm'>Tambah Produk</Link>
        </div>
        <div>
          {
            products?.map((product, idx) => {
              return (
                <CardProduct key={idx} 
                product={product} 
                deleteProduct={handleDeleteProduct}
                archiveProduct={archiveProduct}
                unArchive={unArchiveProduct}
                />
              )
            })
          }
        </div>
    </>

  )
}
