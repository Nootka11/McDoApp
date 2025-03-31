import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
// import { store } from './store';
import store from './store.jsx';
import { SearchBox } from './searchBox';


describe('SearchBox', ()=>{
    test('renders the search input and button correctly', ()=>{
        render(
            <Provider store={store }>
                <SearchBox/>

            </Provider>
        );
        const inputElement= screen.getByPlaceholderText(/chercher par ville/i);
        
        const btnElement = screen.getByTestId('search-button')

        expect(inputElement).toBeInTheDocument();
        expect(btnElement).toBeInTheDocument();
    });
    
    // test('verifier si le button est active', async)

    test('affiche un message d’erreur quand aucune ville n’est trouvée', async ()=>{
        render(
            <Provider store={store}>
                <SearchBox/>
            </Provider>
        )
        const inputElement = screen.getByPlaceholderText(/chercher par ville/i);
        const buttonElement = screen.getByTestId('search-button');
        fireEvent.change(inputElement, { target: { value: 'ggggg' } });
        await waitFor(()=> expect(buttonElement).not.toBeDisabled());
        fireEvent.click(buttonElement);
       

        await waitFor(async()=>{
            // Esperar a que el mensaje de error aparezca en el DOM
            const errorMessageContainer = await screen.findByTestId("error-message-container");

            expect(errorMessageContainer).toBeInTheDocument();
                   

        }, {timeout:5000})
        

       
      
    });

    })