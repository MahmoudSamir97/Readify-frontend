import React, { createContext, useState } from "react";

export const imageContext = createContext();
function ProfileImageContext(props) {
  let [profileImage, setProfileImage] = useState("");
  return (
    <imageContext.Provider value={{ profileImage, setProfileImage }}>
      {props.children}
    </imageContext.Provider>
  );
}

export default ProfileImageContext;
