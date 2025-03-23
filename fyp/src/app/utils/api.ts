import { getCookie } from "./cookieValue";

export const fetchWithAuth = async () => {
  const token = getCookie("accessToken");
  if (!token) {
    throw new Error("No token found, please login.");
  }

  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.error("Response status:", response.status);
      throw new Error("Failed to fetch Users");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Users:", error);
    throw error;
  }
};
