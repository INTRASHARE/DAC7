import React, { useState } from "react";
import Avatar from "../common/Avatar";
import { BsFillChatLeftTextFill, BsThreeDotsVertical } from "react-icons/bs";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/router";
import ContextMenu from "../common/ContextMenu";

export default function ChatListHeader() {
  const [{ userInfo }, dispatch] = useStateProvider();
  const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = storedUserInfo.isAdmin;
  const router = useRouter();
  const [contextMenuCoordinates, setContextMenuCoordinates] = useState({
    x: 0,
    y: 0,
  });
  const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);

  const showContextMenu = (e) => {
    e.preventDefault();
    setContextMenuCoordinates({ x: e.pageX -69 , y: e.pageY + 20 });
    setIsContextMenuVisible(true);
  };

  const openAdminPageInNewTab = () => {
    // Open the Admin page in a new tab
    window.open('/admin', '_blank');
    setIsContextMenuVisible(false); 
  };
   
  // Ensuring isAdmin is defined and accessible
  const contextMenuOptions = isAdmin ? [
    {
      name: "Admin",
      callBack: openAdminPageInNewTab,
    },
    {
      name: "Logout",
      callBack: async () => {
        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ] : [
    {
      name: "Logout",
      callBack: async () => {
        setIsContextMenuVisible(false);
        router.push("/logout");
      },
    },
  ];

  const handleAllContactsPage = () => {
    dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE });
  };

  return (
    <div style={{backgroundColor: "#485778"}} className="h-16 px-4 py-3 flex justify-between items-center">
      <div className="cursor-pointer">
        <Avatar type="sm" image={userInfo?.profilePicture} />
      </div>
      <div className="flex gap-6 ">
        <BsFillChatLeftTextFill
          className="text-chatList-icon cursor-pointer text-xl"
          title="New chat"
          onClick={handleAllContactsPage}
        />
        <>
          <BsThreeDotsVertical
            className="text-chatList-icon cursor-pointer text-xl"
            title="Menu"
            onClick={(e) => showContextMenu(e)}
            id="context-opener"
          />
          {isContextMenuVisible && (
            <ContextMenu
              key="contextMenu"
              options={contextMenuOptions}
              coordinates={contextMenuCoordinates} // Corrected prop name to "coordinates"
              contextMenu={isContextMenuVisible}
              setContextMenu={setIsContextMenuVisible}
            />
          )}
        </>
      </div>
    </div>
  );
}
