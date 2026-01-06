import { apiHandler, throwError } from "@/lib/commonApiFunctions";
import pool from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextResponse } from "next/server";

const deleteCategory = async (request,{params}) => {
    const {id} = await params

    if(!id){
        throwError("Id is required")
    }

     const checkCategory = await pool.query(
        `Select * from Categories where id = $1`
        ,[id]
    )

    if (checkCategory?.rows?.length == 0) {
        throwError("Category not found")
    }

    await pool.query(
        `DELETE FROM categories WHERE id = $1`,
        [id]
    );



    return NextResponse.json(
        { message: "Category deleted successfully" },
        { status: 200 })
}

export const GET = withAuth(apiHandler(deleteCategory), ["merchant"])