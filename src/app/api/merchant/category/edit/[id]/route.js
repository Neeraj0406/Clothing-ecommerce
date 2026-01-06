import { apiHandler, throwError } from "@/lib/commonApiFunctions";
import pool from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextResponse } from "next/server";

const editCategory = async(request ,{params}) =>{
    const {name} = await request.json()
    const {id} = await params
    if(!id){
        throwError("Id is required")
    }

    if(name?.trim()?.length == 0){
        throwError("Name is required")
    }

    const checkCategory = await pool.query(
        `Select * from Categories where id != $1 and name = $2`
        ,[id, name]
    )

    if(checkCategory?.rows?.length > 0){
        throwError("Category name already taken")
    }

    const updatedCategory = await pool.query(
        `UPDATE categories
        SET name = $1,
            updated_at = $2
        WHERE id = $3
        RETURNING *`,
                [name, new Date(), id]
        );



    return NextResponse.json(
        {message : "Category udpated successfully", data : updatedCategory?.rows[0]},
        {status : 200})
}

export const POST = withAuth(apiHandler(editCategory), ["merchant"])