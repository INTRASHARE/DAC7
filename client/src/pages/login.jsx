import axios from "axios" ;
import React, { useEffect, useState } from "react";
import { useStateProvider } from "@/context/StateContext";
import { useRouter } from "next/router";
import { reducerCases } from "@/context/constants";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";

import Lottie from "lottie-react";
import animationdata from "../components/common/animation.json";
import { FaCircleUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const [{ userInfo, newUser }, dispatch] = useStateProvider();
  
  useEffect(() => {
    console.log({ userInfo });
    if (userInfo?.id && !newUser) router.push("/");
  }, [userInfo, newUser, router]);

  const [eId, seteId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {

      if (eId && password) {
        const data = await axios.post(CHECK_USER_ROUTE, { eId, password });
        console.log(data);
        if (data.data.status) {
          console.log("user exists");

          if(data.data.data.onBoarding == 0){
            console.log("First time onBoarding");
            dispatch({ type: reducerCases.SET_NEW_USER, newUser: true });
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: {
                id: data.data.data.id,
                eId: data.data.data.eId,
                email: data.data.data.email,
                name: data.data.data.name,
                profileImage: data.data.data.profilePicture,
                status: "available",
              },
            });
           router.push("/onboarding");
          } else {
            console.log("Already onBoarded");
            dispatch({
              type: reducerCases.SET_USER_INFO,
              userInfo: {
                id: data.data.data.id,
                eId: data.data.data.eId,
                email: data.data.data.email,
                name: data.data.data.name,
                profileImage: data.data.data.profilePicture,
                status: data.data.data.about,
              },
            });
            router.push("/");
          }
        } else {
          console.log("user does not exists");
        }
      }

    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="wrapper">
    <div className="animationpart">
    <Lottie animationData={animationdata}></Lottie>
    </div>
    <form onSubmit={handleLogin}>
        <h1>I N T R A S H A R E</h1>
        <h2>L O G I N</h2>
        <div className="input-box">
        <input type="text"  placeholder="Employee ID" name="eid"  
          value={eId}
          onChange={(e) => seteId(e.target.value)} required />
        
        <FaCircleUser className="icon" />
        </div>
    <div className="input-box">
        <input type="password" placeholder="Password" name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <FaLock className="icon"/>
    </div>
    
    <button type="submit" onClick={handleLogin}>LOGIN</button>
    </form>
</div>
  );
}