import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const Check = () => {
  const parseJwt = (token) => {
    try {
      if (!token) return null;
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Invalid token:", e);
      return null;
    }
  };

  const token = useSelector((state) => state.user.token);

  const parsedToken = useMemo(() => parseJwt(token), [token]);
  const role = parsedToken ? parsedToken.tokenrole : null;
  console.log(parsedToken)
  console.log(role)
  return (
    <div>
      {role === "admin" && <button>Admin Button</button>}
      {role === "user" && <button>User Button</button>}
      {!role && <p>No role available</p>}
    </div>
  );
};

export default Check;
