import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

import Chat from "@/components/Chat/Chat";
import ChatList from "@/components/Chatlist/ChatList";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import axios from "axios";
import { GET_MESSAGES_ROUTE, HOST } from "@/utils/ApiRoutes";
import Empty from "./Empty";
import LoadingSpinner from "./common/LoadingSpinner";
import SearchMessages from "./Chat/SearchMessages";

export default function Main() {
  const [
    {
      userInfo,
      currentChatUser, 
      messageSearch,
      userContacts,
    },
    dispatch,
  ] = useStateProvider(); 
  
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const socket = useRef();
  const [socketEvent, setSocketEvent] = useState(false);

  useEffect(() => {
    const redirectIfNotLoggedIn = async () => {
      try {
        if (userInfo === undefined) {
          await router.push("/login");
        } else{
          socket.current = io(HOST);
          socket.current.emit("add-user", userInfo.id);
          dispatch({ type: reducerCases.SET_SOCKET, socket });
          setLoading(false);
        }


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    redirectIfNotLoggedIn();
  }, [userInfo]);

  useEffect(() => {
    if (socket.current && !socketEvent) {
      socket.current.on("msg-recieve", (data) => {
        dispatch({
          type: reducerCases.ADD_MESSAGE,
          newMessage: {
            ...data.message,
          },
        });
      });

      socket.current.on("online-users", ({ onlineUsers }) => {
        dispatch({
          type: reducerCases.SET_ONLINE_USERS,
          onlineUsers,
        });
      });

      socket.current.on("mark-read-recieve", ({ id, recieverId }) => {
        dispatch({
          type: reducerCases.SET_MESSAGES_READ,
          id,
          recieverId,
        });
      });

      setSocketEvent(true);
    }
  }, [socket.current]);

  useEffect(() => {
    const getMessages = async () => {
      const {
        data: { messages },
      } = await axios.get(
        `${GET_MESSAGES_ROUTE}/${userInfo.id}/${currentChatUser.id}`
      );
      dispatch({ type: reducerCases.SET_MESSAGES, messages });
    };
    if (
      currentChatUser &&
      userContacts.findIndex((contact) => contact.id === currentChatUser.id) !==
      -1
    ) {
      getMessages();
    }
  }, [currentChatUser]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
        <div className="grid grid-cols-main h-screen w-screen max-h-screen max-w-full overflow-hidden">
          <ChatList />
          {currentChatUser ? (
            <div className={messageSearch ? "grid grid-cols-2" : "grid-cols-2"}>
              <Chat />
              {messageSearch && <SearchMessages />}
            </div>
          ) : (
            <Empty />
          )}
        </div>
    </>
  );
}
