import React, { useState } from "react";
import {
  Box,
  Spinner,
  VStack,
  Text,
  useToast,
  Stack,
  HStack,
  Button,
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { IoIosArrowForward } from "react-icons/io";
import SelectingTicket from "../components/SelectingTicket";
import Payment from "../components/Payment";
import Validation from "../components/Validation";
import ThankYou from "../components/ThankYou";

const Landing = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Initialize with empty values for all fields across all steps
    // Step 1 (SelectingTicket) data
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    homeAddress: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    tickets: [],
    // Step 2 (Payment) data
    paymentMethod: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    // Step 3 (Validation) data
    // Add any additional fields needed for validation
  });

  const isSelectingTicketActive =
    step === 1 || step === 2 || step === 3 || step === 4;

  const isPaymentActive = step === 2 || step === 3 || step === 4;

  const isValidationActive = step === 3 || step === 4;

  const isThankYouActive = step === 4;

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  const handleSubmit = async () => {
    try {
      // Send data to backend
      const response = await fetch("/api/submit-booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        nextStep(); // Move to Thank You step
      } else {
        // Handle error
        console.error("Submission failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SelectingTicket
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <Payment
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Validation
            formData={formData}
            updateFormData={updateFormData}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
          />
        );
      case 4:
        return <ThankYou />;
      default:
        return (
          <SelectingTicket
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
          />
        );
    }
  };

  return (
    <>
      <Box p="0.5rem" w="100vw" h="100vh">
        <VStack alignItems="flex-start" w="100%" h="100%" overflow="hidden">
          <Navbar />
          <Stack justifyContent="center" alignItems="center" h="20dvh" w="100%">
            <Text fontSize="5vw" fontWeight="700">
              <span style={{ color: "#0094ff" }}>JARRAD WRIGLEY</span> TICKETS
            </Text>
          </Stack>

          <Stack alignItems="center" justifyContent="center" w="100%" h="100%">
            <HStack
              color="#888"
              fontWeight="500"
              bg="#000000"
              p="1rem"
              position="relative"
              top="10%"
              zIndex="2"
              borderRadius="1rem"
            >
              <HStack>
                <Text
                  bg={isSelectingTicketActive ? "#fff" : "transparent"}
                  borderRadius="50%"
                  w="2rem"
                  h="2rem"
                  textAlign="center"
                  fontSize="1.3rem"
                  color={isSelectingTicketActive ? "#000" : "#888"}
                  border="1px solid #888"
                >
                  1
                </Text>

                <Text color={isSelectingTicketActive ? "#fff" : "#888"}>
                  SELECTING TICKET
                </Text>

                <IoIosArrowForward
                  color={isSelectingTicketActive ? "#fff" : "#888"}
                />
              </HStack>
              <HStack>
                <Text
                  bg={isPaymentActive ? "#fff" : "transparent"}
                  borderRadius="50%"
                  w="2rem"
                  h="2rem"
                  textAlign="center"
                  fontSize="1.3rem"
                  color={isPaymentActive ? "#000" : "#888"}
                  border="1px solid #888"
                >
                  2
                </Text>

                <Text color={isPaymentActive ? "#fff" : "#888"}>PAYMENT</Text>

                <IoIosArrowForward color={isPaymentActive ? "#fff" : "#888"} />
              </HStack>
              <HStack>
                <Text
                  bg={isValidationActive ? "#fff" : "transparent"}
                  borderRadius="50%"
                  w="2rem"
                  h="2rem"
                  textAlign="center"
                  fontSize="1.3rem"
                  color={isValidationActive ? "#000" : "#888"}
                  border="1px solid #888"
                >
                  3
                </Text>

                <Text color={isValidationActive ? "#fff" : "#888"}>
                  VALIDATION
                </Text>

                <IoIosArrowForward
                  color={isValidationActive ? "#fff" : "#888"}
                />
              </HStack>
              <HStack>
                <Text
                  bg={isThankYouActive ? "#fff" : "transparent"}
                  borderRadius="50%"
                  w="2rem"
                  h="2rem"
                  textAlign="center"
                  fontSize="1.3rem"
                  color={isThankYouActive ? "#000" : "#888"}
                  border="1px solid #888"
                >
                  4
                </Text>

                <Text color={isThankYouActive ? "#fff" : "#888"}>
                  THANK YOU
                </Text>

                <IoIosArrowForward color={isThankYouActive ? "#fff" : "#888"} />
              </HStack>
            </HStack>
            <VStack
              pt="3.5rem"
              pb="1rem"
              backdropFilter="blur(16px) saturate(180%)"
              webkitbackdropfilter="blur(16px) saturate(180%)"
              bg="rgba(0, 148, 255, 0.52)"
              borderRadius="12px"
              border="1px solid rgba(209, 213, 219, 0.3)"
              w="97%"
              h="57dvh"
              overflow="auto"
            >
              {renderStep()}
            </VStack>
          </Stack>
        </VStack>
      </Box>
    </>
  );
};

export default Landing;
