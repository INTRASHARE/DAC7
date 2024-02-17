import AdminContainer from "@/components/Admin/AdminContainer";
import AdminHeader from "@/components/Admin/AdminHeader";
import { HOST } from "@/utils/ApiRoutes";
import { io } from "socket.io-client";
import LoadingSpinner from "../common/LoadingSpinner";
import { useStateProvider } from "@/context/StateContext";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const [loading, setLoading] = useState(true);

  //console.log("userinfo",localStorage);
  const isAdmin = true//userInfo.isAdmin;  
  const router = useRouter();

  useEffect(() => {
    const redirectIfNotLoggedIn = async () => {
      console.log("isAdmin", isAdmin);
      try {
        const storedUserInfo = localStorage.getItem("userInfo");
        if (!storedUserInfo || storedUserInfo === "undefined" || isAdmin == 0) {
          await router.push("/");
          return;
        }

        setLoading(false);
        socket.current = io(HOST);
        socket.current.emit("add-user", parsedUserInfo.id);
        dispatch({ type: reducerCases.SET_SOCKET, socket });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    redirectIfNotLoggedIn();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="">
      <AdminHeader />
      <AdminContainer />
    </div>
  );
}
