/* eslint-disable @typescript-eslint/no-var-requires */
const uuid = require('uuid');
const dynamodb = require('./dynamodb');

// function changeTimezone(date, ianatz) {
//   // suppose the date is 12:00 UTC
//   const invDate = new Date(
//     date.toLocaleString('en-US', {
//       timeZone: ianatz,
//     })
//   );

//   // then invdate will be 07:00 in Toronto
//   // and the diff is 5 hours
//   const diff = date.getTime() - invDate.getTime();

//   // so 12:00 in Toronto is 17:00 UTC
//   return new Date(date.getTime() - diff); // needs to substract
// }

// E.g.
// var here = new Date();
// var there = changeTimezone(here, 'America/Toronto');

// console.log(`Here: ${here.toString()}\nToronto: ${there.toString()}`);

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);

  if (!data || typeof data !== 'object') {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: "Couldn't create the item because of missing required information.",
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      createdAt: timestamp,
      updatedAt: timestamp,
      name: data.name,
      day: data.day,
      month: data.month,
      year: data.year,
      hour: data.hour,
      min: data.min,
      sec: data.sec,
      locale: data.locale,
    },
  };

  // write the item to the database
  dynamodb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't create the item.",
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
