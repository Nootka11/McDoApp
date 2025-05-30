import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import {  Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import {setSelectedRestaurant} from "./dataSlice.jsx"
import Card from "./card.jsx"; 

const createTestStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        address: (state = initialState.address, action) => {
          switch (action.type) {
            case setSelectedRestaurant.type:
              return {
                ...state,
                selectedRestaurant: action.payload,
              };
            default:
              return state;
          }
        },
      },
    });
  };


describe("Card Component", () => {
    test("muestra mensaje cuando no hay restaurante seleccionado", () => {
    
        const customStore = createTestStore({
            address: {
              selectedRestaurant: null,  // No hay restaurante seleccionado
            },
          });

        render(
            <Provider store={customStore}>
                <Card />
            </Provider>
        );

        expect(screen.getByText("Aucun restauran selectionné")).toBeInTheDocument();
    });

    test('Home and Card interaction: display restaurant ', ()=>{
       
        const selectedRestaurant = {
            item : {
                display_name: "McDonald's, Accès McDrive, Malemort-sur-Corrèze, Malemort, Brive-la-Gaillarde, Corrèze, Nouvelle-Aquitaine, France métropolitaine, 19360, France",

            }
            
          };
          const customStore = createTestStore({
            address: {
              selectedRestaurant, 
            },
          });
          
      
        render(
            <Provider store={customStore}>
                <Card/>
            </Provider>
        );
        expect(screen.getByText("McDonald's, Accès McDrive, Malemort-sur-Corrèze, Malemort, Brive-la-Gaillarde, Corrèze, Nouvelle-Aquitaine, France métropolitaine, 19360, France")).toBeInTheDocument();
    
    })

  
});
