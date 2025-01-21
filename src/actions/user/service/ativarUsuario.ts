"use server";
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export async function ativarUsuario(id: number) {

  const session = await getServerSession(auth);

  if (!session) {
    return { error: true, message: "Unauthorized" };
  }
 
  const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/user/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    },
    body: JSON.stringify({
      status: true
    })
  })

  const res = await req.json();
  
  if(!req.ok){
    return { error: true, message: res.message};
  }

  return { error: false, message: 'Usuário ativado com sucesso'}
  
}
