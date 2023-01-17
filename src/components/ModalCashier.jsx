import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {modifiedQty, destroyProduct, sumOrders} from '../features/cashierSlice';
export default function ModalCashier({productsOrdered,resetSelectedProduct}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isModified, setIsModified] = useState({
        id : "",
        active : false
    });
    const [qtyModified,setQtyModified] = useState();
  return (
    <>
        {/* The button to open modal */}
        <label htmlFor="my-modal-6" className="btn btn-secondary w-full mt-4 flex normal-case justify-between">
            <span className='font-bold'>
            { productsOrdered ? `${productsOrdered.length} Produk ` : `0 Produk `} 
            </span>
            <span className='font-bold'>Bayar : 
            {
                productsOrdered ? 
                `Rp ${productsOrdered.reduce((prev, curr) => prev + curr?.text?.amount, 0)}`
                : 'Rp 0'
            }
            </span>
        </label>
        {/* Put this part before </body> tag */}
        {/* Modal #1 */}
        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
            {
                productsOrdered?.map((elm,idx) => {
                const data = elm.text
                return(
                    <div key={elm.id}>
                        <div className='flex mb-4' >
                            <div className='w-14 h-14 bg-primary flex justify-center items-center bg-neutral text-base-100 font-bold'>
                                    {`${data?.qty}X`}
                            </div>
                            <div className='flex justify-between w-full'>
                                <div className='flex flex-col text-sm ml-2'>
                                    <p className='font-bold'>{data?.name}</p>
                                    <div className='text-xs'>
                                        <p className=''>Harga per produk : Rp{data?.originPrice}</p>
                                        <p className=''>Total per produk : Rp{data?.amount}</p>
                                    </div>
                                </div>
                                <div className='flex items-center'>
                                    <div className='btn btn normal-case mr-2 btn-outline btn-primary'
                                        onClick={() => {
                                            setIsModified((prev) => {
                                                return {
                                                    id : elm?.id,
                                                    active : !prev.active
                                                }

                                            })
                                            setQtyModified('')
                                        }}
                                    >
                                        Ubah  
                                    </div>      
                                    <div className='btn btn normal-case btn-outline btn-primary'
                                    onClick={() => {
                                        dispatch(destroyProduct({id : elm.id}))
                                    }}
                                    >
                                        Hapus   
                                    </div>      
                                </div>          
                            </div>
                        </div>
                        {
                            isModified?.active &&  isModified?.id === elm.id ? 
                            <div className='mb-3 flex'>
                                <input 
                                value={qtyModified ? qtyModified : ""}
                                onChange={(e) => setQtyModified(e.target.value)}
                                type="number" name='qty' placeholder="Masukkan Jumlah QTY"
                                className="input input-sm input-bordered w-full max-w-xs" />
                                <div className='btn btn-sm ml-2 btn-primary flex-1'
                                    onClick={() => {
                                        dispatch(modifiedQty({id : elm.id, qty : qtyModified}))
                                        setIsModified({
                                            id : "",
                                            active : false
                                    })
                                    }}
                                >Simpan</div>
                            </div>
                            : null
                        }
                    </div>
                )

                })
            }
            {
                productsOrdered.length > 0 ? 
                <div className='btn btn-sm w-full btn-error normal-case text-base-100'
                onClick={() => {
                    resetSelectedProduct()
                }}
                >
                Hapus Semua
                </div> : null
            }
            <div className='flex justify-between bg-secondary px-4 py-2 mt-2 rounded'>
                <div>Total</div>
                <div className='font-bold'>{
                    productsOrdered ? 
                    `Rp ${productsOrdered.reduce((prev, curr) => prev + curr?.text?.amount, 0)}`
                    : 'Rp 0'
                }</div>
            </div>
            <div className="divider"></div> 
            <div className="modal-action">
                <label htmlFor="my-modal-6" className="btn btn-warning"
                onClick={() => {
                    setIsModified({
                            id : "",
                            active : false
                    })
                    setQtyModified(false)
                }}
                >Tutup</label>
                {
                productsOrdered.length > 0 ? 
                <div className='btn btn-primary text-white'
                    onClick={() => {
                        const sumPrice = productsOrdered.reduce((prev, curr) => prev + curr?.text?.amount, 0);
                        dispatch(sumOrders({sumPrice}))
                        navigate('transactions');
                    }}
                >Bayar Sekarang</div> : null
                }
                
            </div>
            </div>
        </div>
    </>
  )
}
