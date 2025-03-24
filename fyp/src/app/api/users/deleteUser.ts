export const deleteuser = async (id: number, token: string) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.statusText}`);
    }
    if (response.status === 204) {
      // No content (successful deletion)
      return null;
    }

    const data = await response.json();
    return data;
    // return await response.json();
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};
