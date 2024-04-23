import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
     peers: []
};



const conferenceSlice = createSlice({
     name: "conference",
     initialState,
     reducers: {
          resetState: () => {
			return initialState;
		},
          addPeer: (state, payload) => {
               state.peers = [...state.peers, action.payload];
          }
     }
})