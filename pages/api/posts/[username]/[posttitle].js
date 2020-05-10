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
      q.Map(
        // iterate each item in result
        q.Paginate(
          // make paginatable
          q.Match(
            // query index
            q.Index("all_products") // specify source
          )
        ),
        (ref) => q.Get(ref) // lookup each result by its reference
      )
    );

    console.log(dbs.data);

    //Dummy data for testing
    const samplePost = {
      username: username,
      title: "What Minecraft Taught Me About Life",
      date: "Tuesday, May 5th 2010",
      postContents:
        "<p>f</p><p><br></p><ul><li>d</li><li>* </li><li>d</li></ul>",
    };

    res.statusCode = 200;
    res.json(dbs.data);
  } catch (e) {
    // something went wrong
    res.status(500).json({ error: e.message });
  }
};
