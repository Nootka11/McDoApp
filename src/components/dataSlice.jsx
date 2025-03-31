import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'address',
    initialState: {
        address: '',
        suggestions:[],
        selectedPlace: null,
        mcDonalds:[],
        selectedRestaurant:null,
    },
    reducers:{
       
        setAddress: (state,action) => {
            state.address = action.payload;
        },
        setSuggestions: (state,action) => {
            state.suggestions = action.payload;
        },
        selectSuggestion: (state, action ) =>{
            state.selectedPlace = action.payload;
            state.suggestions = [];
        },
        setMcDonalds:(state, action) =>{
            state.mcDonalds = action.payload;
        },
        setSelectedRestaurant:(state,action) =>{
            state.selectedRestaurant = action.payload;
        },
        resetAdress: (state)=>{
            state.address = '';
            state.suggestions= [];
            state.selectedPlace = null;
        },
    },

});

export const { setAddress, setSuggestions, selectSuggestion, resetAdress, setMcDonalds, setSelectedRestaurant} = dataSlice.actions;

export default dataSlice.reducer;