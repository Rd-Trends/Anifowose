import cookie from "cookie";

export const parseCookie = (req) => {
  return cookie.parse(req ? req.headers.cookie : "");
};

export const getAuthToken = (req) => {
  const cookies = parseCookie(req);
  return cookies.auth || "";
};
