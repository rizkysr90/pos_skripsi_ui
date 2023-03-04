import React from 'react'
import moment from 'moment';
import 'moment/locale/id'
import formatRupiah from '../utils/formatRupiah';
moment.locale('id');

function StrukPembelian({orders,trxId}) {
  return (
    <>
         <div className='store-name'>Rizki Plastik</div>
            <div className='store-address'> Jl. Puri Cendana No.112, Sumberjaya, Kec. Tambun Sel., Kabupaten Bekasi, Jawa Barat 17510</div>
            <div className='trx-info'>
                <div className='trx-id'>ID : {trxId}</div>
                <div className='trx-date'>Date : {moment(orders?.orders?.createdAt).format('DD MMM YYYY, HH:mm')}</div>
                <div className='trx-cashier_name'>Kasir : {orders?.order?.User?.name}</div>
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
                        orders?.order_details?.map((elm,idx) => {
                            // let elm = elm.of_orders_details;
                            const snap = elm.Snap_product;

                            return (
                                <div className='product' key={idx}>
                                    <div className='no'>{idx+1}</div>
                                    <div className='name'>{snap?.name}</div>
                                    <div className='qty'>{elm.qty}</div>
                                    <div className='price'>{formatRupiah(snap?.sell_price)}</div>
                                    <div className='total'>{formatRupiah(elm.sum_price_each)}</div>
                                </div>
                            )
                        })
                    }
            </div>
            <div className='price-container'>
                <div className='price_total pay'>
                    <div>Harga Total : </div>
                    <div>Rp{formatRupiah(orders?.orders?.amount)}</div>
                </div>
                <div className='pay_amount pay'>
                    <div>Bayar : </div>
                    <div>Rp{formatRupiah(orders?.orders?.pay_amount)}</div>
                </div>
                <div className='pay_change pay'>
                    <div>Kembali : </div>
                    <div>Rp{formatRupiah(Number(orders?.orders?.pay_amount) - Number(orders?.orders?.amount))}</div>
                </div>
            </div>
    </>
  )
}

export default StrukPembelian