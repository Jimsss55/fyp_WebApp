export const fetchFeedback = async (token: string) => {
  try {
    const response = await fetch("http://127.0.0.1:3000/api/feedback/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch feedback: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching feedback", error);
    throw error;
  }
};
