import { apiHandler } from "@/lib/commonApiFunctions"
import { withAuth } from "@/lib/withAuth"
import { NextResponse } from "next/server"

async function createMerchant(request, ctx){
    return NextResponse.json({
      message: "Merchant created successfully",
    },
    { status: 200 }
  );

}


export const POST = withAuth(apiHandler(createMerchant), ["superadmin",'admin'])