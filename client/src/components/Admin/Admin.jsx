import AdminContainer from "@/components/Admin/AdminContainer";
import AdminHeader from "@/components/Admin/AdminHeader";
import { HOST } from "@/utils/ApiRoutes";
import { io } from "socket.io-client";
import LoadingSpinner from "../common/LoadingSpinner";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Admin() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const redirectIfNotLoggedIn = async () => {
      try {

        const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (!storedUserInfo || storedUserInfo === "undefined") {
          await router.push("/");
          return;
        }
        if( storedUserInfo.isAdmin == 0){
          await router.push("/");
          return;
        }

        setLoading(false);
        socket.current = io(HOST);
        socket.current.emit("add-user", storedUserInfo.id);
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
