import { BotaoRetorno } from "@/components/botoes/btm_retorno";
import { auth } from "@/lib/auth_confg";
import { Box, Text } from "@chakra-ui/react";
import { getServerSession } from "next-auth";

interface CardHeaderProps {
  SetDados: solictacao.SolicitacaoGetType;
}

export async function CardHeader({ SetDados }: CardHeaderProps) {
  const session = await getServerSession(auth);
  const user = session?.user;
  const input = user?.hierarquia;

  const dataCreated =
    SetDados.createdAt &&
    SetDados.createdAt.split("T")[0].split("-").reverse().join("/");

  const horaCreated =
    SetDados.createdAt &&
    SetDados.createdAt.split("T")[1].split(".")[0].split(":").join(":");

  const dataAprovacao =
    SetDados.dt_aprovacao &&
    SetDados.dt_aprovacao.split("T")[0].split("-").reverse().join("/");

  const horaAprovacao =
    SetDados.hr_aprovacao &&
    SetDados.hr_aprovacao.split("T")[1].split(".")[0].split(":").join(":");

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <BotaoRetorno rota="/" />
        <Box>
          <Text fontSize={{ base: "sm", md: "md" }}>
            Criado: {`${dataCreated}, ${horaCreated}`}
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }}>
            Aprovação:
            {SetDados.dt_aprovacao && ` ${dataAprovacao}, ${horaAprovacao}`}
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }}>Id: {SetDados.id}</Text>
        </Box>
        <Box alignItems="center" textAlign={{ base: "center", md: "left" }}>
          <Text fontSize={{ base: "lg", md: "2xl" }}>Dados Pessoais</Text>
          {input !== "USER" && (
            <Text fontSize={{ base: "sm", md: "md" }}>
              Corretor: {SetDados.corretor && SetDados.corretor?.nome}
            </Text>
          )}
        </Box>
      </Box>
    </>
  );
}
