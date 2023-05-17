import axios from "axios";
import React, { useState } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import OrderDetails from "../components/OrderDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import override from "../styles/spinner";

function OnlineSalesDetails() {
  const { orderId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const fetcher = async (url) =>
    await axios.get(url).then((res) => res.data.data);
  const { data: order, isLoading: loadOrder } = useSWR(
    `${process.env.REACT_APP_API_HOST}/onOrders/${orderId}/admin`,
    fetcher
  );
  const address = order?.shipping_address
    ? order?.shipping_address?.split("^")
    : null;
  const handleCancelOrder = async () => {
    try {
      setIsLoading(true);
      const res = await axios
        .delete(`${process.env.REACT_APP_API_HOST}/onOrders/${orderId}`)
        .then((res) => res.data.metadata);
      setIsLoading(false);
      toast.success(`${res?.msg}`);
      setTimeout(() => {
        window.location.reload(true);
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
  const handleFinish = async () => {
    try {
      setIsLoading(true);
      await axios
        .put(`${process.env.REACT_APP_API_HOST}/onOrders/verify?finish=1`, {
          orderId,
        })
        .then((res) => res.data);
      setIsLoading(false);
      toast.success(`berhasil merubah status pesanan`);
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      let errFromServer = error?.response?.data?.metadata;
      let errMsg = error.message;
      if (error.response?.status !== 500) {
        if (errFromServer?.msg) {
          errMsg = errFromServer?.msg;
        }
      }
      toast.error(`Error ${error?.response?.status} - ${errMsg}`);
    }
  };
  const handlePickup = async () => {
    try {
      setIsLoading(true);
      await axios
        .put(
          `${process.env.REACT_APP_API_HOST}/onOrders/verify?readyPickup=1`,
          { orderId }
        )
        .then((res) => res.data);
      setIsLoading(false);
      toast.success(`berhasil merubah status pesanan`);
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      let errFromServer = error?.response?.data?.metadata;
      let errMsg = error.message;
      if (error.response?.status !== 500) {
        if (errFromServer?.msg) {
          errMsg = errFromServer?.msg;
        }
      }
      toast.error(`Error ${error?.response?.status} - ${errMsg}`);
    }
  };
  const handleOrder = async () => {
    try {
      setIsLoading(true);
      await axios
        .put(`${process.env.REACT_APP_API_HOST}/onOrders/verify?onProcess=1`, {
          orderId,
        })
        .then((res) => res.data);
      setIsLoading(false);
      toast.success(`berhasil mengkonfirmasi pesanan`);
      setTimeout(() => {
        window.location.reload(true);
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      let errFromServer = error?.response?.data?.metadata;
      let errMsg = error.message;
      if (error.response?.status !== 500) {
        if (errFromServer?.msg) {
          errMsg = errFromServer?.msg;
        }
      }
      toast.error(`Error ${error?.response?.status} - ${errMsg}`);
    }
  };
  return (
    <>
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
      {loadOrder && <div className="">Loading...</div>}
      {order && (
        <div className="">
          <OrderDetails order={order} />

          <div className="bg-base-100 p-3 rounded">
            {/* <div className='font-bold text-base mt-3'>Atur Pesanan</div>
                        <div className="divider my-1"></div> */}
            {order?.shipping_address && (
              <a
                href={`https://web.whatsapp.com/send?phone=${address[1]}&text=message&app_absent=0`}
                target={"_blank"}
                rel="noreferrer"
                className="btn btn-outline btn-base-200 normal-case grow w-full"
              >
                Chat dengan pembeli
              </a>
            )}
            {order?.shipping_method === "pickup" &&
              order?.status === "diproses" && (
                <label
                  htmlFor="my-modal-9"
                  className="btn btn-base-200 btn-outline w-full normal-case "
                >
                  Siap dipickup
                </label>
              )}
            {order?.status !== "belum dibayar" &&
              (order?.status === "dibayar" || order?.status === "cod") && (
                <div className="flex mt-3">
                  <label
                    htmlFor="my-modal-6"
                    className="btn btn-outline btn-success normal-case grow"
                  >
                    Batalkan
                  </label>
                  <label
                    htmlFor="my-modal-7"
                    className="btn btn-success text-base-100 normal-case grow ml-4"
                  >
                    Proses Pesanan
                  </label>
                </div>
              )}

            {order?.status !== "belum dibayar" &&
              order?.status !== "cod" &&
              order?.status !== "dibayar" &&
              order?.status !== "selesai" &&
              order?.status !== "batal" && (
                <div className="flex mt-3 ">
                  <label
                    htmlFor="my-modal-6"
                    className="btn btn-outline btn-success normal-case grow"
                  >
                    Konfirmasi Selesai
                  </label>
                </div>
              )}
          </div>
        </div>
      )}
      {order?.status === "batal" && (
        <div className="flex justify-center">
          <div className="text-4xl">BATAL</div>
        </div>
      )}
      {/* Modal */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Konfirmasi Pembatalan</h3>
            <label htmlFor="my-modal-6" className="btn btn-ghost">
              <FontAwesomeIcon icon={faClose} />
            </label>
          </div>
          <p>Yakin untuk membatalkan pesanan ini?</p>
          <div className="modal-action">
            <label
              htmlFor="my-modal-6"
              className="btn normal-case btn-success btn-outline"
            >
              Kembali
            </label>
            <label
              htmlFor="my-modal-6"
              className="btn normal-case btn-warning text-neutral"
              onClick={handleCancelOrder}
            >
              Batalkan
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-7" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Konfirmasi Pesanan</h3>
            <label htmlFor="my-modal-7" className="btn btn-ghost">
              <FontAwesomeIcon icon={faClose} />
            </label>
          </div>
          {order?.pay_method === "transfer" && (
            <div>
              <p className="">
                Cek kembali bukti resi transfer pembayaran dan pastikan produk
                tidak ada yang habis.
              </p>
              <a
                className="text-success underline"
                href={`${order?.evidence_of_tf}`}
                target={"_blank"}
                rel="noreferrer"
              >
                Lihat Resi Pembayaran
              </a>
            </div>
          )}
          <div className="modal-action">
            <label
              htmlFor="my-modal-7"
              className="btn normal-case btn-success btn-outline"
            >
              Kembali
            </label>
            <label
              htmlFor="my-modal-7"
              className="btn normal-case btn-success text-base-100"
              onClick={handleOrder}
            >
              Proses Pesanan
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-9" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Konfirmasi Siap Dipickup</h3>
            <label htmlFor="my-modal-9" className="btn btn-ghost">
              <FontAwesomeIcon icon={faClose} />
            </label>
          </div>
          <p>Pastikan semua produk pesanan dan pembayaran sudah sesuai.</p>
          <div className="modal-action">
            <label
              htmlFor="my-modal-9"
              className="btn normal-case btn-success btn-outline"
            >
              Kembali
            </label>
            <label
              htmlFor="my-modal-9"
              className="btn normal-case btn-success text-base-100"
              onClick={handlePickup}
            >
              Siap dipickup
            </label>
          </div>
        </div>
      </div>
      <input type="checkbox" id="my-modal-9" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg">Konfirmasi Selesai</h3>
            <label htmlFor="my-modal-9" className="btn btn-ghost">
              <FontAwesomeIcon icon={faClose} />
            </label>
          </div>
          <p>
            Pastikan semua produk pesanan dan pembayaran sudah sesuai dan
            penjualan sudah selesai
          </p>
          <div className="modal-action">
            <label
              htmlFor="my-modal-9"
              className="btn normal-case btn-success btn-outline"
            >
              Kembali
            </label>
            <label
              htmlFor="my-modal-9"
              className="btn normal-case btn-success text-base-100"
              onClick={handleFinish}
            >
              Siap dipickup
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default OnlineSalesDetails;
