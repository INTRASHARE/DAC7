import React from "react";
import Avatar from "../common/Avatar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { FaMicrophone } from "react-icons/fa";
import { calculateTime } from "@/utils/CalculateTime";
import MessageStatus from "../common/MessageStatus";
import { IoDocumentAttach } from "react-icons/io5";


export default function ChatLIstItem({ data, isContactPage = false }) {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();

  const handleContactClick = () => {
    console.log(
      "function from chat list item",
      currentChatUser,
      data,
      userInfo
    );
    if (currentChatUser?.id === data?.id) {
      return dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
    }
    if (!isContactPage) {
      dispatch({
        type: reducerCases.CHANGE_CURRENT_CHAT_USER,
        user: {
          name: data.name,
          about: data.about,
          profilePicture: data.profilePicture,
          email: data.email,
          id: userInfo.id === data.senderId ? data.recieverId : data.senderId,
        },
      });
    } else {
      dispatch({ type: reducerCases.CHANGE_CURRENT_CHAT_USER, user: data });
      dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
    }
  };
  return (
    <div
      className={`flex cursor-pointer items-center ${
        currentChatUser?.id === data.id && !isContactPage
          ? "bg-background-default-hover"
          : "hover:bg-background-default-hover"
      }`}
      onClick={handleContactClick}
    >
      <div className="min-w-fit px-5 pt-3 pb-1 ">
        <Avatar type="lg" image={data?.profilePicture} />
      </div>
      <div className="min-h-full flex flex-col justify-center mt-3 pr-2 w-full">
        <div className="flex justify-between ">
          <div>
            <span className="text-white">{data?.name}</span>
          </div>
          {!isContactPage && (
            <div>
              <span
                className={`${
                  !data.totalUnreadMessages > 0
                    ? "text-white"
                    : "text-icon-green"
                } text-sm`}
              >
                {calculateTime(data.createdAt)}
              </span>
            </div>
          )}
        </div>
        <div className="flex border-b border-conversation-border pb-2 pt-1 pr-2">
          <div className="flex justify-between w-full">
            <span className="text-white line-clamp-1 text-sm ">
              {isContactPage ? (
                data?.about || "\u00A0"
              ) : (
                <div className="flex items-center gap-1 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[200px] xl:max-w-[300px]">
                  {data.senderId === userInfo.id && (
                    <MessageStatus messageStatus={data.messageStatus} />
                  )}
                  {data.type === "text" && (
                    <span className="truncate ">{data.message}</span>
                  )}
                  {data.type === "audio" && (
                    <span className="flex gap-1 items-center">
                      <FaMicrophone className="text-panel-header-icon" />
                      Audio
                    </span>
                  )}
                  {data.type === "image" && (
                    <span className="flex gap-1 items-center">
                      <IoDocumentAttach className="text-panel-header-icon cursor-pointer text-xl" />
                      File
                    </span>
                  )}
                </div>
              )}
            </span>
            {data.totalUnreadMessages > 0 && (
              <span className="bg-icon-green px-[5px] rounded-full text-sm">
                {data.totalUnreadMessages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
