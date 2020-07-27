import Head from "next/head";
import Router from "next/router";
import { retrieveUserByUserID, retrievePostsByUser } from "../lib/faunadb";
import auth0 from "../lib/auth0";
import dynamic from "next/dynamic";

import { useEffect } from "react";

const DynamicEditor = dynamic(() => import("../modules/editor/editor"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const user = await auth0.getSession(context.req);

  if (!user) {
    return {
      props: {
        user: "",
      },
    };
  }

  //ugh this is gross
  const userName = await retrieveUserByUserID(user.user.sub);
  const screenname = userName.screen_name;
  const posts = await retrievePostsByUser(screenname);

  user.user.screenname = screenname;

  return {
    props: { user: user.user, posts: posts, screenname: screenname },
  };
}

export default function NewPost({ user, screenname }) {
  useEffect(() => {
    if (user === "") {
      Router.push("/");
    }
  });

  const currenttime = Date.now();

  const postdata = {
    title: "",
    date: currenttime,
    postContents: "",
    published: false,
  };

  return (
    <>
      <Head>
        <title>New Post</title>
        <meta property="og:title" content="Ghosttype" />
        <meta
          property="og:description"
          content="A minimalist blogging platform."
        />
        <meta
          property="og:image"
          content="https://www.ghosttype.app/ghosttype_meta_cover.png"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url" content="https://www.ghosttype.app" />
        <meta name="twitter:card" content="summary" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DynamicEditor postdata={postdata} username={screenname} post="" />
    </>
  );
}
