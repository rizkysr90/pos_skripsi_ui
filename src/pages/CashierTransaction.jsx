import React, { useState } from 'react'
import { useSelector } from 'react-redux'
export default function CashierTransaction() {
    const {total, products}  = useSelector(
        (state) => state.cashier
    );
    const [payAmount, setPayAmount] = useState('')
    return (
    <>
        <div>
            <div className=''>
                <div className='font-bold text-2xl'>Produk Dibeli</div>
                <div className="divider"></div> 
                {
                    products?.map((elm,idx) => {
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
                value={payAmount ? payAmount : ""}
                onChange={(e) => setPayAmount(e.target.value)}
                type="number" name='pay_amount' placeholder="Masukkan Jumlah Pembayaran"
                className="input input-bordered w-full max-w-xs" />
                <div className='btn btn-primary mt-4 '>
                        Bayar Sekarang!
                </div>
            </div>
        </div>
    </>
  )
}
