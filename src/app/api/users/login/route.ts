import {connect} from "@/dBConfig/db"
import User from "@/models/userModel"
import { NextResponse,NextRequest } from "next/server"
import bcrypt from "bcryptjs"

import jwt from "jsonwebtoken"

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        
        console.log(reqBody);

        //check if user exist 
        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                error : "User doesn't exist"
            }, {status:400})
        }
        
        //validate password

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            NextResponse.json({
                error : "Invalid Password"
            },{status: 400})
        }

        //create token data

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //create token 
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET as string, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response;


    } catch (error:any) {
        return NextResponse.json({
            error: error.message
        }, {status: 500})
    }
}
