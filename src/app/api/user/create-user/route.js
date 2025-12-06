import { NextResponse } from "next/server";
import { apiHandler, createUser } from "../../../../lib/commonApiFunctions";


export const POST = apiHandler(async (request) => {
  const body = await request.json();
  const user = await createUser(body, 1);
  
  // Remove OTP from response for security
  const { otp, otp_expiry_time, password, ...userData } = user;
  
  return NextResponse.json(
    { 
      success: true,  
      message: "User created successfully",
      data: userData 
    }, 
    { status: 201 }
  );
});
