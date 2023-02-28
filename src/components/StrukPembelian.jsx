import React from 'react'
import moment from 'moment';


function StrukPembelian({orders,trxId}) {
  return (
    <>
         <div className='store-name'>Rizki Plastik</div>
            <div className='store-address'> Jl. Puri Cendana No.112, Sumberjaya, Kec. Tambun Sel., Kabupaten Bekasi, Jawa Barat 17510</div>
            <div className='trx-info'>
                <div className='trx-id'>ID : {trxId}</div>
                <div className='trx-date'>Date : {moment(orders?.createdAt).format('Do MMMM YYYY, h:mm:ss a')}</div>
            </div>
            <div className='product-list'>
                <div className='tabs-1'>
                    <div className='no'>No</div>
                    <div className='name'>Nama</div>
                    <div className='qty'>Qty</div>
                    <div className='price'>Harga</div>
                    <div className='total'>Total</div>
                </div>
                    {
                        orders?.Products?.map((elm,idx) => {
                            let details = elm.of_orders_details;
                            return (
                                <div className='product' key={idx}>
                                    <div className='no'>{idx+1}</div>
                                    <div className='name'>{elm.name}</div>
                                    <div className='qty'>{details.qty}</div>
                                    <div className='price'>{elm.sell_price}</div>
                                    <div className='total'>{details.sum_price_each}</div>


                                </div>
                            )
                        })
                    }
            </div>
            <div className='price-container'>
                <div className='price_total pay'>
                    <div>Harga Total : </div>
                    <div>{orders?.amount}</div>
                </div>
                <div className='pay_amount pay'>
                    <div>Bayar : </div>
                    <div>{orders?.pay_amount}</div>
                </div>
                <div className='pay_change pay'>
                    <div>Kembali : </div>
                    <div>{String(Number(orders?.pay_amount) - Number(orders?.amount))}</div>
                </div>
            </div>
    </>
  )
}

export default StrukPembelian