import sanitizeHtml from "sanitize-html";
import faunadb from "faunadb";
import fetch from "isomorphic-unfetch";

//only run these on the server! NO CLIENT

export const retrievePostByUserAndTitle = async (username, titleurl) => {
  try {
    const secret = process.env.FAUNADB_KEY;
    const q = faunadb.query;
    const client = new faunadb.Client({ secret });

    const dbs = await client.query(
      q.Get(
        q.Match(
          // query index
          q.Index("findpost"),
          [username, titleurl]
        )
      )
    );

    const postdata = await dbs.data;

    postdata.postContents = sanitizeHtml(postdata.postContents, {
      allowedTags: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "p",
        "a",
        "ul",
        "ol",
        "nl",
        "li",
        "b",
        "i",
        "strong",
        "em",
        "strike",
        "code",
        "hr",
        "br",
        "table",
        "thead",
        "caption",
        "tbody",
        "tr",
        "th",
        "td",
        "pre",
        "img",
      ],
    });

    return postdata;
  } catch (error) {
    console.log(error);
  }
};

export const retrievePostsByUser = async (username) => {
  const secret = process.env.FAUNADB_KEY;
  const q = faunadb.query;
  const client = new faunadb.Client({ secret });

  //query database for user's posts
  const dbs = await client.query(
    q.Map(q.Paginate(q.Match(q.Index("findposts"), [username])), (ref) =>
      q.Get(ref)
    )
  );

  let posts = await dbs.data.map((post) => post.data);

  return posts;
};

export const retrieveUserByUsername = async (username) => {
  try {
    const secret = process.env.FAUNADB_KEY;
    const q = faunadb.query;
    const client = new faunadb.Client({ secret });

    const dbs = await client.query(
      q.Get(q.Match(q.Index("user_by_screename"), [username]))
    );

    const userdata = await dbs.data;
    return userdata;
  } catch (error) {}
};

export const retrieveAndUpdateUserByUserid = async (userid) => {
  try {
    const secret = process.env.FAUNADB_KEY;
    const q = faunadb.query;
    const client = new faunadb.Client({ secret });

    const dbs = await client.query(
      q.Get(q.Match(q.Index("user_by_id"), [userid]))
    );

    const userdata = await dbs.data;

    return userdata;
  } catch (error) {}
};
