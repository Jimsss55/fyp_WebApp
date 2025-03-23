"use client";

import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";
import { useRouter } from "next/navigation";

const RoutesPage = () => {
  interface User {
    username: string;
  }

  const handleLogout = () => {
    document.cookie = "accessToken=; path=/; max-age=0";
    router.push("/login");
  };

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchWithAuth();
        console.log("User data:", data);
        setUser(data);
      } catch (error) {
        console.error("Error fetching users:", error);
        router.push("/login");
      }
    };

    fetchUser();
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.username}!</h2>
      <button
        onClick={() => {
          handleLogout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default RoutesPage;
