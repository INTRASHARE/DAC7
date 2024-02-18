import React, { useEffect, useState } from "react";
import Avatar from "../components/common/Avatar";
import Input from "../components/common/Input";
import axios from "axios";
import { onBoardUserRoute } from "../utils/ApiRoutes";
import Resizer from "react-image-file-resizer";
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import { reducerCases } from "@/context/constants";

export default function OnBoarding() {
  const router = useRouter();

  const [{ userInfo, newUser }, dispatch] = useStateProvider();

  console.log("user info on onboarding page: => ");
  console.log(userInfo);

  const [image, setImage] = useState("/default_avatar.png");
  const [name, setName] = useState(userInfo?.name || "");
  const [about, setAbout] = useState(userInfo?.about || "");
  const [password, setPassword] = useState("");

  useEffect(() => {

    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!newUser && !storedUserInfo?.email) router.push("/login");
    else if (!newUser && storedUserInfo?.email) router.push("/");
  }, [newUser, userInfo, router]);

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "PNG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const onBoardUser = async () => {
    if (validateDetails()) {
      const email = userInfo?.email;
      const eId = userInfo?.eId;
      const id = userInfo?.id;
      try {
        const base64Response = await fetch(`${image}`);
        const blob = await base64Response.blob();
        setImage(await resizeFile(blob));

        localStorage.setItem('userPassword', JSON.stringify(password));
        const { data } = await axios.post(onBoardUserRoute, {
          id,
          eId,
	        email,
          name,
          about,
          image,
          password,
        });
        if (data.status) {
          dispatch({ type: reducerCases.SET_NEW_USER, newUser: false });
          await dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              eId,
              name,
              email,
              profilePicture : image,
              status: about,
            },
          });

          localStorage.setItem('userInfo', JSON.stringify({     
            id,
            eId,
            name,
            email,
            profilePicture : image,
            status: about,
            isAdmin
          }));
          console.log("userinfo", userInfo);
          console.log("localstogare", localStorage.userInfo);

          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validateDetails = () => {
    if (name.length < 3) {
      // Toast Notification
      alert("enter name");
      return false;
    } else if(password.length < 6){
      alert("Password should be atleast 6 digit long");
      return false;
    }
    return true;
  };

  return (
    <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
      <div className="flex items-center justify-center gap-2">
        <span className="text-7xl">I N T R A S H A R E</span>
        <br/>
        <br/>
        <br/>
      </div>
      <div></div>
      <h2 className="text-2xl ">Create your profile</h2>
      <div className="flex gap-6 mt-6 ">
        <div className="flex flex-col items-center justify-between mt-5 gap-6">
          <Input name="Display Name" state={name} setState={setName} label />
          <Input name="About" state={about} setState={setAbout} label />
          <Input name="New Password" state={password} setState={setPassword} label />
          <div className="flex items-center justify-center">
            <button
              className="bg-search-input-container-background p-5 rounded-lg"
              onClick={onBoardUser}
            >
              Create Profile
            </button>
          </div>
        </div>
        <div>
          <Avatar type="xl" image={image} setImage={setImage} />
        </div>
      </div>
    </div>
  );
}
