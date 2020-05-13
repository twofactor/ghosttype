import dynamic from "next/dynamic";

import { retrievePostByUserAndTitle } from "../../../lib/faunadb";

const DynamicEditor = dynamic(
  () => import("../../../components/editor/editor"),
  { ssr: false }
);

export async function getServerSideProps(context) {
  let { blog, post } = context.params;
  const postdata = await retrievePostByUserAndTitle(blog, post);

  return {
    props: { postdata, blog, post },
  };
}

export default function EditPost({ postdata, blog, post }) {
  return (
    <>
      <DynamicEditor postdata={postdata} username={blog} post={post} />
    </>
  );
}
