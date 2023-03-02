import React, {useEffect, useState} from 'react'
import DatePicker from 'react-datepicker';
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import override from '../styles/spinner';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBoxesPacking, faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import formatRupiah from '../utils/formatRupiah';
import moment from 'moment';
import 'moment/locale/id'
import { Link } from 'react-router-dom';
moment.locale('id');


function Transaction() {
    const [isLoading, setIsLoading] = useState(false);
    const [tabOfOrders, setTabOfOrders] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [metaOrders, setMetaOrders] = useState({});
    const [ordersData, setOrdersData] = useState([]);

    let totalBtnPagination = Math.ceil(Number(metaOrders?.count_of_orders) / Number(metaOrders?.row));
    
    let handlePagination = async (idx) => {
        if (idx !== metaOrders?.page) {
            const parsing1 = moment(startDate).format('YYYY-MM-DD');
            const parsing2 = moment(endDate).format('YYYY-MM-DD');
         
            const endpoint  = tabOfOrders ? `/ofOrders` : `/onOrders/admin`;
            try {
                setIsLoading(true);
                const data = await axios.get
                (process.env.REACT_APP_API_HOST + endpoint + `?startDate=${parsing1}`
                + `&endDate=${parsing2}&offset=${idx}`)
                .then(res => res.data);
                setIsLoading(false);
                setMetaOrders({...metaOrders, page : data?.data?.meta?.page})
                setOrdersData(data?.data?.orders);                
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
    }

    useEffect(() => {
        const getData = async () => {
            const parsing1 = moment(startDate).format('YYYY-MM-DD');
            const parsing2 = moment(endDate).format('YYYY-MM-DD');
         
            const endpoint  = tabOfOrders ? `/ofOrders` : `/onOrders/admin`;
            try {
                setIsLoading(true);
                const data = await axios.get
                (process.env.REACT_APP_API_HOST + endpoint + `?startDate=${parsing1}`
                + `&endDate=${parsing2}&meta=1&offset=1`)
                .then(res => res.data);
                setIsLoading(false);
                console.log(data);
                setMetaOrders(data?.data?.meta);
                setOrdersData(data?.data?.orders);                
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
        getData();
    },[startDate, endDate, tabOfOrders])
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
            {/* <div className='text-lg font-bold mt-1'>Riwayat Penjualan</div> */}
            <div className='mt-1'>
                <div className='flex justify-between items-center'>
                    <div className='basis-6/12 mr-4'>
                        <div className='w-full flex mb-2'>
                            <div className="badge badge-primary badge-outline">Awal</div>
                        </div>
                        <DatePicker
                            selected={startDate}
                            dateFormat="yyyy/MM/dd"
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            className="w-full px-3 py-1 input-xs rounded"
                        />
                    </div>
                    <div className='basis-6/12'>
                        <div className='w-full flex justify-end mb-2'>
                            <div className="badge badge-primary badge-outline">Akhir</div>
                        </div>
                        <DatePicker
                            selected={endDate}
                            dateFormat="yyyy/MM/dd"
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            className="w-full px-3 input-xs py-1 input-ghost rounded"
                        />
                    </div>
                </div>
            </div>
            <div className="flex mt-3">
                <input type="text" 
                    placeholder="Cari No. Transaksi"
                    className="input input-sm input-bordered rounded w-full" />
                <div className='btn btn-primary btn-sm rounded -ml-10'>
                    <FontAwesomeIcon icon={faSearch}/>
                </div>
            </div>
            <div className="tabs w-full mt-5">
                <div 
                    className={tabOfOrders ? "tab tab-bordered tab-active basis-2/4 pb-10" : "tab tab-bordered basis-2/4 pb-10"}
                    onClick={() => setTabOfOrders(true)}
                >
                    Penjualan Offline
                </div> 
                <div className={tabOfOrders ? "tab tab-bordered basis-2/4 pb-10" : "tab tab-bordered tab-active basis-2/4 pb-10"}
                    onClick={() => setTabOfOrders(false)}
                >
                    Penjualan Online
                </div> 
            </div>
            <div className='flex justify-between p-2 text-xs bg-base-300'>
                <div className='text-success'>{metaOrders?.count_of_orders} Penjualan</div>
                <div className='font-bold text-success'>Rp{formatRupiah(metaOrders?.sum_of_orders)}</div>
            </div>
            {
                ordersData.length !== 0 ? 
                <div className='mt-3'>
                    {
                        ordersData.map((elm, idx) => {
                            return (
                                <Link 
                                to={`ofOrders/${elm.id}`}
                                className='flex border-b border-base-content/30 pb-4 mb-3' key={idx}>
                                    <div className=' flex items-center'>
                                        <FontAwesomeIcon 
                                        className='w-6 h-6'
                                        icon={faBoxesPacking}/>
                                    </div>
                                    <div className='flex ml-3 flex-col text-xs grow'>
                                        <div className='font-bold'>{elm.id}</div>
                                        <div className=' opacity-70 text-[10px]'>{moment(elm.createdAt).format('dddd - DD/MM/YYYY')}</div>
                                    </div>
                                    <div className='flex '>
                                        <div className='flex flex-col items-end'>
                                                <div className='text-xs font-bold'>
                                                    Rp{formatRupiah(elm.amount)}
                                                </div>
                                                <div className='text-xs opacity-70'>
                                                    {moment(elm.createdAt).format('HH:mm')}
                                                </div>
                                        </div>
                                        <div className='flex ml-3 items-center'>
                                            <FontAwesomeIcon 
                                            className='h-4 w-4 text-primary'
                                            icon={faArrowRight}/>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                :
                <div className='flex justify-center w-full'>Data Kosong</div> 
            }
            <div className='flex flex-col items-center'>
                {/* <div className="btn-group ">
                    <button className="btn btn-sm">1</button>
                    <button className="btn btn-sm btn-active">2</button>
                    <button className="btn btn-sm">3</button>
                    <button className="btn btn-sm">4</button>
                </div> */}
                <div className="btn-group ">
                    {
                       Array.from({length: totalBtnPagination}, (_, i) => i + 1)
                       //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                       .map((elm) => {
                        return (
                            <button 
                            className={Number(metaOrders?.page) === elm ?
                                "btn btn-sm btn-ghost text-primary text-bold" : "btn btn-sm btn-ghost"
                            }
                            onClick={() => handlePagination(elm)}
                            >{elm}
                            </button>
                        )
                       })
                       
                    }
                </div>
            </div>

        </>
    )
}

export default Transaction