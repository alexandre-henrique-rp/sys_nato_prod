"use client";
import { SessionUserType } from "@/types/next-auth";
import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { BeatLoader } from "react-spinners";

interface DropFinanceiroProps {
  value: number;
  Id: number;
  user: SessionUserType.User;
}
export default function DropFinanceiro({ value, Id, user }: DropFinanceiroProps) {
  const hierarquia = user.hierarquia;
  const [Data, setData] = useState<any>([]);
  const [Financeiro, setFinanceiro] = useState<number>(0);
  const [Loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const route = useRouter();
  useEffect(() => {
    if (hierarquia === "ADM") {
      (async () => {
        const req = await fetch("/api/financeira/getall");
        const res = await req.json();
        setData(res);
      })();
    } else {
      const data = user?.Financeira;
      setData(data);
    }
  }, [hierarquia, user?.Financeira]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`/api/solicitacao/update/${Id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          financeiro: Number(Financeiro),
        }),
      });

      if (response.ok) {
        toast({
          title: "Financeira alterado com sucesso",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        route.refresh();
      }
    } catch (error) {
      toast({
        title: "Erro ao alterar o Financeira",
        description: JSON.stringify(error),
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    if (value) {
      setFinanceiro(value);
    }
  }, [value]);

  return (
    <>
      {Loading && <BeatLoader color="#36d7b7" />}
      {Data.length > 1 && (
        <Box>
          <Popover>
            <PopoverTrigger>
              <Button variant="link" colorScheme="gray">
                Alterar Financeira
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Alterar Financeira</PopoverHeader>
              <PopoverBody display={"flex"} gap={3} alignItems={"center"}>
                <Select
                  size={"sm"}
                  borderRadius={"10px"}
                  placeholder="Selecione"
                  name="financeiro"
                  value={Financeiro}
                  onChange={(e) => setFinanceiro(Number(e.target.value))}
                >
                  {Data.map((item: any) => (
                    <option key={item.id} value={Number(item.id)}>
                      {item.fantasia}
                    </option>
                  ))}
                </Select>
                <IconButton
                  icon={<FaPlus />}
                  aria-label={"substituir"}
                  colorScheme={"teal"}
                  size={"sm"}
                  onClick={handleUpdate}
                />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Box>
      )}
    </>
  );
}
