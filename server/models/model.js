"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
var PG_URI = 'postgres://borrqxeq:rFiEZWIXW_B92wRXM9ADuQ4qIvB4bzER@fanny.db.elephantsql.com/borrqxeq';
// create a new pool here using the connection string above
var pool = new pg_1.Pool({
    connectionString: PG_URI
});
var currentTable = "CREATE TABLE IF NOT EXISTS \"user\"(\n      _id SERIAL PRIMARY KEY,\n      username VARCHAR(20) UNIQUE NOT NULL,\n      pw VARCHAR NOT NULL,\n      email VARCHAR UNIQUE NOT NULL\n  );";
pool.query(currentTable);
console.log("Current Table is created!");
module.exports = {
    query: function (text, params, callback) {
        console.log('Executed the following query: *****', text);
        return pool.query(text, params, callback);
    }
};
