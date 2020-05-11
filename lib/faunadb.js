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

    postdata.postContents = sanitizeHtml(postdata.postContents);

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
  const secret = process.env.FAUNADB_KEY;
  const q = faunadb.query;
  const client = new faunadb.Client({ secret });

  const headers = new Headers();
};
