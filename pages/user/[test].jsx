import React from "react";

import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { test } = router.query;

  return <p>Post: {test}</p>;
};

export default Post;
