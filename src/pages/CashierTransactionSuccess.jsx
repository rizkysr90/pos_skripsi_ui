import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import ReactToPrint from 'react-to-print';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import styles from './../styles/struk.module.css';

export default function CashierTransactionSuccess() {
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
    const [isLoading, setisLoading] = useState(false);
    const {total, payAmount}  = useSelector(
        (state) => state.cashier
    );
    const [orders, setOrders] = useState({});
    let { trxId } = useParams();
    const navigate = useNavigate();
    const componentRef = useRef();
    useEffect(() => {
        const getData = async () => {
            try {
                setisLoading(true)
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/ofOrders/${trxId}`).then((res) => res.data.data);
                setOrders(res);
                console.log(res);
                setisLoading(false)
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
        getData()
    }, [trxId])
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
        <div className={styles.con}>
            <div className='con-page' ref={componentRef}>
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
            </div>
        </div> 
        <div className='font-bold text-2xl'>Transaksi Sukses</div>
        <div className='text-primary text-lg'>Kembalian : Rp {payAmount - total}</div>
        <div className='mt-4'>
            <ReactToPrint
                trigger={() => <div className='btn btn-primary btn-outline'> Cetak Struk</div>}
                content={() => componentRef.current}
                pageStyle={`
                    .pay_change {
                        margin-top: 2px;
                    }
                    .price-container {
                        font-size: 8px;
                        margin-top: 5px;
                        border-top: 1px solid;
                        padding-top: 2px;
                    }
                    .pay {
                        display: flex;
                        justify-content: space-between;

                    }
                    .tabs-1 {
                        display: flex;
                    }
                    .product {
                        display: flex;
                    }
                    .no {
                        flex-basis:5%;
                        margin-right: 0.1cm;
                    }
                    .name {
                        flex-basis: 40%;
                        margin-right: 0.1cm;
                    }
                    .qty {
                        display: flex;
                        justify-content: flex-end;
                        flex-basis:7%;
                        margin-right: 0.1cm;
                    }
                    .price {
                        flex-basis:24%;
                        margin-right: 0.1cm;
                        display: flex;
                        justify-content: flex-end;
                    }
                    .total {
                        flex-basis:24%;
                        display: flex;
                        justify-content: flex-end;
                    }
                    .product-list {
                        font-size: 8px;
                        margin-top: 0.2cm;

                    }
                    .trx-info {
                       font-size: 8px;
                        margin-top: 5px;
                        border-top: 1px solid;
                        padding-top: 2px;
                    }
                    .store-name {
                        text-align: center;
                    }
                    .store-address {
                        font-size: 8px;
                        text-align: center;
                    }
                    .con-page { 
                        display: flex;
                        flex-direction: column;
                        font-family: 'Lato', sans-serif;
                        width: 100%;
                        height: 100%;
                    }
                    @media print {
                        
                        @page {
                          
                          size: 58mm 150mm;
                          margin: 0.1cm;
                          border: solid;
                        }
                    }
                `}
            />
            <div 
            onClick={() => navigate('/admin/dashboard/cashier')}
            className='btn btn-primary ml-4'>Buat Pesanan Baru</div>
        </div>
    </>
  )
}
