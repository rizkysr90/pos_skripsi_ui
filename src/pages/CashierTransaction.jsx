import axios from 'axios';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast, ToastContainer } from 'react-toastify';
import { payAmount, resetTransaction } from '../features/cashierSlice';
import override from '../styles/spinner';
import formatRupiah from '../utils/formatRupiah';

export default function CashierTransaction() {
   
    const [isLoading, setIsLoading] = useState(false);
    const {total, products}  = useSelector(
        (state) => state.cashier
    );
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [pay, setPay] = useState('');
    const handlePay = async () => {
        try {
            setIsLoading(true);
            const body = {
                status: "selesai",
                amount : total,
                pay_amount : pay,
                products
    
            }
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/ofOrders`,body).then((res) => res.data);
            setIsLoading(false)
            dispatch(resetTransaction())
            navigate(`success/${res.data.order_id}`);
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
        <div>
            <div className=''>
                <div className='font-bold text-lg'>Produk Dibeli</div>
                <div className="divider my-1"></div> 
                {
                    products?.map((elm,idx) => {
                    
                    return(
                        <div key={elm.product_id}>
                            <div className='flex mb-4' >
                                <div className='flex justify-between w-full'>
                                    <div className='flex flex-col text-sm grow'>
                                        <p className='font-bold text-xs'>{elm?.name}</p>
                                        <div className='text-xs mt-1'>
                                            <p className=''>Rp{formatRupiah(elm?.originPrice)} x {`${elm?.qty}`}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-end'>
                                        <p className='text-xs'>Rp{formatRupiah(elm?.amount)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )

                    })
                }
            </div>
            <div className="divider my-1"></div> 
            <div className='font-bold text-lg flex justify-between'>
                <span>
                    Total Tagihan
                </span>
                <div className='font-bold text-lg'>Rp{formatRupiah(total)}</div>
            </div>

            <div className='font-bold flex flex-col items-end mt-1 '>
                <input 
                value={pay ? pay : ""}
                onChange={(e) => 
                    setPay(e.target.value)
                    
                }
                type="number" name='pay_amount' placeholder="Masukkan Jumlah Pembayaran"
                className="input input-bordered w-full rounded-lg mt-2" />
                <div className='btn btn-primary normal-case w-full rounded-lg mt-auto mt-4 '
                    onClick={() => {
                        dispatch(payAmount({pay}))
                        handlePay();
                      
                }}
                >
                            Bayar Sekarang = Rp{formatRupiah(pay)}
                </div>
            </div>
        </div>
    </>
  )
}
