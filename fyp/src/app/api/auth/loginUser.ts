// Should send crendentials to backend and fetch jwt

export const loginUser = async (username: string, password: string) => {
  const response = await fetch("http://127.0.0.1:3000/api/auth/admin/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Invalid username or password");
  }

  return response.json();
};
