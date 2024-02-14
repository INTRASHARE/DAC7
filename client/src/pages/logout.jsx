import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Logout() {
  const [{ socket, userInfo }, dispatch] = useStateProvider();
  const router = useRouter();

  useEffect(() => {
    try {
      if (!socket || !userInfo) {
        router.push("/login");
      }

      socket.current.emit("signout", userInfo.id);
      dispatch({
        type: reducerCases.SET_USER_INFO,
        userInfo: undefined,
      });
      router.push("/login");

    } catch (error) {
      console.error("Error fetching data:", error);
    }

}, [socket]);

  return <div className="bg-conversation-panel-background"></div>;
}

export default Logout;
