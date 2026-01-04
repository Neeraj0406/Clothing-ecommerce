import { apiHandler, throwError } from "@/lib/commonApiFunctions";
import pool from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextResponse } from "next/server";


async function approveMerchantRequest(request) {
    const { id } = await request.json()

    if (!id) {
        throwError("Id not found")
    }

    let merchantDetails = await pool.query(
        `Select * from users where id = $1`,
        [id]
    )   

    if(merchantDetails.rows?.length == 0){
       throwError("Merchant not found")
    }

    const updatedUsers = await pool.query(
        `update users 
         Set verified_merchant = true
         where id = $1
         RETURNING *
        `, [id]
    )
    

    console.log("updatedUsers.rows[0]",updatedUsers.rows[0])
    return NextResponse.json(
        {
            data : updatedUsers.rows[0],
            message : "Merchant approved successfully",
        },
        {success : true}
    )

}

export const POST = withAuth(apiHandler(approveMerchantRequest), ['admin', 'superadmin'])