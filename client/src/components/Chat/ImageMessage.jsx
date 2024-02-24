import { useStateProvider } from "@/context/StateContext";
import { HOST } from "@/utils/ApiRoutes";
import { calculateTime } from "@/utils/CalculateTime";
import Image from "next/image";
import React from "react";
import MessageStatus from "../common/MessageStatus";

function ImageMessage({ message }) {
  const [{ currentChatUser, userInfo }] = useStateProvider();

  const isImage =
    message.message.endsWith(".jpg") ||
    message.message.endsWith(".jpeg") ||
    message.message.endsWith(".png") ||
    message.message.endsWith(".gif");

  return (
    <div
      className={`text-white px-2 py-[5px] text-sm rounded-md flex gap-2 items-end max-w-[45%]	 ${
        message.senderId === currentChatUser.id
          ? "bg-incoming-background"
          : "bg-outgoing-background"
      }`}
    >
      <span className="break-all">
        {isImage ? (
          <Image
            src={`${HOST}/${message.message}`}
            className="rounded-lg"
            alt="asset"
            height={300}
            width={300}
          />
        ) : (
          <a
            href={`${HOST}/${message.message}`}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            {message.message.substring(28,message.message.length)}
          </a>
        )}
      </span>
      <div className="flex gap-1 items-end">
        <span className="text-bubble-meta text-[11px] pt-1 min-w-fit">
          {calculateTime(message.createdAt)}
        </span>
        <span>
          {message.senderId === userInfo.id && (
            <MessageStatus messageStatus={message.messageStatus} />
          )}
        </span>
      </div>
    </div>
  );
}

export default ImageMessage;
