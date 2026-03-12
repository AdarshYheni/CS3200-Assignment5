const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

async function run() {

  const client = new MongoClient(uri);

  try {

    await client.connect();

    const db = client.db("ieeevisTweets");
    const tweets = db.collection("tweet");

    const results = await tweets.aggregate([

      {
        $group: {
          _id: "$user.id",
          screen_name: { $first: "$user.screen_name" },
          followers: { $max: "$user.followers_count" }
        }
      },

      {
        $sort: { followers: -1 }
      },

      {
        $limit: 10
      }

    ]).toArray();

    console.log("Query2 Result:");
    console.table(results);

  } catch (error) {

    console.error(error);

  } finally {

    await client.close();

  }

}

run();