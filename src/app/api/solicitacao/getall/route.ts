import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth_confg";

/**
 * GET /api/solicitacao
 * 
 * Busca todas as solicita es.
 * 
 * @param {string} nome - Nome da solicita o.
 * @param {string} andamento - Andamento da solicita o.
 * @param {string} construtora - Id da construtora.
 * @param {string} empreedimento - Id do empreendimento.
 * @param {string} financeiro - Id do financeiro.
 * @param {string} id - Id da solicita o.
 * @param {string} pagina - P gina da lista.
 * @example = /api/solicitacao/getall?nome=nome&andamento=andamento&construtora=construtora&empreedimento=empreedimento&financeiro=financeiro&id=id&pagina=pagina
 * 
 * @returns {Promise<NextResponse>}
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const nome = searchParams.get("nome");
    const andamento = searchParams.get("andamento");
    const construtora = searchParams.get("construtora");
    const empreedimento = searchParams.get("empreedimento");
    const financeiro = searchParams.get("financeiro");
    const id = searchParams.get("id");
    const pagina = searchParams.get("pagina");

    let Filter = "";
    if (nome) {
      Filter += `nome=${nome}&`;
    }

    if (andamento) {
      Filter += `andamento=${andamento}&`;
    }
    if (Number(construtora) > 0) {
      Filter += `construtora=${construtora}&`;
    }
    if (Number(empreedimento) > 0) {
      Filter += `empreedimento=${empreedimento}&`;
    }
    if (Number(financeiro) > 0) {
      Filter += `financeiro=${financeiro}&`;
    }
    if (Number(id) > 0) {
      Filter += `id=${id}&`;
    }
    if (Number(pagina) > 0) {
      Filter += `pagina=${pagina}`;
    }

    const session = await getServerSession(auth)
    const token = session?.token;

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const expiration = session ? session.expiration : 0;
    const expired = Date.now() > expiration * 1000;

    if (expired) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    const url = Filter ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao?${Filter}` : `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/solicitacao`;

    const user = await fetch(
      url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        cache: "no-store",
      }
    );

    if (!user.ok) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }
    const data = await user.json();

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
