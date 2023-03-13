import {  faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import CardProduct from '../components/CardProduct';
import override from '../styles/spinner';
import useSWR from 'swr';

export default function Products() {
  
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState('');
  const [category, setCategory] = useState('');

  
  const unArchiveProduct = async (id) => {
      try {
        setLoading(true);
        const res = await axios.patch(`${process.env.REACT_APP_API_HOST}/products/archive/${id}?is_active=true`).then(res => res.data.metadata);
        setLoading(false);
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
        setLoading(false);
      }
  }
  const archiveProduct = async (id) => {
      try {
        setLoading(true);
        const res = await axios.patch(`${process.env.REACT_APP_API_HOST}/products/archive/${id}?is_active=false`).then(res => res.data.metadata);
        setLoading(false);
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
        setLoading(false);
      }
  }
  const handleDeleteProduct = async (deletedId) => {
    try {
      setLoading(true);
      const res = await axios.delete(`${process.env.REACT_APP_API_HOST}/products/${deletedId}`).then(res => res.data.metadata);
      setLoading(false);
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
      setLoading(false);
    }
  }
  
  const baseFetcher = (url) => axios.get(url).then((res) => res.data.data);
  const api_url_products = `${process.env.REACT_APP_API_HOST}/products?search=${search}&page=${page}&c=${category}`;
  const api_url_category = `${process.env.REACT_APP_API_HOST}/productCategories`;

  const { data : products, error, isLoading : loadingProduct } = useSWR(api_url_products, baseFetcher);
  const { data : pCategories } = useSWR(api_url_category, baseFetcher);
  let totalBtnPagination = Math.ceil(Number(products?.meta?.count) / 10);



  return (
    <>
    
        {
          loadingProduct && firstLoad && 
          <div className='bg-base-100 fixed z-50 w-full left-0 top-0 right-0 min-h-screen'>
                <ClipLoader
                color={"#1eb854"}
                loading={loadingProduct}
                size={35}
                cssOverride={override}
                aria-label="Loading Spinner"
                data-testid="loader"
                />
          </div>
        }
        {
          loading && 
          <div className='bg-base-100 fixed z-50 w-full left-0 top-0 right-0 min-h-screen'>
                <ClipLoader
                color={"#1eb854"}
                loading={loading}
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
            className='btn btn-primary  btn-outline normal-case btn-sm'>Tambah Produk</Link>
        </div>
        <div className='flex'>
            <input type="text" 
                      value={search}
                      onChange={(e) => {
                        setCategory('')
                        setFirstLoad(false)
                        setSearch(e.target.value)}}
                      placeholder="Cari Produk"
                      className="input input-sm input-bordered rounded w-full" />
            <div className='btn btn-ghost btn-sm rounded -ml-10'>
                <FontAwesomeIcon icon={faSearch}/>
            </div>
        </div>
        {
          search ? null : 
          <select className="select rounded select-bordered select-sm mt-4 w-full"
              id='product_category_id'
              name='product_category_id'
              defaultValue={'DEFAULT'}
              onChange={(e) => {
                  setPage('')
                  setSearch('')
                  setCategory(e.target.value)
              }}
          >
              <option disabled value={'DEFAULT'}>Pilih Kategori Produk!</option>
              {
                  pCategories?.map((category) => {
                      return (
                          <option key={category.id} value={category.id}>
                              {category.name}
                          </option>
                      )
                  })
              }
          </select>
        }
        {
          error && <div>Error</div>
        }
        {
          products?.products?.length === 0 && <div className='text-center mt-4'>Produk tidak ditemukan</div>
        }
        <div className='mt-4'>
          {
            products?.products?.map((product, idx) => {
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
          <div className='flex justify-center'>
            <div className="btn-group ">
                      {
                        Array.from({length: totalBtnPagination}, (_, i) => i + 1)
                        //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                        .map((elm) => {
                          return (
                              <button 
                              className={Number(products?.meta?.page) + 1 === elm ?
                                  "btn btn-sm btn-ghost text-primary text-bold" : "btn btn-sm btn-ghost"
                              }
                              onClick={() => setPage(elm)}
                              key={elm}
                              >{elm}
                              </button>
                          )
                        })
                        
                      }
            </div>

          </div>
        </div>
    </>

  )
}
