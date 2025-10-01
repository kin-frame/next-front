"use client";

import { createContext } from "react";

const UserContext = createContext({
  isLogin: false,
});

export default UserContext;
