// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  //dyanamic route grabber
  const {
    query: { username, posttitle },
  } = req;

  //Dummy data for testing
  const samplePost = {
    username: username,
    title: posttitle,
    date: "Tuesday, May 5th 2010",
    contents: "<p>f</p><p><br></p><ul><li>d</li><li>* </li><li>d</li></ul>",
  };

  res.statusCode = 200;
  res.json(samplePost);
};
