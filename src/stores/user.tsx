import { getToken } from "@/common/helpers/utils";
import { atob } from "Base64";

const parseToken = (token) =>
  JSON.parse(decodeURIComponent(escape(atob(token.split(".")[0]))));

let userInfo;
getToken().then((t) => {
  userInfo = parseToken(t);
  userInfo.token = t;
});

const getUserInfo = () => userInfo;

export default getUserInfo;
