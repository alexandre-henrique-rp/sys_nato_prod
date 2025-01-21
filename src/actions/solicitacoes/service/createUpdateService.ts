'use server'
import { SuporteTagsOptions } from "@/data/suporte"
import { auth } from "@/lib/auth_confg";
import { getServerSession } from "next-auth";

export async function createSuportAlert(id: number, descricao: string, tags: number, urlFinal: any) {
    const tagObj = SuporteTagsOptions.find((tag) => tag.id === tags)
    const tag = tagObj ? tagObj.label : ''

    const session = await getServerSession(auth);

    const req = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/suporte`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.token}`
        },
        body: JSON.stringify({
            solicitacao: id,
            tag: tag,
            deescricao: descricao,
            urlSuporte: JSON.stringify(urlFinal)
        })
    })

    const res = await req.json()

    if(!req.ok){
        return { error: true, message: res.message, data: null }
    }

    return { error: false, message: "Suporte criado com sucesso", data: res }

}
