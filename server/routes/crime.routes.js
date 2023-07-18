const crimeController = require("../controllers/crime.controller");

module.exports = (app) => {
app.post("/api/crime", crimeController.createNewCrime);
app.get("/api/crime", crimeController.getAllCrime);
app.get("/api/crime/:id", crimeController.getOneCrime);
app.put("/api/crime/:id", crimeController.updateCrime);
app.delete("/api/crime/:id", crimeController.deleteExistingCrime);
app.get('/api/objs/user', crimeController.getByUser)
};