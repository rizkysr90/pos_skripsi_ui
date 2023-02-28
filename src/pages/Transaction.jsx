import React, {useState} from 'react'
import DatePicker from 'react-datepicker';
import { ClipLoader } from 'react-spinners';
import { ToastContainer } from 'react-toastify';
import override from '../styles/spinner';
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function Transaction() {
    const [isLoading, setIsLoading] = useState(false);
    const [tabOfOrders, setTabOfOrders] = useState(true);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

   
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

        </>
    )
}

export default Transaction