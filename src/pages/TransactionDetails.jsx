import axios from "axios";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import override from "../styles/spinner";
import "moment/locale/id";
import formatRupiah from "../utils/formatRupiah";
import ReactToPrint from "react-to-print";
import structStyles from "../styles/stringStruct";
import styles from "./../styles/struk.module.css";
import StrukPembelian from "../components/StrukPembelian";
moment.locale("id");

function TransactionDetails() {
  const { transaction_id } = useParams();
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef();
  const navigate = useNavigate();

  const handleCancelOrder = async () => {
    try {
      setIsLoading(true);
      const res = await axios
        .delete(`${process.env.REACT_APP_API_HOST}/ofOrders/${transaction_id}`)
        .then((res) => res.data.metadata);
      setIsLoading(false);
      toast.success(`${res?.msg}`);
      setTimeout(() => {
        navigate("/admin/dashboard/transactions");
      }, 2000);
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
  };
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `${process.env.REACT_APP_API_HOST}/ofOrders/${transaction_id}`
        );
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
    };
    getData();
  }, [transaction_id]);

  return (
    <>
      {/* Printed Struct */}
      <div className={styles.con}>
        <div className="con-page" ref={componentRef}>
          <StrukPembelian orders={order} trxId={transaction_id} />
        </div>
      </div>
      {isLoading && (
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
      <div className="flex justify-between items-center">
        <div className="font-bold text-sm">Detail Transaksi</div>
        <div className="font-bold text-xs text-primary">{transaction_id}</div>
      </div>
      <div className="divider my-1"></div>
      <div className="flex flex-col text-[10px]">
        <div className="flex justify-between  opacity-70">
          <div>Nama Kasir</div>
          <div>{order?.order?.User?.name}</div>
        </div>
        <div className="flex justify-between opacity-70">
          <div>Tanggal Transaksi</div>
          <div>
            {moment(order?.order?.createdAt).format("DD MMM YYYY, HH:mm")}
          </div>
        </div>
      </div>
      {/* The button to open modal */}
      {
        order?.order?.status !== 'batal' &&
        <label
          htmlFor="my-modal-6"
          className="btn btn-outline btn-sm mt-6 w-full normal-case rounded"
        >
          Batalkan
        </label>
      }

      {/* Modal*/}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Konfirmasi</h3>
          <p className="py-4">Yakin ingin membatalkan transaksi ini?</p>
          <div className="modal-action">
            <label
              htmlFor="my-modal-6"
              className="btn btn-outline normal-case rounded-lg btn-sm"
            >
              Kembali
            </label>
            <label
              htmlFor="my-modal-6"
              className="btn btn-warning normal-case rounded-lg btn-sm"
              onClick={handleCancelOrder}
            >
              Batalkan
            </label>
          </div>
        </div>
      </div>
      {/* <div className='btn btn-outline btn-sm mt-6 w-full normal-case rounded'>Batalkan</div> */}
      <ReactToPrint
        trigger={() => (
          <div className="btn btn-outline btn-primary btn-sm mt-3 w-full normal-case rounded">
            {" "}
            Cetak Struk
          </div>
        )}
        content={() => componentRef.current}
        pageStyle={structStyles}
      />
      <div className="mt-3">
        <div className="font-bold text-sm">Detail Pembelian</div>
        <div className="divider my-1"></div>
        <div>
          {order?.order_details?.map((elm, idx) => {
            const snap = elm.Snap_product;
            return (
              <div
                className="flex text-xs justify-between border-b border-base-content/30 pb-4 mb-4 "
                key={idx}
              >
                <div className="flex flex-col">
                  <div className="font-bold">{snap?.name}</div>
                  <div className="opacity-70">
                    {`Rp${formatRupiah(snap?.sell_price)} x ${elm?.qty}`}
                  </div>
                </div>
                <div className="flex items-end">
                  <div>Rp{formatRupiah(elm?.sum_price_each)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mt-3 pb-3">
        <div className="flex justify-between font-bold text-sm">
          <div className="font-bold">Total</div>
          <div>Rp{formatRupiah(order?.order?.amount)}</div>
        </div>
        <div className="flex justify-between text-sm opacity-70 mt-1">
          <div className="font-bold">Dibayar</div>
          <div>Rp{formatRupiah(order?.order?.pay_amount)}</div>
        </div>
        <div className="flex justify-between text-sm opacity-70">
          <div className="font-bold">Kembalian</div>
          <div>
            Rp{formatRupiah(order?.order?.pay_amount - order?.order?.amount)}
          </div>
        </div>
      </div>
      <div className="divider"></div>
      {order?.order?.status === "batal" && (
        <div className="flex justify-center">
          <div className="text-4xl">BATAL</div>
        </div>
      )}
    </>
  );
}

export default TransactionDetails;
