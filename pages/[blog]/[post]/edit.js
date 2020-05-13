import dynamic from "next/dynamic";
import Router from "next/router";
import auth0 from "../../../lib/auth0";

import { useEffect } from "react";

import {
  retrievePostByUserAndTitle,
  retrieveUserByUserID,
} from "../../../lib/faunadb";

const DynamicEditor = dynamic(
  () => import("../../../components/editor/editor"),
  { ssr: false }
);

export async function getServerSideProps(context) {
  let { blog, post } = context.params;

  const user = await auth0.getSession(context.req);

  if (!user) {
    return {
      props: {
        postdata: "",
        blog: blog,
        post: post,
      },
    };
  }

  const userName = await retrieveUserByUserID(user.user.sub);

  if (!userName || userName.screen_name !== blog) {
    return {
      props: {
        postdata: "",
        blog: blog,
        post: post,
      },
    };
  }

  const postdata = await retrievePostByUserAndTitle(blog, post);

  return {
    props: { postdata, blog, post },
  };
}

export default function EditPost({ postdata, blog, post }) {
  useEffect(() => {
    if (postdata === "") {
      Router.push("/" + blog + "/" + post + "/");
    }
  }, []);

  return (
    <>
      <DynamicEditor postdata={postdata} username={blog} post={post} />
    </>
  );
}
