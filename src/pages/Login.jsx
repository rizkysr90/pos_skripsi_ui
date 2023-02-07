import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, reset } from "../features/authSlice";
import { ToastContainer, toast } from 'react-toastify';
import  ClipLoader  from 'react-spinners/ClipLoader';
import override from '../styles/spinner';

export const Login = () => {
    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );
    const handleAuth = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {
            email: formData.get("email"),
            password: formData.get("password"),
        };
        dispatch(loginUser(obj))
    }
    
    useEffect(() => {
        if (user) {
            navigate("/admin/dashboard");
        }
        if (isError) {
            toast.error(message);
            dispatch(reset());
        }
        if (isSuccess && !user ) {
            toast.error('Internal server error');
            dispatch(reset());

        }
    }, [user, isSuccess, isError, message, dispatch, navigate]);
    return (
        <>
            {
                isLoading &&
                <div className='bg-base-100 absolute z-50 w-full min-h-screen'>
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
            <div className="hero min-h-screen bg-base-200 text-base-content">

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
                <div className="hero-content flex-col ">
                    <div className="text-center ">
                        <h1 className="text-5xl font-bold">Login</h1>
                        <p className="py-6">Hanya untuk penggunaan internal.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body"
                            onSubmit={handleAuth}>
                            <div className="form-control">
                                <label className="label" htmlFor='email'>
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text"
                                    name="email" 
                                    id="email" 
                                    placeholder="Masukkan email" 
                                    className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label" htmlFor='password'>
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" 
                                    placeholder="Masukkan password" 
                                    name='password' 
                                    id="password" 
                                    className="input input-bordered" />
                                {/* <label className="label">
                                    <Link to="/" className="label-text-alt link link-hover">Forgot password?</Link>
                                </label> */}
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary normal-case">{isLoading ? "Loading..." : "Login"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
