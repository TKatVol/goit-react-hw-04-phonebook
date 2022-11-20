import { useState, useEffect } from "react";
import { nanoid }  from "nanoid";

import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { StyledContainer, StyledTitleH1, StyledTitleH2 } from "../components/App.styled";

export const App = () => {
  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);
  
  const handleSubmit = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const findSameName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    
    if (findSameName) {
      alert(`${name} is already in contacts`);
      return;
    };

    setContacts(s => [...s, contact]);
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const findContactByName = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()));
  };
  
  const deleteContact = (contactId) => {
    setContacts(s => ( s.filter(contact => contact.id !== contactId) ));
  };

  const visibleContacts = findContactByName();

  return (
    <StyledContainer>
      <StyledTitleH1>Phonebook</StyledTitleH1>
      <ContactForm onSubmit={handleSubmit} />
    
      <StyledTitleH2>Contacts</StyledTitleH2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </StyledContainer>
  );
};

