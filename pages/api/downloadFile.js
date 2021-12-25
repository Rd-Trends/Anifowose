import nextConnect from "next-connect";

const handler = nextConnect();

handler.post(async (req, res) => {
  const response = await fetch(req.body.mediaUrl);
  res.send(response.blob());

  //   fetch(req.body.mediaUrl)
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       console.log(blob);
  //       const url = URL.createObjectURL();
  //     });
});

export default handler;
