'use server'

import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export default async function GetAllSuporteId(id: number) {

  const session = await getServerSession(auth);

  const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/suporte/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${session?.token}`
    }
  })

  const res = await req.json()

  if(!req.ok){
    return { error: true, message: "ERRO Ao buscar suporte", data: null };
  }else{
    return { error: false, message: 'Sucesso', data: res }
  }
}