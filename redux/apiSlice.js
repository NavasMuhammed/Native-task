import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};
export const fetchApiData = createAsyncThunk("api/fetchData", async () => {
  try {
    const response = await axios.get(
      "https://api.unsplash.com/photos?page=1&client_id=" +
        "Kc3uHwKhOzAptCjiS_usZhGfA4aQHP17gwcBvuV6g-s"
    );

    jsonData = response.data;
    // console.log("****");
    jsonData.forEach((item) => {
      // console.log("////");
      // console.log(item.urls.small);
      // console.log(item.alt_description);
    });
    const newArray = jsonData.map((item, index) => ({
      id: index + 1,
      selected: false,
      url: item.urls.small,
      description: item.alt_description,
    }));
    // console.log(newArray);
    return newArray;
  } catch (error) {
    throw Error("Failed to fetch API data");
  }
});

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default apiSlice.reducer;
