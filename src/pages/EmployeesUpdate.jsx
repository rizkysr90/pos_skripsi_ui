import axios from "axios";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import override from "../styles/spinner";

export default function EmployeesUpdate() {
  let { userId } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone_number: "",
    role: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const formData = new FormData(form);
    const formJSON = Object.fromEntries(formData.entries());
    try {
      const res = await axios
        .put(`${process.env.REACT_APP_API_HOST}/users/${userId}`, formJSON)
        .then((res) => res.data.metadata);
      setIsLoading(false);
      toast.success(`${res?.msg}`);
      setTimeout(() => {
        navigate("/admin/dashboard/employees");
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
    const getUsersById = async () => {
      try {
        setIsLoading(true);
        let res = await axios
          .get(`${process.env.REACT_APP_API_HOST}/users/${userId}`)
          .then((res) => res.data);
        setEmployee(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log("tess");
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
    getUsersById();
  }, [userId]);
  return (
    <>
      {isLoading && (
        <div className="bg-base-100 absolute z-50 w-full left-0 top-0 min-h-screen">
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
      <div className="mb-20">
        <div className=" text-2xl font-bold text-center text-base-content">
          Edit Pegawai
        </div>
        <form
          onSubmit={handleFormSubmit}
          onReset={() => window.location.reload(true)}
          className="w-full flex flex-col items-center"
        >
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label" htmlFor="name">
              <span className="label-text">Nama</span>
            </label>
            <input
              type="text"
              placeholder="Nama Karyawan"
              id="name"
              name="name"
              className="input input-bordered w-full max-w-xs"
              value={employee?.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label" htmlFor="email">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email Karyawan"
              id="email"
              name="email"
              className="input input-bordered w-full max-w-xs"
              value={employee?.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password akun yang akan dibuat"
              id="password"
              name="password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label" htmlFor="confirm_password">
              <span className="label-text">Konfirmasi Password</span>
            </label>
            <input
              type="password"
              placeholder="Ulangi Password"
              id="confirm_password"
              name="confirm_password"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label" htmlFor="phone_number">
              <span className="label-text">Nomor HP : ( Format +62 )</span>
            </label>
            <input
              type="text"
              name="phone_number"
              id="phone_number"
              placeholder="81283007959"
              className="input input-bordered w-full max-w-xs"
              value={employee?.phone_number}
              onChange={(e) =>
                setEmployee({ ...employee, phone_number: e.target.value })
              }
            />
          </div>
          <div className="form-control w-full max-w-xs mt-4">
            <label className="label">
              <span className="label-text">Hak Akses User</span>
            </label>
            <div className="flex ml-1 items-center">
              <input
                type="radio"
                name="role"
                className="radio radio-xs radio-primary"
                value="admin"
                id="admin"
                onChange={(e) =>
                  setEmployee({ ...employee, role: e.target.value })
                }
                checked={employee?.role === "admin" ? true : false}
              />
              <label className="ml-2 text-xs" htmlFor="admin">
                Admin
              </label>
            </div>
            <div className="flex items-center ml-1 mt-2 mb-4">
              <input
                type="radio"
                name="role"
                className="radio radio-xs radio-primary"
                value="kasir"
                id="kasir"
                onChange={(e) =>
                  setEmployee({ ...employee, role: e.target.value })
                }
                checked={employee?.role === "kasir" ? true : false}
              />
              <label htmlFor="kasir" className="ml-2 text-xs">
                Kasir
              </label>
            </div>
            <button
              type="reset"
              className="btn btn-warning btn-outline normal-case my-4"
            >
              Reset Data
            </button>
            <button
              type="submit"
              className="btn btn-primary text-white normal-case"
            >
              Simpan Data
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
