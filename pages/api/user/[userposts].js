// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  //dyanamic route grabber
  const {
    query: { userposts },
  } = req;

  //Dummy data for testing
  const samplePosts = {
    posts: [
      {
        title: "what-minecraft-taught-me-about-life",
        cleantitle: "What Minecraft Taught Me About Life",
        date: "Tuesday, May 5th 2010",
      },
      {
        title: "what-fortnite-taught-me-about-life",
        cleantitle: "What Fortnite Taught Me About Life",
        date: "Tuesday, May 5th 2010",
      },
    ],
  };

  res.statusCode = 200;
  res.json(samplePosts);
};
