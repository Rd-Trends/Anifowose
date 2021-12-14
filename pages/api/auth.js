import { getAuthToken } from "../../utils/cookies";
import { isEmpty } from "lodash";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.get(async (req, res) => {
  if (!req.headers.cookie) {
    return res.status(401).json({ message: "no auth" });
  }
  const authToken = getAuthToken(req);

  if (isEmpty(authToken)) {
    res.status(400).json({ message: "no auth" });
  } else {
    res.status(200).json({ authToken });
  }
  res.end();
});

export default handler;
