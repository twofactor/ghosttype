// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const samplePosts = {
  name: "John Doe",
};

export default (req, res) => {
  res.statusCode = 200;
  res.json(samplePosts);
};
