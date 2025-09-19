"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Axios } from "axios";


export default function loginPage () {
     const [user,setUser] = useState({
            email:"",
            password:"",
            
        })

        const onLogin = () => {

        }

    return (
         <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            Login
         
            
            <div>
             <label htmlFor="email">Email: </label>
            <input  className="p-2 bg-amber-50 text-black rounded-2xl my-4"
             type="email"
             placeholder="enter email"
             onChange={(e) => setUser({...user,email:e.target.value})}
             value={user.email}
             />
             </div>

             <div>
             <label htmlFor="password">password: </label>
            <input  className="p-2 bg-amber-50 text-black rounded-2xl my-4"
             type="password"
             placeholder="enter password"
             onChange={(e) => setUser({...user,password:e.target.value})}
             value={user.password}
             />
             </div>

             <button
              
              onClick={onLogin} 
              className="p-2 bg-green-600 rounded-xl w-[100px] hover:bg-orange-800">SignUp</button>

              <Link className="m-4 hover:text-green-700" href="/signup">visit login page</Link>
        </div>
    )
}