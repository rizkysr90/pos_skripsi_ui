import React, { useEffect, useState  } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import { Drawer } from '../components/Drawer';
import useSWR from 'swr';
import { useDispatch, useSelector } from "react-redux";
import {  reset } from "../features/authSlice";



const override = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    minHeight: "100%",
    margin: "0 auto",
  };
export const AdminDashboard = () => {
    
    
    // const [isError, setIsError] = useState('false');
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate();
    const checkLoginFetcher = async (url) => await axios.get(url);
    const {error : IsUnauthorized} = useSWR(`${process.env.REACT_APP_API_HOST}/getAdmin`, checkLoginFetcher);
    const dispatch = useDispatch();

    useEffect(() => {
        if (IsUnauthorized) {
            dispatch(reset())
            navigate('/');
        }
    }, [IsUnauthorized])
  return (
    <>
        {isLoading ?  
            <BeatLoader
                color={'#6419E6'}
                loading={isLoading}
                cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
            /> :
                <Drawer/>
        }
        
    </>
  )
}
