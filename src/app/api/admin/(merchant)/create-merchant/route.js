import { apiHandler, createHashPassword, getRoleValueFromRoleName } from "@/lib/commonApiFunctions"
import pool from "@/lib/db"
import { withAuth } from "@/lib/withAuth"
import { NextResponse } from "next/server"

async function createMerchant(request) {

    const { name, email, password, phone, address, company_name, company_number, company_address } = await request.json()

    const role = getRoleValueFromRoleName("merchant")
    const hashedPassword = await createHashPassword(password)   

    const userResult = await pool.query(
        `INSERT INTO users (name, email, password, phone, address, role, created_at, updated_at, isverified) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW(), true) 
       RETURNING id, name, email, phone, address, role, created_at`,
        [name, email, hashedPassword, phone, address, role]
    );
    const userDetails = userResult.rows[0];

    const merchantDetails = await pool.query(`
        Insert into merchant_details (company_name, company_number, company_address, user_id)    
        VALUES ($1, $2, $3, $4) 
    `,[company_name, company_number, company_address, userDetails.id])

    return NextResponse.json({
        message: "Merchant created successfully",
        data : {...userDetails, ...merchantDetails.rows[0]}
    },
        { status: 200 }
    );

}


export const POST = withAuth(apiHandler(createMerchant), ["superadmin", 'admin'])