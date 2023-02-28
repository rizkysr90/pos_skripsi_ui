import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ReactToPrint from 'react-to-print';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import styles from './../styles/struk.module.css';
import override from '../styles/spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import formatRupiah from '../utils/formatRupiah';
import structStyles from '../styles/stringStruct';
import StrukPembelian from '../components/StrukPembelian';

export default function CashierTransactionSuccess() {
    const [isLoading, setIsLoading] = useState(false);
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
                setIsLoading(true)
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/ofOrders/${trxId}`).then((res) => res.data.data);
                setOrders(res);
                setIsLoading(false)
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
    }, [trxId])
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
        <div className={styles.con}>
            <div className='con-page' ref={componentRef}>
                   <StrukPembelian orders={orders} trxId={trxId}/>
            </div>
        </div> 
        <div className='flex flex-col items-center mt-4'>
            <FontAwesomeIcon icon={faCheckCircle} className="text-success text-5xl"/>
            <div className='font-bold text-xl mt-4'>Transaksi Berhasil</div>
            <div>{moment(orders?.createdAt).format('Do MMMM YYYY, h:mm:ss a')}</div>
        </div>
        <div className='mt-4'>
            <div className='text-sm flex justify-between'>
                <div className=''>Total Tagihan </div>
                <div className='font-bold'>Rp{formatRupiah(total)}</div>
                {/* <div>Rp {payAmount - total}</div> */}
            </div>
            <div className='text-sm flex justify-between mt-2'>
                <div className=''>Dibayar</div>
                <div className='font-bold'>Rp{formatRupiah(payAmount)}</div>
                {/* <div className='font-bold'>Rp{ formatRupiah(payAmount - total)}</div> */}
            </div>
            <div className='text-sm flex justify-between mt-2'>
                <div className=''>Kembalian</div>
                <div className='font-bold text-warning'>Rp{ formatRupiah(payAmount - total)}</div>
            </div>
        </div>
        <div className='mt-8 flex'>
            <ReactToPrint
                trigger={() => <div 
                    className='btn btn-primary basis-6/12 btn-sm mr-1 rounded-lg normal-case btn-outline'> Cetak Struk</div>}
                content={() => componentRef.current}
                pageStyle={structStyles}
            />
            <div 
            onClick={() => navigate('/admin/dashboard/cashier')}
            className='btn btn-primary basis-6/12 btn-sm rounded-lg normal-case'>Transaksi Baru</div>
        </div>
    </>
  )
}
