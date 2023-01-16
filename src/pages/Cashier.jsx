import axios from 'axios';
import React, { useEffect, useState } from 'react' 
import { BeatLoader } from 'react-spinners';

export default function Cashier() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
        <BeatLoader
            color={'#6419E6'}
            loading={isLoading}
            cssOverride={override}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
        /> 
      <div>Cashier</div>
      <div className='mt-8'>
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Nama Produk</th>
                  <th>Kategori</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  products?.map((product, idx) => {
                    return(

                    <tr key={product.id}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img src={product?.url_img} alt="foto produk" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{product?.name}</div>
                            <div className="text-sm opacity-50">Stok : {product?.stock}</div>
                          </div>
                        </div>
                      </td>
                      <td>Rp{product?.sell_price}</td>
                      <th className= 'flex justify-end'>
                        <div className='btn btn-primary'>
                            Tambah Ke Keranjang
                        </div>
                      </th>
                    </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
      </div>
    </>
  )
}
