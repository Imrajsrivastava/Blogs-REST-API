const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.DATABASE_URL);

module.exports = { connection };
