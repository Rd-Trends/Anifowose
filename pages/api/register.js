import { registerUser } from "../../utils/api";
import { v4 } from "uuid";
import cookie from "cookie";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.post(async (req, res) => {
  console.log(req.body);
  const { username, password, email } = req?.body ?? {};
  const clientMutationId = v4();

  /**
   * Note when you run 'npm run start' locally, cookies won't be set, because locally process.env.NODE_ENV = 'production'
   * so secure will be true, but it will still be http and not https , when tested locally.
   * So when testing locally both in dev and prod, set the value of 'secure' to be false.
   */
  try {
    const data = await registerUser({
      username,
      password,
      email,
      clientMutationId,
    });
    res.setHeader(
      "Set-Cookie",
      cookie.serialize(
        "auth",
        String(data?.registerUser?.user.jwtAuthToken ?? ""),
        {
          httpOnly: true,
          secure: "development" !== process.env.NODE_ENV,
          path: "/",
          maxAge: 60 * 60 * 24 * 7, // 1 week
        }
      )
    );
    // Only sending a message that successful, because we dont want to send JWT to client.
    res
      .status(200)
      .json({ success: Boolean(data?.registerUser?.user.jwtAuthToken) });
  } catch (e) {
    console.log(e);
  }
});

export default handler;
