import Person from "./Person.jsx";

const Persons = ({ persons, handleRemove }) => {
  return (
    <ul>
      {persons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleRemove(person.id)}>delete</button>
        </li>
      ))}
    </ul>
  );
};

export default Persons;