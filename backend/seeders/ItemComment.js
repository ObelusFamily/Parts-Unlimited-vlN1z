const { Seeder } = require('mongoose-data-seed');
const User = require('../models/User');
const Item = require('../models/Item');
const Comment = require('../models/Comment');
 
const data = [
  {
    slug: 'first',
    title: 'First item',
    description: 'Hic fugiat et consequuntur et qui veritatis architecto. Delectus nesciunt quos veritatis nobis voluptatibus. Delectus quia commodi non officiis.',
    comments: [
      {
        body: 'Natus autem iure delectus. Rerum unde impedit et consequatur hic asperiores fugiat. Ducimus inventore temporibus nihil aut ipsam molestiae ut.',
        seller: 'admin'
      },
      {
        body: 'user comment',
        seller: 'user'
      }
    ],
    tagList: ['test'],
    seller: 'admin'
  },

  {
    slug: 'second',
    title: 'Second item',
    description: 'Second desc',
    comments: [
      {
        body: 'Just a comment from admin',
        seller: 'admin'
      }
    ],
    tagList: ['test2'],
    seller: 'user'
  }
];
 
class ItemsSeeder extends Seeder {
  async shouldRun() {
    return (await Item.getAll()).length === 0;
  }
 
  async run() {
    return Promise.all(data.map(async (itemData) => {
      const user = await User.findByUsername(itemData.seller);
      const { comments } = itemData;
      const itemObj = {
        ...itemData,
        comments: [],
        seller: user
      };
      const item = await Item.create(itemObj);
      item.comments = await Promise.all(comments.map(async (commentObj) => {
        const commentUser = await User.findByUsername(commentObj.seller);
        return Comment.create({
          ...commentObj,
          seller: commentUser,
          item
        });
      }));
      return item.save();
    }));
  }
}
 
module.exports = ItemsSeeder;
