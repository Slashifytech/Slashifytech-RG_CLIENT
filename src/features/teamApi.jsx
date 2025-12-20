import apiurl from "../utils";

export const getTeams = async () => {
  try {
    const res = await apiurl.get("/getTeams");
    return res.data
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while fetching data"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};


export const updateTeams = async (employeeName, leadName, location, teamName) => {
  try {
    const res = await apiurl.patch("/update-team", null, {
      params: {
        employeeName: employeeName,
        teamName: teamName,
        leadName: leadName,
        location: location,

      },
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "Error while updating team"
      );
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
