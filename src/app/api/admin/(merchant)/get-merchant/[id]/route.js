import { apiHandler } from "@/lib/commonApiFunctions"
import pool from "@/lib/db"
import { withAuth } from "@/lib/withAuth"
import { NextResponse } from "next/server"

const getMerchant = async (request, {params} ) => {

    const {id} = await params
    const merchantDetails = await pool.query(`
            Select u.*, m.* from users u
            inner join merchant_details m
            on u.id = m.user_id
            where u.role = 2 And u.id = $1
        `, [id])

    if(!merchantDetails?.rows[0]){
        return NextResponse.json(
            { message: "Merchant not found" },
            { status: 404 }
        );
    }
    return NextResponse.json({
        message: "success",
        data: merchantDetails.rows[0],
    });

}


export const GET = withAuth(apiHandler(getMerchant) , ["superadmin", 'admin'])