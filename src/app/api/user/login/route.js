import { apiHandler, loginUser } from "@/lib/commonApiFunctions";
import { NextResponse } from "next/server";

export const POST = apiHandler( async(request) =>{
    const body = await request.json()
    const {email, password} = body
    const user = await loginUser({email ,password} , 1)

     return NextResponse.json(
        { 
          success: true,  
          message: "Login successfully",
          data : user
        }, 
        { status: 200 }
      );
})