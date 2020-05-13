import Head from "next/head";
import Router from "next/router";
import { retrieveUserByUserID, retrievePostsByUser } from "../lib/faunadb";
import auth0 from "../lib/auth0";
import dynamic from "next/dynamic";

import { useEffect } from "react";

const DynamicEditor = dynamic(() => import("../components/editor/editor"), {
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

  const postdata = {
    title: "",
    date: "today",
    postContents: "",
  };

  return (
    <>
      <DynamicEditor postdata={postdata} username={screenname} post="" />
    </>
  );
}
