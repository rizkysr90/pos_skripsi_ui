import axios from 'axios';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import { payAmount } from '../features/cashierSlice';
import override from '../styles/spinner';
export default function CashierTransaction() {
   
    const [isLoading, setisLoading] = useState(false);
    const {total, products}  = useSelector(
        (state) => state.cashier
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pay, setPay] = useState('')
    const handlePay = async () => {
        try {
            setisLoading(true);
            const body = {
                status: "selesai",
                amount : total,
                pay_amount : pay,
                products
    
            }
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/ofOrders`,body).then((res) => res.data);
            setisLoading(false)
            navigate(`success/${res.data.order_id}`);
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
        <ToastContainer/>
        <div>
            <div className=''>
                <div className='font-bold text-2xl'>Produk Dibeli</div>
                <div className="divider"></div> 
                {
                    products?.map((elm,idx) => {
                    
                    return(
                        <div key={elm.id}>
                            <div className='flex mb-4' >
                                <div className='w-14 h-14 bg-primary flex justify-center items-center bg-neutral text-base-100 font-bold'>
                                        {`${elm?.qty}X`}
                                </div>
                                <div className='flex justify-between w-full'>
                                    <div className='flex flex-col text-sm ml-2'>
                                        <p className='font-bold'>{elm?.name}</p>
                                        <div className='text-xs'>
                                            <p className=''>Harga per produk : Rp{elm?.originPrice}</p>
                                            <p className=''>Total per produk : Rp{elm?.amount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )

                    })
                }
            </div>
            <div className="divider"></div> 
            <div className='font-bold text-2xl flex justify-between'>
                <span>
                Total Tagihan
                </span>
                <div className='font-bold text-lg'>Rp{total}</div>
            </div>
            <div className="divider"></div> 

            <div className='font-bold flex flex-col items-end mt-1 '>
                <span className='mb-2'>
                Uang Diterima
                </span>
                <input 
                value={pay ? pay : ""}
                onChange={(e) => setPay(e.target.value)}
                type="number" name='pay_amount' placeholder="Masukkan Jumlah Pembayaran"
                className="input input-bordered w-full max-w-xs" />
                <div className='btn btn-primary mt-4 '
                    onClick={() => {
                        dispatch(payAmount({pay}))
                        handlePay();
                      
                }}
                >
                        Bayar Sekarang!
                </div>
            </div>
        </div>
    </>
  )
}
