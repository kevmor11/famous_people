const pg = require("pg");

const client = new pg.Client({
  user: 'development', //env var: PGUSER
  database: 'vagrant', //env var: PGDATABASE
  password: 'development', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432 //env var: PGPORT
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", [process.argv[2]], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    // console.log(result);
    console.log(result.rows); //output: 1
    client.end();
  });
});