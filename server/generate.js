var faker = require('faker');

var database = { Regions: []};

for (var i = 1; i<= 50; i++) {
  database.Regions.push({
    Id: i,
    code:  faker.name.jobArea(),
    description:faker.name.jobTitle(),
    active: faker.random.boolean()
  });
}

console.log(JSON.stringify(database));