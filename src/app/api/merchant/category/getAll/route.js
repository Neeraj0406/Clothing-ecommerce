import { apiHandler, throwError } from "@/lib/commonApiFunctions";
import pool from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextResponse } from "next/server";

const getAllCategory = async (request) => {
    const {page, limit, search} = await request.json()

    const values = []
    let paramIndex = 1
    
    let allCategoryQuery = `Select * from categories`
    if(search?.length > 0){
        values.push(`%${search}%`)
        allCategoryQuery += ` where name ILIKE $${paramIndex}`
        paramIndex++
    }

    values.push(limit)
    allCategoryQuery += ` limit $${paramIndex}`
    paramIndex++

    values.push((page - 1) * limit)
    allCategoryQuery += ` offset $${paramIndex}`
    paramIndex++

    let data = await pool.query(allCategoryQuery, values)
    return NextResponse.json({status  :200, message : "All Category lists", data : data.rows} )

}

export const POST = withAuth(apiHandler(getAllCategory), ["merchant"])