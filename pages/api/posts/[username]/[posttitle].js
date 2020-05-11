const faunadb = require("faunadb");

const secret = process.env.FAUNADB_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });

export default async (req, res) => {
  //dyanamic route grabber
  const {
    query: { username, posttitle },
  } = req;

  //attempt connecting to database
  try {
    const dbs = await client.query(
      q.Get(
        q.Match(
          // query index
          q.Index("findpost"),
          ["ghosttyped", "what-minecraft-taught-me-about-life"]
        )
      )
    );

    res.status(200).json(dbs.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
