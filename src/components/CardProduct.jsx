import { faCubesStacked, faLayerGroup, faRupiahSign, faScaleBalanced,  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';

import formatRupiah from '../utils/formatRupiah';

export default function CardProduct({product, deleteProduct, archiveProduct, unArchive}) {
  return (
        <div className='mb-3 px-4 py-4  rounded-md border-b border-base-content/30 '>
             {/* Modal*/}
            <input type="checkbox" id={`my-modal-${product?.id}`} className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Konfirmasi {product?.name}</h3>
                    <p className="py-4">Yakin ingin menghapus produk ini?</p>
                    <div className="modal-action">
                        <label htmlFor={`my-modal-${product?.id}`} 
                        className="btn btn-outline normal-case rounded-lg btn-sm"
                        >Kembali</label>
                        <label htmlFor={`my-modal-${product?.id}`}  className="btn btn-warning normal-case rounded-lg btn-sm"
                            onClick={() => {
                                deleteProduct(product?.id)
                            }}
                        >Hapus</label>
                    </div>
                </div>
            </div>
            <div className='flex'>
                <div className="avatar">
                    <div className="w-16 rounded-xl">
                        <img src={product?.url_img} alt="foto produk"/>
                    </div>
                </div>
                <div className='ml-3 grow text-xs flex flex-col'>
                    <p className=' text-ellipsis font-bold'>{product?.name}</p>
                    <p className='mt-1'>Rp {formatRupiah(product?.sell_price)}</p>
                </div>
            </div>
            <div className='mt-3'>
                <div className='flex justify-between text-xs opacity-70'>
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={faLayerGroup}></FontAwesomeIcon>
                        <span className='ml-2 mr-1'>Stok</span>
                        <span>{product?.stock}</span>
                    </div>
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={faRupiahSign}></FontAwesomeIcon>
                        <span className='ml-2 mr-1'>Modal</span>
                        <span>Rp{formatRupiah(product?.buy_price)}</span>
                    </div>
                </div>
            </div> 
            <div className='mt-2'>
                <div className='flex justify-between text-xs opacity-70'>
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={faCubesStacked}></FontAwesomeIcon>
                        <span className='ml-2 mr-1'>Kategori :</span>
                        <span>{product?.product_category?.name}</span>
                    </div>
                    <div className='flex items-center'>
                        <FontAwesomeIcon icon={faScaleBalanced}></FontAwesomeIcon>
                        <span className='ml-2 mr-1'>Berat</span>
                        <span>{product?.product_weight / 1000} Kg</span>
                    </div>
                </div>
            </div> 
            <div className='mt-6'>
                <div className='flex justify-end'>
                    <Link to={`edit/${product?.id}`} className='btn btn-outline rounded-md btn-sm normal-case mr-4'>Ubah</Link>
                    {
                        product?.is_active ?
                        <div className='btn btn-outline rounded-md btn-sm normal-case  mr-4 '
                            onClick={() => archiveProduct(product?.id)}
                        >Arsipkan</div>
                        :
                        <div className='btn btn-outline rounded-md btn-sm normal-case  mr-4 '
                            onClick={() => unArchive(product?.id)}
                        >Tampilkan</div>
                    }
                    <label htmlFor={`my-modal-${product?.id}`} 
                    className="btn btn-outline rounded-md btn-sm normal-case"
                    >
                        Hapus
                    </label>
                   
                    {/* <div className='btn btn-outline rounded-md btn-sm normal-case'
                        onClick={() => deleteProduct(product?.id)}
                    >Hapus</div> */}
                </div>
            </div>
        </div>

  )
}
