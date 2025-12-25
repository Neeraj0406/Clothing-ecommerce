import { apiHandler } from "@/lib/commonApiFunctions"
import pool from "@/lib/db"
import { withAuth } from "@/lib/withAuth"
import { NextResponse } from "next/server"

const getAllMerchantList = async(req) => {
    const {limit, page, search} = await req.json()
   
    const offset = (page - 1) * limit
    const values = []
    let paramIndex = 1

    let allMerchantquery = `
        Select u.*, m.* from users u
        inner join merchant_details m
        on u.id = m.user_id
        where role = 2 
    `
    
    if(search?.length > 0){
        values.push(`%${search}%`)
        allMerchantquery += `And (name ILIKE $${paramIndex} Or email ILIKE $${paramIndex})`
        paramIndex++
    }
    values.push(limit)
    allMerchantquery += ` limit  $${paramIndex}`
    paramIndex++
    
    allMerchantquery += ` offset $${paramIndex}`
    values.push(offset)

    let data = await pool.query(allMerchantquery , values);
    
    return NextResponse.json({status  :200, message : "All merchant lists", data : data.rows} )

}

export const POST = withAuth(apiHandler(getAllMerchantList), ["superadmin", 'admin'])