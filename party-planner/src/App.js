import React, { useState, useEffect } from "react";
import "./App.css";

const PartyList = ({ parties, onDelete }) => {
  return (
    <ul>
      {parties.map((party, index) => (
        <li key={index}>
          <strong>{party.name}</strong> - {party.date}, {party.time}
          <br />
          Location: {party.location}
          <br />
          Description: {party.description}
          <br />
          <button onClick={() => onDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

const PartyForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({
      name: "",
      date: "",
      time: "",
      location: "",
      description: "",
    });
  };

  return (
    <div>
      <h2>Schedule a New Party</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="time">Time:</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

function App() {
  const [parties, setParties] = useState([]);

  useEffect(() => {
    fetch(
      "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-fsa-et-web-pt/events"
    )
      .then((response) => response.json())
      .then((data) => setParties(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (index) => {
    const updatedParties = [...parties];
    updatedParties.splice(index, 1);
    setParties(updatedParties);
  };

  const handleAdd = (newParty) => {
    console.log("Adding a new party:", newParty);
  };

  return (
    <div className="App">
      <h1>Party List</h1>
      <PartyList parties={parties} onDelete={handleDelete} />
      <PartyForm onAdd={handleAdd} />
    </div>
  );
}

export default App;
