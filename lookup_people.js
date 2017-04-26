const knex = require('./dataHelpers.js');

const input = process.argv[2];

function connect(name, callback) {
  console.log('Searching ...');
  knex.select().from('famous_people').whereIn('first_name', input).orWhereIn('last_name', input)
  .asCallback(function(err, result) {
    if (err) {
      return console.error("Connection Error", err);
    }
    callback(result);
    knex.destroy();
  });
}

connect(input, (resultList) => {
  console.log(`Found ${resultList.length} person(s) by the name '${input}':`);
  for(var i = 0; i < resultList.length; i++) {
    console.log(`- ${[i + 1]}: ${resultList[i].first_name} ${resultList[i].last_name}, born '${resultList[i].birthdate}'`);
  };
});