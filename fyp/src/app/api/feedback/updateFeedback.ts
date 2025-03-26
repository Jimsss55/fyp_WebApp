export const updateFeedback = async (
  id: number,
  token: string,
  status: number
) => {
  try {
    const response = await fetch(`http://127.0.0.1:3000/api/feedback/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    if (!response.ok) {
      throw new Error(`Failed to update feedback: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating feedback", error);
    throw error;
  }
};
