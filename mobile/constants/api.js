// step320: now lets export rhe API URL from here, so that it can be used now anywhere we want, thus here below.

// step321: see the next steps in create.jsx file now there.

// export const API_URL = "http://localhost:5001/api";
// export const API_URL = "https://trackmate-api-do1y.onrender.com/api";

import { Platform } from "react-native";

export const API_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:5001/api"
    : "http://localhost:5001/api";
