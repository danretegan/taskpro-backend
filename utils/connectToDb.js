const mongoose = require("mongoose");
const colors = require("colors");

async function connectToDb() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
    // Conectare la baza de date
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, // Utilizează noul parser de URL-uri pentru a procesa URL-ul de conexiune.
      useUnifiedTopology: true, // Utilizează noul motor de topologie unificată pentru a gestiona conexiunea și topologia cluster-ului.
    });
    console.log(colors.bgGreen.italic.bold("Database connection successful!"));
  } catch (error) {
    // Dacă apare o eroare, închide procesul cu un cod de ieșire 1
    console.error(colors.red.italic.bold(error));
    process.exit(1);
  }
}

module.exports = connectToDb;
