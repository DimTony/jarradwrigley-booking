import React from "react";
import {
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Select,
  Button,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FaMinus, FaPlus } from "react-icons/fa6";

const TicketSelection = ({ ticket, onRemove, onChange, index }) => {
  const handleIncrement = () => onChange(index, ticket.type, ticket.count + 1);
  const handleDecrement = () =>
    onChange(index, ticket.type, Math.max(0, ticket.count - 1));
  const handleTypeChange = (e) => onChange(index, e.target.value, ticket.count);

  return (
    <HStack spacing={4} width="full" alignItems="flex-end">
      <FormControl>
        <FormLabel>Select ticket:</FormLabel>
        <Select
          placeholder="Choose ticket type"
          value={ticket.type}
          onChange={handleTypeChange}
          bg="whitesmoke"
        >
          <option value="general">General Admission</option>
          <option value="fanzone">Fan Zone</option>
          <option value="meet-greet">Meet & Greet</option>
        </Select>
      </FormControl>
      <HStack>
        <IconButton
          icon={<FaMinus />}
          onClick={handleDecrement}
          aria-label="Decrease count"
          isDisabled={ticket.count === 0}
        />
        <Text minWidth="40px" textAlign="center">
          {ticket.count}
        </Text>
        <IconButton
          icon={<FaPlus />}
          onClick={handleIncrement}
          aria-label="Increase count"
        />
      </HStack>
      {index > 0 && (
        <Button onClick={() => onRemove(index)} colorScheme="red">
          Remove
        </Button>
      )}
    </HStack>
  );
};

const TicketSelectionForm = ({
  tickets,
  onAddTicket,
  onRemoveTicket,
  onUpdateTicket,
}) => {
  return (
    <VStack spacing={4} alignItems="flex-start" width="full">
      {tickets.map((ticket, index) => (
        <TicketSelection
          key={ticket.id}
          ticket={ticket}
          onRemove={onRemoveTicket}
          onChange={onUpdateTicket}
          index={index}
        />
      ))}
      <Button onClick={onAddTicket} colorScheme="blue">
        Add Ticket
      </Button>
    </VStack>
  );
};

export default TicketSelectionForm;
