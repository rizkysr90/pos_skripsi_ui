import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';

export default function Products() {
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
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]); 
  const handleDeleteProduct = async (deletedId) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`${process.env.REACT_APP_API_HOST}/products/${deletedId}`).then(res => res.data.metadata);
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
          position: toast.POSITION.TOP_RIGHT
      });
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
      <BeatLoader
            color={'#6419E6'}
            loading={isLoading}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
        /> 
        <ToastContainer/>
      <div className='flex justify-end'>
          <Link 
          to='/admin/dashboard/products/new'
          className='btn btn-primary'>Tambah Produk</Link>
      </div>
      <div className='mt-8'>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Nama Produk</th>
                  <th>Kategori</th>
                  <th>Harga Jual</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  products?.map((product, idx) => {
                    return(

                    <tr key={product.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={product?.url_img} alt="foto produk" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{product?.name}</div>
                            <div className="text-sm opacity-50">Stok : {product?.stock}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {product?.product_category?.name}
                      </td>
                      <td>Rp{product?.sell_price}</td>
                      <th className=''>
                        <Link to={`edit/${product?.id}`}>
                              <FontAwesomeIcon icon={faPenToSquare} className="mr-4"></FontAwesomeIcon>
                        </Link>
                        <div className='cursor-pointer'
                              onClick={() => handleDeleteProduct(product?.id)}
                        >
                              <FontAwesomeIcon icon={faTrash} className=""></FontAwesomeIcon>
                        </div>
                      </th>
                    </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
      </div>
    </>

  )
}
