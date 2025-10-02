"use client";

import { createContext } from "react";

import { ROLES } from "../config/roles";

const UserContext = createContext({
  isLogin: false,
  status: "",
  role: ROLES.GUEST,
});

export default UserContext;
