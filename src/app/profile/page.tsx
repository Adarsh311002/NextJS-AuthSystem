"use client"
import Link from "next/link";
import React, { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import toast from "react-hot-toast";


export default function ProfilePage(){

    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login')
            
        } catch (error:any) {
            toast.error(error.message);
            console.log(error.message);
        }
    }

    return (
        <div className="flex-col flex justify-center items-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
           
            <p>profile page</p>
            <hr />

            <button 
            onClick={logout}
            className="bg-blue-500 hover:bg-blue-700 mt-4 text-black py-2 px-4 rounded-2xl">
                Logout
            </button>
        </div>
    )
}