const { Seeder } = require('mongoose-data-seed');
const User = require('../models/User');
 
const data = [
  {
    username: 'admin',
    email: 'admin@admin.com',
    bio: 'Lorem ipsum',
    role: 'admin',
    password: 'admin'
  },
  {
    username: 'user',
    email: 'user@user.com',
    bio: 'Just a user',
    password: 'user'
  }
];
 
class UsersSeeder extends Seeder {
  async shouldRun() {
    return (await User.getAll()).length === 0;
  }
 
  async run() {
    return Promise.all(data.map(async (userData) => {
      const user = await User.create(userData);
      user.setPassword(userData.password);
      return user.save();
    }));
  }
}
 
module.exports = UsersSeeder;
