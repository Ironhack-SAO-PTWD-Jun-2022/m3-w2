const { Schema, model } = require('mongoose');

const catSchema = new Schema({
  name: String,
  years: Number,
  dateOfBirth: Date, // Date('2020-10-01')
  adopted: Boolean,
  owner: Schema.Types.ObjectId,
  datesOfVaccines: [ Date ],
});

module.exports = model('Cat', catSchema);