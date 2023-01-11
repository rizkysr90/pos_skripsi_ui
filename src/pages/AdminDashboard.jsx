import React, { useEffect, useState  } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import { Drawer } from '../components/Drawer';
import { BottomNav } from '../components/BottomNav';
import { Navbar } from '../components/Navbar';

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
    useEffect(() => {
        const verifyUser = async () => {
            try {
                setisLoading(true);
                await axios.get('http://localhost:8080/getAdmin');
                setisLoading(false);
            } catch (error) {
                setisLoading(false);
                navigate('/')
            }
        }
        verifyUser()
    }, [])
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
            <div className=' bg-base-200'>
                {/* <Navbar/> */}
                <Drawer/>
                {/* <BottomNav/> */}
            </div>
        }
        
    </>
  )
}
