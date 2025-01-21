"use client";
import { Button, useToast } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

interface BtRemoverDistratoProps {
  id: number;
}
export default function BtRemoverDistrato({ id }: BtRemoverDistratoProps) {
  const [Loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const { data: session } = useSession();
  const User = session?.user;
  const route = useRouter()

 
  const handleClick = async () => {
    setLoading(true);
    try {
      const Get = await fetch(`/api/solicitacao/get/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const req = await Get.json();

      const res = await fetch(`/api/solicitacao/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          distrato: false,
          distrato_id: null,
          distrato_dt: null,
          logDelete: `${req.logDelete}\nO usuário: ${User?.name}, id: ${
            User?.id
          } Firmou novo acordo para esse registro em: ${new Date().toLocaleDateString(
            "pt-BR"
          )} as ${new Date().toLocaleTimeString("pt-BR")}`,
          obs: req.obs? `${req.obs}\nNovo Acordo firmado em: ${new Date().toLocaleDateString(
            "pt-BR"
          )} as ${new Date().toLocaleTimeString("pt-BR")}` : `Novo Acordo firmado em: ${new Date().toLocaleDateString("pt-BR")} as ${new Date().toLocaleTimeString("pt-BR")}`,
        }),
      });

      if (res.ok) {
        toast({
          title: "Distrato Efetuado",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        // window.location.reload();
        route.refresh()
        setLoading(false);
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: JSON.stringify(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      setLoading(false);
    }
  };

  return (
    <Button
      size={'sm'}
      colorScheme="cyan"
      variant="solid"
      onClick={handleClick}
      isLoading={Loading}
      spinner={<BeatLoader size={8} color="white" />}
    >
      Novo Acordo
    </Button>
  );
}
