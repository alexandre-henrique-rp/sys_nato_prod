'use server'
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export default async function CreateConstrutora(_: any, data: FormData) {
try{ 

    const cnpj = data.get("cnpj") as string;
    const razaosocial = data.get("razaosocial") as string;
    const tel = data.get("telefone") as string;
    const email = data.get("email") as string;
    const fantasia = data.get("fantasia") as string;
    const financeiro = '[]'
    const atividade = 'CONST'

            const body = {
                cnpj,
                razaosocial,
                fantasia,
                tel,
                email,
                financeiro,
                atividade
            }
            const session = await getServerSession(auth);
    
            if (!session) {
                return NextResponse.json(
                    { message: "Unauthorized" },
                    { status: 401 }
                );   
            }
    
            const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/construtoras`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.token}`
                },
                body: JSON.stringify(body),
            })
    
            const result = await res.json();
    
            if (!res.ok) {
                return { error: true, message: "Erro ao cadastrar construtora", data: result }
            }
    
            return { error: false, message: "Construtora cadastrada com sucesso", data: null }
            
        }catch (error: any) {
            console.error("Erro ao criar chamado:", error);
            return { error: true, message: "Erro ao cadastrar construtora", data: error }
        }

}
