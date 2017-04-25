const pg = require("pg");

const client = new pg.Client({
  user: 'development', //env var: PGUSER
  database: 'vagrant', //env var: PGDATABASE
  password: 'development', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432 //env var: PGPORT
});

const input = process.argv[2];

function connect(name, callback) {
  client.connect((err) => {
    if (err) {
      return console.error("Connection Error", err);
    }
    console.log('Searching ...');
    client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", [input], (err, result) => {
      if (err) {
        return console.error("error running query", err);
      }
      callback(result.rows);
      client.end();
    });
  });
}

connect(input, (resultList) => {
  console.log(`Found ${resultList.length} person(s) by the name '${input}':`);
  for(var i = 0; i < resultList.length; i++) {
    console.log(`-  ${[i + 1]}: ${resultList[i].first_name} ${resultList[i].last_name}, born '${resultList[i].birthdate}'`);
  };
});