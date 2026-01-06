import { apiHandler, throwError } from "@/lib/commonApiFunctions";
import pool from "@/lib/db";
import { withAuth } from "@/lib/withAuth";
import { NextResponse } from "next/server";

const createCategory = async (request) => {
    const { name } = await request.json()

    if (!name || name.trim().length === 0) {
        throwError("Name is required")
    }

    const checkCategory = await pool.query(
        `Select * from categories where name = $1`
        , [name]
    )

    if (checkCategory?.rows?.length > 0) {
        throwError("Category already present")
    }

    await pool.query(
        `Insert into categories (name) values ($1)`
        , [name]
    )


    return NextResponse.json(
        { message: "Category Created successfully" },
        { status: 200 })
}

export const POST = withAuth(apiHandler(createCategory), ["merchant"])