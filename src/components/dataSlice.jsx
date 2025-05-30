import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: 'address',
    initialState: {
        address: '',                // texte saisi par l’utilisateur
        suggestions:[],             // suggestions de villes
        selectedPlace: null,        // ville sélectionnée
        mcDonalds:[],               // résultats McDonald’s
        selectedRestaurant:null,    // restaurant sélectionné
    },
    reducers:{
        // met à jour l’adresse saisie
        setAddress: (state,action) => {
            state.address = action.payload;
        },

        //enregistre les suggestions
        setSuggestions: (state,action) => {
            state.suggestions = action.payload;
        },

        // sélectionne une ville et vide les suggestions
        selectSuggestion: (state, action ) =>{
            state.selectedPlace = action.payload;
            state.suggestions = [];
        },

        // enregistre les restaurants trouvés
        setMcDonalds:(state, action) =>{
            state.mcDonalds = action.payload;
        },

        // sélectionne un restaurant
        setSelectedRestaurant:(state,action) =>{
            state.selectedRestaurant = action.payload;
        },

        // réinitialise l’adresse et les résultats
        resetAdress: (state)=>{
            state.address = '';
            state.suggestions= [];
            state.selectedPlace = null;
        },
    },

});

export const { setAddress, setSuggestions, selectSuggestion, resetAdress, setMcDonalds, setSelectedRestaurant} = dataSlice.actions;

export default dataSlice.reducer;