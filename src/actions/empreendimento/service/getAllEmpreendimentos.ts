import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export default async function GetAllEmpreendimento(){

    const session = await getServerSession(auth);

    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/empreendimento`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        }
    })

    const res = await req.json();
    
    if(!req.ok){
        return { status: 500, message: "ERRO", data: null };
    }

    return {status:200, message: "sucess", data: res}

}