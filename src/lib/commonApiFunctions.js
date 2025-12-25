import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

import pool from "@/lib/db"; 

// Helper function to throw errors consistently
export const throwError = (message, code = 400) => {
  const error = new Error(message);
  error.status = code;
  throw error;
};

export const allRoles = [
  {id : 1, name : 'customer'},
  {id : 2, name : 'merchant'},
  {id : 3, name : 'admin'},
  {id : 4, name : 'superadmin'}
]

export const getRoleNameFromRoleValue = (roleId) =>{
  return allRoles.find((role) => role.id == roleId)?.name || ""
}

export const getRoleValueFromRoleName = (roleName) =>{
  return allRoles.find((role) => role.name == roleName)?.id || ""
} 

export function apiHandler(fn) {
  return async function (request, context) {
    try {
      return await fn(request, context);
    } catch (error) {   
      console.error("API Handler Error:", error);
      
      const status = error.status || 500;
      const message = error.message
      
      return NextResponse.json(
        { 
          success: false, 
          error: message 
        }, 
        { status: Number(status) }
      );
    }
  };
}

export const createHashPassword = async(password) =>{
      return await bcrypt.hash(password, 10);
}

// User creation function
export async function createUser(data, role) {
  const client = await pool.connect();
  
  try {
    const { name, email, password, phone, address } = data;
    
    // Validate required fields
    if (!role) {
      throwError("Role is required", 400);
    }
    if (!email) {
      throwError("Email is required", 400);
    }
    if (!password) {
      throwError("Password is required", 400);
    }
    
    // Check if user already exists
    const findUser = await client.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );
    
    if (findUser.rows.length > 0) {
      throwError("Email already exists", 400);
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Generate OTP and expiry (5 minutes from now)
    const otp = (Math.floor(Math.random() * 1000_000)).toString().padStart(6, "0");
    const otpExpireTime = new Date(Date.now() + (5 * 60 * 1000));

    console.log("name, email, hashedPassword, phone, address, otp, otpExpireTime, role",name, email, hashedPassword, phone, address, otp, otpExpireTime, role)
    
    // Insert user
    const result = await client.query(
      `INSERT INTO users (name, email, password, phone, address, otp, otp_expiry_time, role, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) 
       RETURNING id, name, email, phone, address, role, created_at`,
      [name, email, hashedPassword, phone, address, otp, otpExpireTime, role]
    );

    
    console.log(`OTP for ${email}: ${otp}`);
    
    return result.rows[0];
    
  } finally {
    client.release();
  }
}


export const loginUser = async(data , role)=>{
  const {email, password} = data

  if(!role){
    throwError("Role is missing", 400)
  }

  if(!email){
    throwError("Email is required" , 400)
  }
  if(!password){
    throwError("Password is required" , 400)
  }

  const foundUser = await pool.query(
    `Select * from users where email=$1 And role=$2`, [email, role]
  )

  const user = foundUser.rows[0]

  if(!user){
    throwError("Invalid credentails", 400)
  }

  if(!user.is_active ){
    throwError("Your account has been suspended")
  }

  

  const passwordMatched = await bcrypt.compare(password, foundUser.rows[0].password)

  const tokenPayload = {
    id : user.id,
    role : role
  }

  const token = await jwt.sign(tokenPayload, process.env.JWT_SECRET,{
    expiresIn : "24h"
  })


  if(!passwordMatched){
    throwError("Invalid credentails", 400)
  }
  
  return {...user , token}
}