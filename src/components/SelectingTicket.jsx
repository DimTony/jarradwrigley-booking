import React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import TicketSelectionForm from "./TicketSelectionForm";
import { countries } from "../utils/constants";

const SelectingTicket = ({ formData, updateFormData, nextStep }) => {
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const addTicket = () => {
    updateFormData({
      tickets: [
        ...formData.tickets,
        { id: formData.tickets.length, type: "", count: 0 },
      ],
    });
  };

  const removeTicket = (index) => {
    updateFormData({
      tickets: formData.tickets.filter((_, i) => i !== index),
    });
  };

  const updateTicket = (index, type, count) => {
    updateFormData({
      tickets: formData.tickets.map((ticket, i) =>
        i === index ? { ...ticket, type, count } : ticket
      ),
    });
  };

  const isFormValid = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "homeAddress",
      "city",
      "state",
      "postcode",
      "country",
    ];
    const areRequiredFieldsFilled = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );
    const isAnyTicketSelected = formData.tickets.some(
      (ticket) => ticket.count > 0 && ticket.type !== ""
    );
    return areRequiredFieldsFilled && isAnyTicketSelected;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      nextStep();
    } else {
      toast({
        title: "Form Incomplete",
        description:
          "Please fill all required fields and select at least one ticket.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ width: "100%", height: "fit-content" }}>
      <HStack
        w="99%"
        alignItems="flex-start"
        px="1rem"
        pb="0.5rem"
        h="fit-content"
        mb="2rem"
        gap="2.5rem"
      >
        <VStack w="50%" alignItems="flex-start" h="fit-content">
          <TicketSelectionForm
            tickets={formData.tickets}
            onAddTicket={addTicket}
            onRemoveTicket={removeTicket}
            onUpdateTicket={updateTicket}
          />
          <FormControl isRequired>
            <Text fontWeight="700">
              Where should we send your booking confirmation?
            </Text>
            <FormLabel>Email address:</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              bg="whitesmoke"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>First Name:</FormLabel>
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              bg="whitesmoke"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Last Name:</FormLabel>
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              bg="whitesmoke"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel htmlFor="country">Select Country</FormLabel>
            <Select
              id="country"
              name="country"
              placeholder="Choose a country"
              value={formData.country}
              onChange={handleInputChange}
              bg="whitesmoke"
            >
              {countries.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </VStack>
        <VStack w="50%" alignItems="flex-start" h="100%">
          <FormControl isRequired>
            <FormLabel>Phone Number:</FormLabel>
            <Input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              bg="whitesmoke"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Home Address:</FormLabel>
            <Input
              type="text"
              name="homeAddress"
              value={formData.homeAddress}
              onChange={handleInputChange}
              bg="whitesmoke"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>City:</FormLabel>
            <Input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              bg="whitesmoke"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>State:</FormLabel>
            <Input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              bg="whitesmoke"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Postcode:</FormLabel>
            <Input
              type="text"
              name="postcode"
              value={formData.postcode}
              onChange={handleInputChange}
              bg="whitesmoke"
            />
          </FormControl>
        </VStack>
      </HStack>
      <HStack w="100%" justifyContent="center" mb="1rem">
        <Button type="submit" w="20%" isDisabled={!isFormValid()}>
          Next Step
        </Button>
      </HStack>
    </form>
  );
};

export default SelectingTicket;
