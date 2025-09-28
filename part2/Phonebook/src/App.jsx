import { useEffect, useState } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  const addName = (event) => {
    event.preventDefault();
    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    if (newName.length === 0 || newNumber.length === 0) {
      alert("Field cannot be empty");
      return;
    }
    const personObject = { name: newName, number: newNumber };

    PersonService.create(personObject).then((response) => {
      setPersons(persons.concat(response.data));
      setNotification(`Added ${response.data.name}`);
      setTimeout(() => setNotification(null), 3000);
    });
  };

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setFilter(event.target.value);

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    PersonService.getAll()
      .then((response) => {
        console.log("promise fulfilled, Phonebook loaded");
        setPersons(response.data);
      })
      .catch((err) => {
        console.error("Failed to fetch persons:", err);
      });
  }, []);

  const removeName = (id) => {
    const person = persons.find((p) => p.id === id);
    if (!person) return;

    if (window.confirm(`Delete ${person.name}?`)) {
      PersonService.remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
          console.log(`Person ${person.name} has been removed`);
        })
        .catch((err) => {
          console.error("Failed to delete person", err);
        });
    }
  };
  return (
    <div>
      <h2>Phonebook</h2>
      {notification && (
        <div
          style={{
            color: "green",
            background: "lightgray",
            border: "1px solid green",
            padding: "4px",
            borderRadius: "4px",
            marginBottom: "10px",
          }}
        >
          {notification}
        </div>
      )}

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleRemove={removeName} />
    </div>
  );
};

export default App;
