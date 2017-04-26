const knex = require('./dataHelpers.js');

let firstName = process.argv[2];
let lastName = process.argv[3];
let dateOfBirth = process.argv[4];

knex.insert({
  first_name: firstName,
  last_name: lastName,
  birthdate: dateOfBirth
  })
.into("famous_people")
.then((results) => {
  console.log('Addition was succesfully inserted.');
  knex.destroy();
});