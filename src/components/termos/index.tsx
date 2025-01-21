"use client";
import getUserID from "@/actions/termos/service/getUserID";
import UpdateTermos from "@/actions/termos/service/updateTermos";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Text,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Flex,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiFileText } from "react-icons/fi";
import { useToast } from "@chakra-ui/react"; 

export default function TermosPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const [check, setCheck] = useState(false);
  const toast = useToast(); 

  const termosAceitos = session?.user.termos;
  const idUser = Number(session?.user.id)

  useEffect(() => {
    
    if (!termosAceitos) {
      (async () => {
        const request = await getUserID(idUser);
       if (!request?.termos){
         onOpen();
       };
      })()
    }
  }, [onOpen, termosAceitos, idUser]);

  const handleCheckboxChange = (e: any) => {
    setCheck(e.target.checked);
  };

  const handleSubmit = async () => {
    const data = await UpdateTermos(idUser, check)
    if(data.error){
      toast({
        title: "Erro!",
        description: data.message,
        status: "error",
        duration: 5000
      })
    }else{
      toast({
        title: "Política de Privacidade e Termos de uso Aceito!",
        description: data.message,
        status: "success",
        duration: 5000
    })
  }
}

  return (
    <Modal
      isCentered
      onClose={onClose}
      isOpen={isOpen}
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
      closeOnEsc={false} 
    >
      <ModalOverlay 
      backdropFilter="blur(10px)" 
      bg="rgba(0, 0, 0, 0.4)" 
      />
      <ModalContent p={6}>
        <Flex
          flexDirection={"column"}
          gap={2}
          alignItems={"center"}
          textAlign={"center"}
        >
          <ModalHeader fontSize={"2xl"}>
            Política de Privacidade <br /> e Termos de uso
          </ModalHeader>
          <Text fontSize={"sm"}>
            Para continuar utilizando nossos serviços é necessário aceitar
            nossos termos de uso e política de privacidade.
          </Text>
          <FiFileText size={"50px"} />
          <Flex flexDirection={"column"}>
            <Link href="/termos/uso" color={"blue"} isExternal>
              Política de Privacidade
            </Link>
            <Link href="/termos/privacidade" color={"blue"} isExternal>
              Termos de uso
            </Link>
          </Flex>
          <ModalBody>
            <Checkbox
              size="lg"
              colorScheme="green"
              onChange={handleCheckboxChange}
              isChecked={check}
            >
              <Text fontSize={'sm'}>
                Declaro que li e aceito as Políticas de Privacidade e Termos de Uso.
              </Text>
            </Checkbox>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => {onClose(); handleSubmit(); }} isDisabled={!check}>
              Aceitar e Continuar
            </Button>
          </ModalFooter>
        </Flex>
      </ModalContent>
    </Modal>
  );
}
