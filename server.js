const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "*", //["http://127.0.0.1:5501", "http://127.0.0.1:5502"],
  })
);

const mongoUrl = "mongodb://localhost:27017";
const client = new MongoClient(mongoUrl);


// Function to get unique years from a collection and sort them
async function getUniqueYearsSorted(collectionName) {
  try {
    const database = client.db("FOStimeline");
    const collection = database.collection(collectionName);
    let documents = await collection.find({}, { projection: { year: 1 } }).toArray();

    let years = documents.map(doc => doc.year).filter(year => year !== undefined);
    years = [...new Set(years)]; // Remove duplicates
    years.sort((a, b) => b - a); // Order from largest to smallest

    //console.log('Years:', years);
    return years;
  } catch (error) {
    console.error('Error obteniendo años únicos ordenados:', error);
    throw error;
  }
}


// Sort years of the two collections without duplicates
async function getCombinedYears() {
  const contributionYears = await getUniqueYearsSorted("contribution");
  const needYears = await getUniqueYearsSorted("need");
  let combinedYears = [...new Set([...contributionYears, ...needYears])];
  combinedYears.sort((a, b) => b - a);

  // Convert years to objects with id and year
  combinedYears = combinedYears.map((year, index) => ({
    id: index + 1,
    year: year,
  }));

  return combinedYears;
}

async function getNeedsByYears(years) {
  try {
    const database = client.db("FOStimeline");
    const collection = database.collection("need");
    
    const documents = await collection.find({
      year: { $in: years.map(Number) }
    }, {
      projection: {
        title: 1,
        description: 1,
        year: 1,
        month: 1,
        typeNeedsId: 1,
        orgUnitId: 1
      }
    }).toArray();
    
    return documents;
  } catch (error) {
    console.error("Error getting needs for years:", error);
    throw error;
  }
}

async function getContributionsByYears(years) {
  try {
    const database = client.db("FOStimeline");
    const contributionCollection = database.collection("contribution");
    const orgUnitCollection = database.collection("orgUnit");

    const contributions = await contributionCollection.find({
      year: { $in: years.map(Number) }
    }, {
      projection: {
        title: 1,
        description: 1,
        year: 1,
        month: 1,
        typeNeedsId: 1,
        orgUnitId: 1
      }
    }).toArray();

    // Convert ObjectId to string for orgUnitId
    for (const contribution of contributions) {
      if (contribution.orgUnitId) {
        const orgUnit = await orgUnitCollection.findOne({ _id: contribution.orgUnitId });
        if (orgUnit) {
          contribution.orgUnitId = contribution.orgUnitId.toString(); // Convertir ObjectId a String
          contribution.orgUnitName = orgUnit.name;
        } else {
          console.log(`No se encontró orgUnit para el ID: ${contribution.orgUnitId.toString()}`);
        }
      }
    }

    return contributions;
  } catch (error) {
    console.error("Error getting contributions for years:", error);
    throw error;
  }
}

// Connect to MongoDB client when starting server
async function main() {
  try {
    await client.connect();
    //console.log("Conectado a MongoDB");

    // Defines a function to get documents from a collection
    async function getDocumentsFromCollection(collectionName) {
      const database = client.db("FOStimeline");
      const collection = database.collection(collectionName);
      return await collection.find({}).toArray();
    }

    // GET path to get documents
    app.get("/getOrgUnits", async (req, res) => {
      try {
        const list = await getDocumentsFromCollection("orgUnit");
        res.json(list);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los documentos de orgUnit");
      }
    });

    // GET path to get documents
    app.get("/getTypeNeeds", async (req, res) => {
      try {
        const list = await getDocumentsFromCollection("typeNeeds");
        res.json(list);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los documentos de typeNeeds");
      }
    });

    // GET path to get documents
    app.get("/getContributions", async (req, res) => {
      try {
        const list = await getDocumentsFromCollection("contribution");
        res.json(list);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los documentos de contribution");
      }
    });

    // GET path to get documents need
    app.get("/getNeeds", async (req, res) => {
      try {
        const list = await getDocumentsFromCollection("need");
        res.json(list);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener los documentos de need");
      }
    });

    // New GET route to get combined and sorted years
    app.get("/getYears", async (req, res) => {
      try {
        const years = await getCombinedYears();
        res.json(years);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send("Error al obtener los años combinados y ordenados");
      }
    });

    // New GET route to get combined and sorted years
    app.get("/getContributions", async (req, res) => {
      try {
        const years = await getCombinedYears();
        res.json(years);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send("Error al obtener los años combinados y ordenados");
      }
    });

    // Endpoint to get the needs for years
    app.get("/api/needsByYears", async (req, res) => {
      try {
        let years = req.query.years ? req.query.years.split(",").map(Number) : [];
        const needs = await getNeedsByYears(years);
        res.json(needs);
      } catch (error) {
        console.error("Error obteniendo las necesidades por años:", error);
        res.status(500).send("Error en el servidor al obtener las necesidades por años: " + error.message);
      }
    });

    // Endpoint to get the contributions for years
    app.get("/api/contributionsByYears", async (req, res) => {
      try {
        let years = req.query.years ? req.query.years.split(",").map(Number) : [];
        const needs = await getContributionsByYears(years);
        res.json(needs);
      } catch (error) {
        console.error("Error obteniendo las necesidades por años:", error);
        res.status(500).send("Error en el servidor al obtener las necesidades por años: " + error.message);
      }
    });

    // Start the server
    app.listen(port, () => {
      //console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("No se pudo conectar a MongoDB", error);
  }
}

main();

// Close the MongoDB client when the process terminates
process.on("SIGINT", async () => {
  await client.close();
  console.log("Conexión a MongoDB cerrada");
  process.exit();
});
