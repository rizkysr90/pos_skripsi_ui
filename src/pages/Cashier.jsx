import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react' 
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import ModalCashier from '../components/ModalCashier';
import { addProduct, resetProduct } from "../features/cashierSlice";
import override from '../styles/spinner';
import formatRupiah from '../utils/formatRupiah';

export default function Cashier() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [quantity, setQuantity] = useState('');
    const dispatch = useDispatch();
    const productsOrdered  = useSelector(
        (state) => state.cashier.products
    );

    const [selectedProduct, setSelecetedProduct] = useState({})
    const handleInputQty = ({name, originPrice, qty, amount, product_id}) => {
      const payload = {
          name,
          originPrice,
          qty,
          amount,
          product_id
      }
      dispatch(addProduct(payload));
    }
    const resetSelectedProduct = () => {
      dispatch(resetProduct())
    }
    useEffect(() => {
        const getProduct = async () => {
              try {
                setIsLoading(true)
                const res = await axios.get(`${process.env.REACT_APP_API_HOST}/products`).then((res) => res.data);
                setProducts(res.data)
                setIsLoading(false);
              } catch (error) {
                
              }
        }
        getProduct();
      }, [])
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
      <input type="checkbox" id="my-modal-7" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action mt-0 justify-between">
            <h3 className="font-bold text-lg">Mau beli berapa banyak?</h3>
            <label htmlFor="my-modal-7" className="btn btn-ghost btn-sm">
                <FontAwesomeIcon icon={faClose}/>
            </label>
          </div>
          <div className='opacity-70'>
            <p className=''>{selectedProduct?.name}</p>
          </div>
            <input type='number' placeholder='Masukkan jumlah pembelian'
              className='input w-full input-bordered mt-4'
              value={quantity ? quantity : ""}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <div className='flex justify-end'>
              <label 
                htmlFor="my-modal-7"
                onClick={() => {
                    const payload = {
                        product_id : selectedProduct?.id,
                        name : selectedProduct?.name,
                        originPrice : selectedProduct?.price,
                        qty : Number(quantity),
                        amount : Number(quantity) * selectedProduct?.price
                    }
                    handleInputQty(payload)
                    setSelecetedProduct({})
                    setQuantity('')
                }}  
                className='btn btn-secondary btn-outline mt-4 w-full normal-case'>Masukkan ke keranjang
                </label>
              </div>
            </div>
      </div>
      <ModalCashier
        productsOrdered={productsOrdered}
        resetSelectedProduct={resetSelectedProduct}
      />

       
      <div className='mt-8'>
          <div className='flex flex-col'>
            {
              products?.map((product, idx) => {
                return (
                  <div className='flex mb-4 border-b border-base-content/30 pb-4'>
                    <Link to={`/admin/dashboard/products/edit/${product?.id}`} className="avatar mr-3">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={product?.url_img} alt="foto produk" />
                      </div>
                    </Link>
                    <div className='flex flex-col grow'>
                      <div className='text-xs font-bold'>{product?.name}</div>
                      <div className='text-xs mt-1'>Rp {formatRupiah(product?.sell_price)}</div>
                    </div>
                    <div className='flex items-center'>
                      {
                        product?.stock <= 0 ? 
                        <button className='btn btn-sm btn-secondary btn-disabled normal-case'>Kosong</button>
                        :
                        <label htmlFor="my-modal-7" 
                        className="btn btn-sm normal-case btn-outline btn-secondary"
                          onClick={() => {
                              if (product?.stock !== 0) {
                                setSelecetedProduct({id: product?.id, 
                                  name : product?.name, 
                                  stock : product?.stock, 
                                  price : product?.sell_price}) 
                              }

                          }}
                        >Tambah</label>
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
      </div>
      
    </>
  )
}
