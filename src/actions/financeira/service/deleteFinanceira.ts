'use server'
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export async function DeleteFinanceira(id: string) {

  const session = await getServerSession(auth);
  
  if(!session){
    return { error: true, message: "Unauthorized", status: 401 };
  }

  const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/financeiro/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    }
  })

  if(!req.ok){
    return { error: true, message: "ERRO Ao Atualizar Financeira", status: 500 };
  }
  
  if(req.ok){
    return { error: false, message: "Sucesso ao Atualizar Financeira", status: 200 };
  }

}
