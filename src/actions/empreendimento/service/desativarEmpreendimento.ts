"use server";

import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export async function DesativarEmpreendimento(id: string) {

  const session = await getServerSession(auth);

  if (!session) {
    return { error: true, message: "Unauthorized" };
  }

  const req =  await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/empreendimento/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    }
  })

  const res = await req.json();

  if(!req.ok){
    return { error: true, message: "ERRO Ao Atualizar Empreendimento" };
  }

  if(req.ok){
    return { error: false, message: "Sucesso ao Atualizar Empreendimento", data: res };
  }

}
