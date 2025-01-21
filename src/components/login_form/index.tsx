"use client";

import {
  Input,
  FormControl,
  FormLabel,
  Button,
  useToast,
  Flex,
  CircularProgress
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SenhaComponent } from "../Senha";

export const FormLogin = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handlesubmit = async () => {
    setLoading(true);
    const res: any = await signIn("credentials", {
      email: username,
      password: password,
      redirect: false
    });
    if (res.status !== 200) {
      setLoading(false);
      toast({
        title: "Erro!",
        description: "Usuario ou senha inválidos",
        status: "error",
        duration: 5000
      });
    } else {
      router.replace("/");
    }
  };

  if (loading) {
    return (
      <Flex
        w={"100%"}
        h={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CircularProgress
          size="10rem"
          p={10}
          isIndeterminate
          color="green.300"
        />
      </Flex>
    );
  }
  return (
    <>
      <FormControl>
        <FormLabel>Usuario</FormLabel>
        <Input
          type="text"
          size={"lg"}
          border={"1px solid #b8b8b8cc"}
          textTransform={"uppercase"}
          onChange={(e: any) => setUsername(e.target.value.toUpperCase())}
          value={username}
        />
        <FormLabel> Senha</FormLabel>
        <SenhaComponent
          setvalue={password}
          onvalue={(e: any) => setPassword(e)}
          envClick={handlesubmit}
        />
      </FormControl>
      <Button
        mt={5}
        mb={5}
        variant="outline"
        width="250px"
        height="50px"
        maxWidth="100%"
        border={"1px solid #b8b8b8cc"}
        textColor={"Black"}
        onClick={handlesubmit}
      >
        ACESSAR
      </Button>
    </>
  );
};
