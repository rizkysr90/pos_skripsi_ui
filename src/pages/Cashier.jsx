import { faClose, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ModalCashier from "../components/ModalCashier";
import { addProduct, resetProduct } from "../features/cashierSlice";
import override from "../styles/spinner";
import formatRupiah from "../utils/formatRupiah";
import useSWR from "swr";

export default function Cashier() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);
  const productsOrdered = useSelector((state) => state.cashier.products);

  const [selectedProduct, setSelecetedProduct] = useState({});
  const handleInputQty = ({ name, originPrice, qty, amount, product_id }) => {
    const payload = {
      name,
      originPrice,
      qty,
      amount,
      product_id,
    };
    dispatch(addProduct(payload));
  };
  const resetSelectedProduct = () => {
    dispatch(resetProduct());
  };
  const api_url_products = `${process.env.REACT_APP_API_HOST}/products?search=${search}&page=${page}&c=${category}`;
  const api_url_category = `${process.env.REACT_APP_API_HOST}/productCategories`;

  const baseFetcher = (url) => axios.get(url).then((res) => res.data.data);
  const {
    data: products,
    error,
    isLoading,
  } = useSWR(api_url_products, baseFetcher);
  const { data: pCategories } = useSWR(api_url_category, baseFetcher);
  let totalBtnPagination = Math.ceil(Number(products?.meta?.count) / 12);

  return (
    <>
      {isLoading && firstLoad && (
        <div className="bg-base-100 fixed z-50 w-full left-0 top-0 right-0 min-h-screen">
          <ClipLoader
            color={"#1eb854"}
            loading={isLoading}
            size={35}
            cssOverride={override}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <input type="checkbox" id="my-modal-7" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="modal-action mt-0 justify-between">
            <h3 className="font-bold text-lg">Mau beli berapa banyak?</h3>
            <label htmlFor="my-modal-7" className="btn btn-ghost btn-sm">
              <FontAwesomeIcon icon={faClose} />
            </label>
          </div>
          <div className="opacity-70">
            <p className="">{selectedProduct?.name}</p>
          </div>
          <input
            type="number"
            placeholder="Masukkan jumlah pembelian"
            className="input w-full input-bordered mt-4"
            value={quantity ? quantity : ""}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <div className="flex justify-end">
            <label
              htmlFor="my-modal-7"
              onClick={() => {
                const payload = {
                  product_id: selectedProduct?.id,
                  name: selectedProduct?.name,
                  originPrice: selectedProduct?.price,
                  qty: Number(quantity),
                  amount: Number(quantity) * selectedProduct?.price,
                };
                handleInputQty(payload);
                setSelecetedProduct({});
                setQuantity("");
              }}
              className="btn btn-secondary  mt-4 w-full normal-case"
            >
              Masukkan ke keranjang
            </label>
          </div>
        </div>
      </div>
      <div className="flex">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setCategory("");
            setFirstLoad(false);
            setSearch(e.target.value);
          }}
          placeholder="Cari Produk"
          className="input input-sm input-bordered rounded w-full"
        />
        <div className="btn btn-ghost btn-sm rounded -ml-10">
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>
      {search ? null : (
        <select
          className="select rounded select-sm mt-4 w-full"
          id="product_category_id"
          name="product_category_id"
          defaultValue={"DEFAULT"}
          onChange={(e) => {
            setPage("");
            setSearch("");
            setCategory(e.target.value);
          }}
        >
          <option disabled value={"DEFAULT"}>
            Pilih Kategori Produk!
          </option>
          {pCategories?.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      )}
      <ModalCashier
        productsOrdered={productsOrdered}
        resetSelectedProduct={resetSelectedProduct}
      />
      {error && <div>Error</div>}
      {products?.products?.length === 0 && (
        <div className="text-center mt-4">Produk tidak ditemukan</div>
      )}

      <div className="mt-8">
        <div className="flex flex-col">
          {products?.products?.map((product, idx) => {
            return (
              <div
                className="flex mb-4 border-b border-base-content/30 pb-4"
                key={idx}
              >
                <Link
                  to={`/admin/dashboard/products/edit/${product?.id}`}
                  className="avatar mr-3"
                >
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={product?.url_img} alt="foto produk" />
                  </div>
                </Link>
                <div className="flex flex-col grow">
                  <div className="text-xs font-bold">{product?.name}</div>
                  <div className="text-xs mt-1">
                    Rp {formatRupiah(product?.sell_price)}
                  </div>
                  <div className="text-xs mt-1">Stok : {product?.stock} </div>
                </div>
                <div className="flex items-center">
                  {product?.stock <= 0 ? (
                    <button className="btn btn-sm btn-secondary btn-disabled normal-case">
                      Kosong
                    </button>
                  ) : (
                    <label
                      htmlFor="my-modal-7"
                      className="btn btn-sm normal-case btn-outline btn-base-100"
                      onClick={() => {
                        if (product?.stock !== 0) {
                          setSelecetedProduct({
                            id: product?.id,
                            name: product?.name,
                            stock: product?.stock,
                            price: product?.sell_price,
                          });
                        }
                      }}
                    >
                      Tambah
                    </label>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center">
          <div className="btn-group ">
            {Array.from({ length: totalBtnPagination }, (_, i) => i + 1)
              //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
              .map((elm) => {
                return (
                  <button
                    className={
                      Number(products?.meta?.page) + 1 === elm
                        ? "btn btn-sm btn-ghost text-primary text-bold"
                        : "btn btn-sm btn-ghost"
                    }
                    onClick={() => setPage(elm)}
                    key={elm}
                  >
                    {elm}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
