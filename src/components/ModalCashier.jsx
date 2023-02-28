import { faCashRegister, faClose, faMoneyBill, faPencilAlt, faRemove, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {modifiedQty, destroyProduct, sumOrders} from '../features/cashierSlice';
import formatRupiah from '../utils/formatRupiah';
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
        <label htmlFor="my-modal-6" 
        className="btn btn-info rounded-lg w-full mt-4 flex normal-case justify-between">

            <span className='font-bold'>
            <FontAwesomeIcon icon={faCashRegister} className="mr-2"/>
            { productsOrdered ? `${productsOrdered.length} Produk ` : `0 Produk `} 
            </span>
            <span className='font-bold'>Bayar =
            {
                productsOrdered ? 
                ` Rp${formatRupiah(productsOrdered.reduce((prev, curr) => prev + curr?.amount, 0))}`
                : 'Rp0'
            }
            </span>
        </label>
        {/* Put this part before </body> tag */}
        {/* Modal #1 */}
        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
            <div className='flex justify-end w-full '>
                <label htmlFor="my-modal-6" 
                className="btn btn-ghost rounded-lg normal-case text-2xl text-warning btn-sm"
                    onClick={() => {
                        setIsModified({
                            id : "",
                            active : false
                        })
                        setQtyModified(false)
                    }}
                >
                    <FontAwesomeIcon icon={faClose}/>
                </label>
            </div>
            <div className="alert shadow-xs text-sm p-0 mb-4">
                <div className='w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span>Cek pesanan dahulu sebelum melakukan pembayaran</span>
                </div>
            </div>
            {
                productsOrdered?.map((elm,idx) => {
                return(
                    <div key={elm.product_id} className="border-b border-base-content/30 mb-4">
                        <div className='flex mb-4' >
                            <div className='w-14 h-14 bg-info flex justify-center items-center bg-neutral text-base-100 font-bold'>
                                    {`${elm?.qty}X`}
                            </div>
                            <div className='flex justify-between w-full'>
                                <div className='flex flex-col text-sm ml-2'>
                                    <p className='font-bold text-xs'>{elm?.name}</p>
                                    <div className='text-xs mt-1'>
                                        <p className=''>Rp{formatRupiah(elm?.originPrice)}</p>
                                        {/* <p className=''>Total per produk : Rp{elm?.amount}</p> */}
                                    </div>
                                </div>
                                <div className=' flex w-3/12 flex-col justify-between items-end'>
                                    <div className='flex items-center'>
                                        <div className='btn btn btn-xs normal-case mr-2 btn-outline btn-primary'
                                            onClick={() => {
                                                setIsModified((prev) => {
                                                    return {
                                                        id : elm?.product_id,
                                                        active : !prev.active
                                                    }

                                                })
                                                setQtyModified('')
                                            }}
                                        >
                                            {<FontAwesomeIcon icon={faPencilAlt}/>}  
                                        </div>      
                                        <div className='btn btn-xs normal-case btn-outline btn-primary'
                                        onClick={() => {
                                            dispatch(destroyProduct({id : elm.product_id}))
                                        }}
                                        >
                                            {<FontAwesomeIcon icon={faTrashAlt}/>}  
                                        </div>      
                                    </div>          
                                    <p className='font-bold'>Rp{formatRupiah(elm?.amount)}</p>
                                </div>
                            </div>
                        </div>
                        {
                            isModified?.active &&  isModified?.id === elm.product_id ? 
                            <div className='mb-3 flex'>
                                <input 
                                value={qtyModified ? qtyModified : ""}
                                onChange={(e) => setQtyModified(e.target.value)}
                                type="number" name='qty' placeholder="Masukkan Jumlah QTY"
                                className="input input-sm input-bordered w-full max-w-xs" />
                                <div className='btn btn-sm ml-2 btn-primary flex-1'
                                    onClick={() => {
                                        dispatch(modifiedQty({id : elm.product_id, qty : qtyModified}))
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
                <div className='btn btn-ghost w-full btn-error normal-case text-error rounded-lg'
                onClick={() => {
                    resetSelectedProduct()
                }}
                >
                {
                    <FontAwesomeIcon icon={faTrashAlt} className="mr-2"/>
                }
                Hapus Semua
                </div> : null
            }
           
            <div className="modal-action mt-1">
                {
                productsOrdered.length > 0 ? 
                <div 
                className='btn btn-primary normal-case font-bold text-lg w-full rounded-lg flex justify-between items-center'
                    onClick={() => {
                        const sumPrice = productsOrdered.reduce((prev, curr) => prev + curr?.amount, 0);
                        dispatch(sumOrders({sumPrice}))
                        navigate('transactions');
                    }}
                >
                    <span>
                        Bayar 
                    </span>
                    <span>
                        {`Rp${formatRupiah(productsOrdered.reduce((prev, curr) => prev + curr?.amount, 0))}`}
                    </span>
                    
               
                </div> : null
                }
                
            </div>
            </div>
        </div>
    </>
  )
}
