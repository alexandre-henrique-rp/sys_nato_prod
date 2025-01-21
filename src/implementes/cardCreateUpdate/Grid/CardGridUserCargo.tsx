import React from "react";
import { Box, BoxProps, FormLabel } from "@chakra-ui/react";
import { SelectUserCargo } from "../dropdow/selectUserCargo";

interface CardGridUserCargoProps extends BoxProps {
  UserCargo?: string | any;
}

export function CardGridUserCargo({
  UserCargo,
  ...props
}: CardGridUserCargoProps) {
  return (
    <>
      <Box {...props}>
        <FormLabel fontSize="sm" fontWeight="md" m={0}>
          Cargo
        </FormLabel>
        <SelectUserCargo setValue={UserCargo} />
      </Box>
    </>
  );
}
