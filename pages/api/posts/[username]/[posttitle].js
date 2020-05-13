const faunadb = require("faunadb");

const secret = process.env.FAUNADB_KEY;
const q = faunadb.query;
const client = new faunadb.Client({ secret });
import auth0 from "../../../../lib/auth0";

import { retrieveUserByUserID } from "../../../../lib/faunadb";

const cleanUrl = function (dirtyUrl) {
  const pass1 = dirtyUrl.replace(/ /g, "_");
  const pass2 = pass1.replace(/\W/g, "");
  const cleanUrl = pass2.replace(/_/g, "-");

  return cleanUrl;
};

export default auth0.requireAuthentication(async (req, res) => {
  const { user } = await auth0.getSession(req);
  const userid = await user.sub;

  //big disgusting code block that attempts to handle the requests
  //will clean up later
  try {
    //throw out bad methods
    if (req.method !== "POST" && req.method !== "DELETE") {
      throw error("WRONG METHOD");
    } else {
      const {
        query: { username, posttitle },
        body,
      } = req;

      //make sure user is correct
      const userNameDatabase = await retrieveUserByUserID(userid);
      if (userNameDatabase.screen_name !== username) {
        console.log("bad bad bad");
        throw "WRONG USER";
      }
      if (req.method === "DELETE") {
        console.log("okay deleting the post");

        const ref = await client.query(
          q.Get(q.Match(q.Index("findpost"), [username, posttitle]))
        );

        if (!ref) {
          throw "NO DOC FOUND";
        }

        const deleteSuccessful = await client.query(q.Delete(ref.ref));

        res.status(200).json(deleteSuccessful);
      } else if (body.post_contents) {
        const ref = await client.query(
          q.Get(q.Match(q.Index("findpost"), [username, posttitle]))
        );

        if (!ref) {
          throw "NO DOC FOUND";
        }

        const updatedContent = await client.query(
          q.Update(ref.ref, {
            data: { postContents: body.post_contents },
          })
        );

        res.status(200).json(updatedContent);
      } else if (body.post_title && !body.new) {
        const ref = await client.query(
          q.Get(q.Match(q.Index("findpost"), [username, posttitle]))
        );

        if (!ref) {
          throw error("NO DOC FOUND");
        }

        //update title
        if (body.ispublished) {
          const updatedContent = await client.query(
            q.Update(ref.ref, {
              data: {
                title: body.post_title,
              },
            })
          );

          const newdata = await updatedContent.data;
          res.status(200).json(newdata);
        } else {
          let cleanTitle = cleanUrl(body.post_title);

          //check for title collisions (awful code)
          try {
            const checkTitleCollision = await client.query(
              q.Get(q.Match(q.Index("findpost"), [username, cleanTitle]))
            );

            if (checkTitleCollision) {
              cleanTitle = cleanTitle + "-2";
            }
          } catch (e) {
            //do nothing
            console.log("no title collision found");
          }

          const updatedContent = await client.query(
            q.Update(ref.ref, {
              data: {
                title: body.post_title,
                titleurl: cleanTitle,
                date: Date.now(),
              },
            })
          );

          const newdata = await updatedContent.data;
          res.status(200).json(newdata);
        }
      } else if (body.post_title && body.new) {
        //generate new post
        console.log("new post time");

        //clean title url to be saved
        let cleanTitle = cleanUrl(body.post_title);

        //check for title collisions (awful code)
        try {
          const checkTitleCollision = await client.query(
            q.Get(q.Match(q.Index("findpost"), [username, cleanTitle]))
          );

          if (checkTitleCollision) {
            cleanTitle = cleanTitle + "-2";
          }
        } catch (e) {
          //do nothing
          console.log("no title");
        }

        //create the post
        const ref = await client.query(
          q.Create(q.Collection("blog_posts"), {
            data: {
              userid,
              username,
              title: body.post_title,
              titleurl: cleanTitle,
              date: Date.now(),
              published: false,
              postContents: "",
            },
          })
        );

        res.status(200).json(ref.data);
      } else if (body.changepublish) {
        console.log("ugh flipping publish");

        const flippedState = !body.ispublished;

        const ref = await client.query(
          q.Get(q.Match(q.Index("findpost"), [username, posttitle]))
        );

        if (!ref) {
          throw "NO DOC FOUND";
        }

        const updatedContent = await client.query(
          q.Update(ref.ref, {
            data: { published: flippedState },
          })
        );

        res.status(200).json({ flippublishstatus: "Good" });
      } else {
        res.status(500).json({ error: "BAD REQUEST" });
      }
    }
  } catch (e) {
    console.log("error" + e);
    res.status(500).json({ error: e.message });
  }
});
