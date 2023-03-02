import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import override from '../styles/spinner';
import 'moment/locale/id'
import formatRupiah from '../utils/formatRupiah';
import ReactToPrint from 'react-to-print';
import structStyles from '../styles/stringStruct';
import styles from './../styles/struk.module.css';
import StrukPembelian from '../components/StrukPembelian';
moment.locale('id');



function TransactionDetails() {
    const {transaction_id} = useParams();
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const componentRef = useRef();

    useEffect(() => {
            const getData = async () => {
                try {
                    setIsLoading(true);
                    const res = await axios.get(`${process.env.REACT_APP_API_HOST}/ofOrders/${transaction_id}`)
                    setIsLoading(false);
                    setOrder(res?.data?.data);

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
            getData()
    }, [transaction_id])


    return (
        <>
            {/* Printed Struct */}
            <div className={styles.con}>
                <div className='con-page' ref={componentRef}>
                    <StrukPembelian orders={order} trxId={transaction_id}/>
                </div>
            </div> 
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
            <div className='flex justify-between items-center'>
                <div className='font-bold text-sm'>Detail Transaksi</div>
                <div className='font-bold text-xs text-primary'>{transaction_id}</div>
            </div>
            <div className="divider my-1"></div>
            <div className='flex flex-col text-[10px]'>
                <div className='flex justify-between  opacity-70'>
                    <div>Nama Kasir</div>
                    <div>{order?.User?.name}</div>
                </div>
                <div className='flex justify-between opacity-70'>
                    <div>Tanggal Transaksi</div>
                    <div>{moment(order?.createdAt).format('DD MMM YYYY, HH:mm')}</div>
                </div>
            </div>
            <div className='btn btn-outline btn-sm mt-6 w-full normal-case rounded'>Batalkan</div>
            <ReactToPrint
                trigger={() => <div 
                    className='btn btn-outline btn-primary btn-sm mt-3 w-full normal-case rounded'> Cetak Struk</div>}
                content={() => componentRef.current}
                pageStyle={structStyles}
            />
            <div className='mt-3'>
                <div className='font-bold text-sm'>Detail Pembelian</div>
                <div className="divider my-1"></div>
                <div>
                    {
                        order?.Products?.map((elm, idx) => {
                            const snap = elm.Snap_products[0];
                            return (
                                <div className="flex text-xs justify-between border-b border-base-content/30 pb-4 mb-4 " 
                                key={idx}>
                                    <div className='flex flex-col'>
                                        <div className='font-bold'>{snap?.name}</div>
                                        <div className='opacity-70'>
                                            {`Rp${formatRupiah(snap?.sell_price)} x ${elm.of_orders_details?.qty}`}
                                        </div>
                                    </div>
                                    <div className='flex items-end'>
                                        <div>
                                            Rp{formatRupiah(elm?.of_orders_details?.sum_price_each)}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>  
            <div className='mt-3 pb-3'>
                <div className='flex justify-between font-bold text-sm'>
                    <div className='font-bold'>Total</div>
                    <div>Rp{formatRupiah(order?.amount)}</div>
                </div>
                <div className='flex justify-between text-xs opacity-70 mt-1'>
                    <div className='font-bold'>Dibayar</div>
                    <div>Rp{formatRupiah(order?.pay_amount)}</div>
                </div>
                <div className='flex justify-between text-xs opacity-70'>
                    <div className='font-bold'>Kembalian</div>
                    <div>Rp{formatRupiah(order?.pay_amount - order?.amount )}</div>
                </div>
            </div>
        </>
    )
}

export default TransactionDetails