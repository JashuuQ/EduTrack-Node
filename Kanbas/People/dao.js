import Database from "../Database/index.js";

Database.users = Database.users || [];

export function findAllPeople() {
  console.log("Database People:", Database.users);
  return Database.users;
}

export function createPerson(req, res) {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  const newPerson = { ...req.body, _id: Date.now().toString() };
  Database.users = [...Database.users, newPerson];
  console.log("New person added:", newPerson);
  res.status(201).json(newPerson);
}

export function updatePerson(personId, personUpdates) {
  const person = Database.users.find((p) => p._id === personId);
  if (!person) {
    throw new Error(`Person with ID ${personId} not found.`);
  }
  Object.assign(person, personUpdates);
  return person;
}

export function deletePerson(personId) {
  Database.users = Database.users.filter((p) => p._id !== personId);
}