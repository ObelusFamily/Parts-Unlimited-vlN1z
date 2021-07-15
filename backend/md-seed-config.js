require('dotenv').config();

const process = require('process');
const mongoose = require('mongoose');
const User = require('./seeders/User');
const ItemComment = require('./seeders/ItemComment');

const mongoURL = process.env.MONGODB_URI;

if (!mongoURL) {
  throw new Error('Provide MONGODB_URI in env vars');
}

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
module.exports.seedersList = {
  User,
  ItemComment
};

/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
module.exports.connect = async () =>
  await mongoose.connect(mongoURL, { useNewUrlParser: true });

/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
module.exports.dropdb = async () => mongoose.connection.db.dropDatabase();
