import React, { useState } from 'react'

export default function InputQTYCashier(props) {
    const [quantity, setQuantity] = useState();

  return (
    <>
        <div className='flex items-center justify-center w-full 
            min-h-screen z-50 fixed left-0 top-0 bg-neutral lg:ml-44 '>
                <div className='p-8 flex  flex-col items-center bg-base-100 w-2/5'>
                    <div className='text-primary font-bold text-2xl '>{[props?.header]}</div>
                    <div className='font-bold mt-2 text-center'>
                            Nama Produk : {props?.product?.name}<br></br>
                            Stok : {props?.product?.stock}
                    </div>                    
                    <div className='mt-4'>
                        <input type="NUMBER" name='qty' placeholder="Masukkan Jumlah QTY" 
                        value={quantity ? quantity : ""}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="input input-bordered w-full max-w-xs" />
                        <div className='flex justify-center mt-4'>
                            <button type='reset' className='btn btn-warning mr-4'
                            onClick={() => props.isModalOpen(false)}
                            >Batal</button>
                        <div 
                        onClick={() => {
                            const payload = {
                                name :props?.product?.name,
                                originPrice : props?.product?.price,
                                qty : Number(quantity),
                                amount : Number(quantity) * props?.product?.price
                            }
                            props.action(payload)
                            props.isModalOpen(false)
                        }}  
                        className='btn btn-primary'>Tambah</div>
                        </div>
                    </div>
                </div>
        </div>
    </>
  )
}
