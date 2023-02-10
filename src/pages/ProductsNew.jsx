import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import override from '../styles/spinner';

function ProductsNew() {
   

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [previewImg, setPreviewImg] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());
        formJSON.is_active = true;
        try {
            setIsLoading(true);
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/products`, formJSON, {
                headers: {
                "Content-Type": "multipart/form-data"
            },}).then((res) => res.data.metadata);
            setIsLoading(false);
            toast.success(`${res?.msg}`);
            navigate('/admin/dashboard/products');
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
    const handlePreviewImg = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setPreviewImg(e.target.files[0])
        }
    }
    useEffect(() => {
        const getCategory = async () => {
            try {
                setIsLoading(true);
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/productCategories`)
                .then((res) => res.data);
                setCategories(res.data);
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

        getCategory();
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
        <div className="text-sm breadcrumbs">
            <ul>
                <li><a href='/'>Home</a></li> 
                <li><a href='/'>Documents</a></li> 
                <li>Tambah Produk</li>
            </ul>
            </div>
        <form 
            encType="multipart/form-data"
            className='mb-10'
            onSubmit={handleSubmit}>
            <div className='bg-base-300 mt-8 rounded-lg p-4'>
                    <div>
                            <p className='font-bold inline-block pb-2 text-2xl border-secondary border-b mb-4'>Informasi Produk</p>
                            <div className="form-control w-full md: max-w-md">
                                <label className="label" htmlFor='product_img'>
                                    <div className="label-text font-bold text-base">Tambahkan Foto Produk
                                    </div>
                                    <span className="badge badge-secondary badge-outline badge-sm">wajib</span>
                                </label>
                                <input type="file" 
                                accept='image/*'
                                onChange={handlePreviewImg}
                                id='product_img' name='product_img'
                                className="file-input file-input-bordered w-full" />
                                <label className="label text-xs">
                                    <span className="label-text-alt ">Jpg,Jpeg,Png</span>
                                    <span className="label-text-alt font-bold">Max 5MB</span>
                                </label>
                            </div>
                            {
                                previewImg && (
                                    
                                    <div className="indicator">
                                        <span className="indicator-item cursor-pointer badge badge-error"
                                            onClick={() => setPreviewImg('')}
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="text-neutral"/>    
                                        </span> 
                                        <div className="avatar">
                                            <div className="w-24 rounded">
                                                <img src={URL.createObjectURL(previewImg)} alt="foto produk"/>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className="form-control w-full sm:max-w-md mt-2">
                                <label className="label" htmlFor="name">
                                    <div className="label-text font-bold text-base flex justify-between items-center w-full">
                                        Nama 
                                        <span className="badge badge-secondary badge-outline badge-sm">wajib</span>
                                    </div>
                                </label>
                                <input type="text" placeholder="Masukkan nama produk" id="name" name='name' 
                                className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full sm:max-w-md mt-2">
                                <label className="label" htmlFor="product_category_id">
                                    <div className="label-text font-bold text-base flex justify-between items-center w-full">
                                        Kategori 
                                        <span className="badge badge-secondary badge-outline badge-sm">wajib</span>
                                    </div>
                                </label>
                                <select className="select select-bordered w-full"
                                    id='product_category_id'
                                    name='product_category_id'
                                    defaultValue={'DEFAULT'}
                                >
                                    <option disabled value={'DEFAULT'}>Pilih Kategori Produk!</option>
                                    {
                                        categories.map((category) => {
                                            return (
                                                <option key={category.id} value={category.id}>
                                                    {category.name}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='flex w-full md:max-w-md'>
                                <div className="form-control basis-2/5 mt-2 mr-2">
                                    <label className="label" htmlFor="stock">
                                        <div className="label-text font-bold text-base flex justify-between items-center w-full">
                                            Stok 
                                            <span className="badge badge-secondary badge-outline badge-sm">wajib</span>
                                        </div>
                                    </label>
                                    <input type="number" placeholder="100" id="stock" name='stock' 
                                    className="input input-bordered w-full" />
                                </div>
                                <div className="form-control basis-2/5 grow mt-2">
                                    <label className="label" htmlFor='product_weight'>
                                        <div className="label-text font-bold text-base flex justify-between items-center w-full">
                                            Berat 
                                            <span className="badge badge-secondary badge-outline badge-sm">wajib</span>
                                        </div>
                                    </label>
                                    <label className="input-group">
                                        <input type="text" id="product_weight" name='product_weight' placeholder="100gr" 
                                        className="input input-bordered  w-full" />
                                        <span className='bg-base-300'>Gram</span>
                                    </label>
                                </div>
                            </div>
                            <div className='flex w-full md:max-w-md'>
                                <div className="form-control basis-2/5 mt-2 mr-2 grow">
                                    <label className="label" htmlFor='buy_price'>
                                        <div className="label-text font-bold text-base flex justify-between items-center w-full">
                                            Harga Modal 
                                        </div>
                                    </label>
                                    <label className="input-group ">
                                        <span className='text-base-content'>Rp</span>
                                        <input type="number" placeholder="5000" 
                                        name='buy_price'
                                        id='buy_price'
                                        className="input input-bordered w-full" />
                                    </label>
                                </div>
                                <div className="form-control basis-2/5 grow mt-2">
                                    <label className="label" htmlFor='sell_price'>
                                        <div className="label-text font-bold text-base flex justify-between items-center w-full">
                                            Harga Jual 
                                            <span className="badge badge-secondary badge-outline badge-sm">wajib</span>
                                        </div>
                                    </label>
                                    <label className="input-group ">
                                        <span className='text-base-content'>Rp</span>
                                        <input type="number" placeholder="5000" 
                                        id='sell_price'
                                        name='sell_price'
                                        className="input input-bordered w-full" />
                                    </label>
                                </div>
                            </div>
                            <div className="form-control w-full md:max-w-md mt-2">
                                <label className="label" htmlFor="description">
                                    <span className="label-text font-bold text-base flex justify-between items-center w-full">Deskripsi</span>
                                </label>
                                <textarea className="textarea rounded-lg w-full textarea-bordered" 
                                placeholder="Deskripsikan produk"
                                id='description'
                                name='description'
                                ></textarea>
                            </div>
                            <div className="form-control w-full lg:max-w-md mt-2">
                                <label className="label" htmlFor="sku">
                                    <span className="label-text font-bold text-base flex justify-between items-center w-full">SKU Produk </span>
                                </label>
                                <input type="text" placeholder="Masukkan SKU Produk" id="sku" name='sku' 
                                className="input input-bordered w-full" />
                            </div>
                    </div>
                    
            </div>
            <div className='bg-base-200 rounded-lg p-4 mb-4'>
                <div>
                    <p className='font-bold inline-block pb-2 text-2xl border-secondary border-b mb-4'>Informasi Produk</p>
                    <div className="form-control w-full md:max-w-md mt-2">
                        <label className="label" htmlFor="shipping_weight">
                            <span className="label-text font-bold text-base flex justify-between items-center w-full">Berat Pengiriman </span>
                        </label>
                        <label className="input-group">
                            <input type="text" placeholder="100" 
                            id='shipping_weight'
                            name='shipping_weight'
                            className="input input-bordered w-full" />
                            <span className=' text-white'>Gram</span>
                        </label>
                    </div>
                    <label className="label mt-3" htmlFor='is_sold_online'>
                        <span className="label-text font-bold text-base flex justify-between items-center w-full">Apakah juga dijual di Toko Online?</span>
                    </label>
                    <div className='flex ml-1 items-center'>
                        <input type="radio" 
                            name="is_sold_online" 
                            className="radio radio-xs radio-primary" 
                            value={true}
                            id='ya'
                            />
                        <label className='ml-2 text-xs' htmlFor='ya'>Ya</label>
                    </div>
                    <div className='flex items-center ml-1 mt-2 mb-4'>
                        <input type="radio" 
                            name="is_sold_online" 
                            className="radio radio-xs radio-primary" 
                            value={false}
                            id='tidak'
                            />
                        <label htmlFor='tidak' className='ml-2 text-xs'>Tidak</label>
                    </div>
                </div>
            </div>
            <div className='flex w-full md:max-w-md justify-center'>
                <button className='btn  btn-md mr-4 normal-case grow'>Simpan & Arsipkan</button>
                <button className='btn btn-secondary btn-md normal-case grow'
                >Simpan & Tampilkan</button>
            </div>
        </form>
    </>
  )
}

export default ProductsNew