import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';

function ProductsNew() {
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

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [previewImg, setPreviewImg] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const formJSON = Object.fromEntries(formData.entries());
        formJSON.is_active = true;
        try {
            setisLoading(true);
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/products`, formJSON, {
                headers: {
                "Content-Type": "multipart/form-data"
            },}).then((res) => res.data.metadata);
            setisLoading(false);
            toast.success(`${res?.msg}`,{
                position: toast.POSITION.TOP_RIGHT
            });
            navigate('/admin/dashboard/products');
        } catch (error) {
            console.log(error);
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
    const handlePreviewImg = (e) => {
        console.log(e.target.files);
        if (e.target.files && e.target.files.length > 0) {
            setPreviewImg(e.target.files[0])
        }
    }
    useEffect(() => {
        const getCategory = async () => {
            try {
                setisLoading(true);
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/productCategories`)
                .then((res) => res.data);
                setCategories(res.data);
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

        getCategory();
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
        <div className='text-3xl text-primary'>Tambah Produk</div>
        <form 
            encType="multipart/form-data"
            className='mb-10' onSubmit={handleSubmit}>
            <div className='bg-base-100 mt-8 rounded-md p-4 mb-4'>
                    <div>
                        <p className='font-bold text-lg mb-4'>Informasi Produk</p>
                            <div className="form-control w-full max-w-xs">
                                
                                <label className="label" htmlFor='product_img'>
                                    <span className="label-text">Foto Produk</span>
                                    <span className="label-text-alt">JPG,JPEG,PNG</span>
                                </label>
                                <input type="file" 
                                accept='image/*'
                                onChange={handlePreviewImg}
                                id='product_img' name='product_img' className="file-input file-input-bordered w-full max-w-xs" />
                                <label className="label">
                                    <span className="label-text-alt"></span>
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
                            <div className="form-control w-full max-w-lg mt-2">
                                <label className="label" htmlFor="name">
                                    <span className="label-text">Nama </span>
                                </label>
                                <input type="text" placeholder="Nama Produk" id="name" name='name' 
                                className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full max-w-lg mt-2">
                                <label className="label" htmlFor="product_category_id">
                                    <span className="label-text">Kategori </span>
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
                            <div className='flex'>
                                <div className="form-control max-w-xs mt-2 mr-4">
                                    <label className="label" htmlFor="stock">
                                        <span className="label-text">Stok </span>
                                    </label>
                                    <input type="number" placeholder="100" id="stock" name='stock' 
                                    className="input input-bordered" />
                                </div>
                                <div className="form-control max-w-xs mt-2 mr-4">
                                    <label className="label" htmlFor='product_weight'>
                                        <span className="label-text">Berat Produk</span>
                                    </label>
                                    <label className="input-group">
                                        <input type="text" id="product_weight" name='product_weight' placeholder="100" className="input input-bordered" />
                                        <span className='bg-primary text-white'>Gram</span>
                                    </label>
                                </div>
                            </div>
                            <div className='flex'>
                                <div className="form-control max-w-xs mt-2 mr-4 ">
                                    <label className="label" htmlFor='buy_price'>
                                        <span className="label-text">Harga Modal</span>
                                    </label>
                                    <label className="input-group ">
                                        <span className='bg-primary text-white'>Rp</span>
                                        <input type="number" placeholder="5000" 
                                        name='buy_price'
                                        id='buy_price'
                                        className="input input-bordered input-md" />
                                    </label>
                                </div>
                                <div className="form-control max-w-xs mt-2 mr-4 ">
                                    <label className="label" htmlFor='sell_price'>
                                        <span className="label-text">Harga Jual</span>
                                    </label>
                                    <label className="input-group ">
                                        <span className='bg-primary text-white'>Rp</span>
                                        <input type="number" placeholder="5000" 
                                        id='sell_price'
                                        name='sell_price'
                                        className="input input-bordered input-md" />
                                    </label>
                                </div>
                            </div>
                            <div className="form-control w-full max-w-lg mt-2">
                                <label className="label" htmlFor="description">
                                    <span className="label-text">Deskripsi</span>
                                </label>
                                <textarea className="textarea textarea-bordered" 
                                placeholder="Deskripsikan produk"
                                id='description'
                                name='description'
                                ></textarea>
                            </div>
                            <div className="form-control w-full max-w-lg mt-2">
                                <label className="label" htmlFor="sku">
                                    <span className="label-text">SKU Produk </span>
                                </label>
                                <input type="text" placeholder="Masukkan SKU Produk" id="sku" name='sku' 
                                className="input input-bordered w-full" />
                            </div>
                    </div>
                    
            </div>
            <div className='bg-base-100 mt-8 rounded-md p-4 mb-4'>
                <div>
                    <p className='font-bold text-lg mb-4'>Pengiriman</p>
                    <div className="form-control w-full max-w-lg mt-2">
                        <label className="label" htmlFor="shipping_weight">
                            <span className="label-text">Berat Pengiriman </span>
                        </label>
                        <label className="input-group">
                            <input type="text" placeholder="100" 
                            id='shipping_weight'
                            name='shipping_weight'
                            className="input input-bordered" />
                            <span className='bg-primary text-white'>Gram</span>
                        </label>
                    </div>
                    <label className="label mt-3" htmlFor='is_sold_online'>
                        <span className="label-text">Apakah juga dijual di Toko Online?</span>
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
            <div className='flex justify-end'>
                <button className='btn btn-error mr-4'>Simpan & Arsipkan</button>
                <button className='btn btn-primary'
                >Simpan & Tampilkan</button>
            </div>
        </form>
    </>
  )
}

export default ProductsNew