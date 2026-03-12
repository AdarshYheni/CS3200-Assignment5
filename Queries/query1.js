const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db("ieeevisTweets");
    const tweets = db.collection("tweet");

    const count = await tweets.countDocuments({
      retweeted_status: { $exists: false },
      in_reply_to_status_id: null
    });

    console.log("Query1 Result:");
    console.log(count);
  } catch (error) {
    console.error("Error in Query1:", error);
  } finally {
    await client.close();
  }
}

run();