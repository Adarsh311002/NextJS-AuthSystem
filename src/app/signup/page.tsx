"use client"
import Link from "next/link";
import React, { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import axios, { Axios } from "axios";
import toast from "react-hot-toast";

export default function SignUpPage () {

    const router = useRouter();

    const [user,setUser] = useState({
        email:"",
        password:"",
        username:""   
    })

    const [buttonDisabled,setButtonDisabled] = useState(false);

    const [loading , setLoading] = useState(false);

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    },[user])

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("api/users/signup", user);
            console.log("signup success" , response.data);
            router.push("/login");
        } catch (error:any) {
            console.log("signup failed" , error.message);

            toast.error(error.message)
        } finally {
            setLoading(false);
        }       
    }
    return (
       <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
            {loading ? "Processing" : "SignUp" }
            <div>
                <label htmlFor="username">UserName: </label>
            <input className="p-2 bg-amber-50 text-black rounded-2xl my-4 "
             type="text"
             placeholder="enter username"
             onChange={(e) => setUser({...user,username:e.target.value})}
             value={user.username}
             />
            </div>
            
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
              
              onClick={onSignup} 
              className="p-2 bg-green-600 rounded-xl w-[100px] hover:bg-orange-800">{buttonDisabled ? "No SignUp" : "SignUp"}</button>

              <Link className="m-4 hover:text-green-700" href="/login">visit login page</Link>
        </div>
    )
}