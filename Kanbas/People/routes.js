import * as peopleDao from "./dao.js";

export default function PeopleRoutes(app) {
    app.get("/api/people", (req, res) => {
      try {
        const people = peopleDao.findAllPeople();
        res.send(people);
      } catch (error) {
        console.error("Error fetching people:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });
  
    app.post("/api/people", (req, res) => {
      peopleDao.createPerson(req, res);
    });
  
    app.put("/api/people/:personId", (req, res) => {
      const { personId } = req.params;
      const personUpdates = req.body;
      try {
        const updatedPerson = peopleDao.updatePerson(personId, personUpdates);
        res.send(updatedPerson);
      } catch (error) {
        console.error("Error updating person:", error);
        res.status(404).send({ error: "Person not found." });
      }
    });
  
    app.delete("/api/people/:personId", (req, res) => {
      const { personId } = req.params;
      try {
        peopleDao.deletePerson(personId);
        res.sendStatus(204);
      } catch (error) {
        console.error("Error deleting person:", error);
        res.status(500).send({ error: "Internal Server Error" });
      }
    });
  }