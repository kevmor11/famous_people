var knex = require('knex') ({
      client: 'pg',
      connection: {
        "user": "development",
        "password": "development",
        "database": "vagrant",
        "hostname": "localhost",
        "port": 5432,
        "ssl": true
        },
      searchPath: 'knex,public'
    });

module.exports = knex;