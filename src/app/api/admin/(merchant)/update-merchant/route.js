const updateMerchant = async (request) =>{
    
}

export const POST = withAuth(apiHandler(updateMerchant) , ["superadmin", 'admin']) 