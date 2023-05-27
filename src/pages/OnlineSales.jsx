import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom';
import useSWR from 'swr';

moment.locale('id')
function OnlineSales() {
    const fetcher = async (url) => await axios.get(url).then(res => res.data.data);
    const {data : order, isLoading : loadOrder} = useSWR(`${process.env.REACT_APP_API_HOST}/onOrders/all`, fetcher);
    return (
        <>
            <div className=''>
                <div className='font-bold text-lg'>Penjualan Online</div>
                <div className="divider my-1"></div>
                {
                    loadOrder ? <div className=''>Loading...</div>
                    :
                    <div className=''>
                    {
                        order && 
                        order.map((data, idx) => {
                        return (
                            <div key={idx} className="my-3 p-4 bg-base-100 rounded-lg">
                                <div className='flex justify-between'>
                                    <div className='text-xs items-center'>
                                        <div className='text-sm'>
                                            <div>Customer : {data?.Customer?.email}</div>
                                        </div>
                                        <div className=''>No Pesanan : <span className='font-bold'>{data?.id}</span></div>
                                        <div>
                                            <FontAwesomeIcon icon={faClock} className='opacity-70 mr-1'/>
                                            {moment(data?.createdAt).format('DD MMM YYYY, HH:mm')}
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-end'>
                                    
                                        {
                                            data?.status === 'belum dibayar' &&
                                            <div className="badge badge-success badge-outline badge-sm">Belum Dibayar</div>
                                        }
                                        {
                                            data?.status === 'dibayar' &&
                                            <div className='badge badge-success badge-outline badge-sm'>Menunggu verifikasi</div>
                                        }
                                        {
                                            data?.status === 'cod' &&
                                            <div className='badge badge-success badge-outline badge-sm'>Belum dibayar</div>
                                        }
                                        {
                                            data?.status === 'diproses' &&
                                            <div className='badge badge-success badge-outline badge-sm'>Diproses</div>
                                        }
                                        {
                                            data?.status === 'ready_to_pickup' &&
                                            <div className='badge badge-success badge-outline badge-sm'>Siap dipickup</div>
                                        }
                                        {
                                            data?.status === 'selesai' &&
                                            <div className='badge badge-success badge-outline badge-sm'>Selesai</div>
                                        }
                                         {
                                            data?.status === 'batal' &&
                                            <div className='badge badge-error badge-outline badge-sm'>Batal</div>
                                        }
                                        
                                        <div className='flex'>
                                            <div className='badge badge-info badge-outline badge-sm mt-2'>{data?.pay_method}</div>
                                        <   div className='badge badge-info badge-outline badge-sm ml-1 mt-2'>{data?.shipping_method}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="divider my-1"></div>
                                <div className='flex'>
                                    <img src={`${data?.Products[0]?.url_img}`} 
                                    className='object-cover h-14 rounded'
                                    alt='gambar produk'/>
                                <div className='grow flex flex-col ml-4 text-xs'>
                                    <div className='font-bold text-sm'>{data?.Products[0]?.name}</div>
                                    <div className='opacity-70'>
                                        {`${data?.Products[0]?.On_orders_detail?.qty} x Rp${new Intl.NumberFormat(['ban', 'id']).format(
                                        data?.Products[0]?.On_orders_detail?.sum_price_each 
                                        / data?.Products[0]?.On_orders_detail?.qty )}`}
                                    </div>
                                    {
                                        data?.Products.length > 1 ?
                                        <div className='opacity-70 mt-3'>
                                        {`+${data?.Products.length - 1} produk lainnya`}
                                        </div>
                                        : null
                                    }
                                </div>
                                </div>
                                <div className='flex justify-between mt-2 items-center'>
                                    <div className='font-bold text-lg'>{`Rp${new Intl.NumberFormat(['ban', 'id']).format(data?.amount)}`}</div>
                                    <div className='flex justify-end'>
                                        <Link 
                                        to={data?.id}
                                        className='btn btn-secondary btn-outline btn-sm text-base-100 normal-case'>
                                        Lihat Detail Transaksi</Link>
                                    </div>
                                </div>
                            </div>
                        )
                        })

                    }
                </div>
                }
            </div>
        </>
    )
}

export default OnlineSales