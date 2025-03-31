import { useDispatch, useSelector } from "react-redux"
import { selectSuggestion, setAddress, setSuggestions, setSelectedRestaurant } from "./dataSlice";
import  {  useCallback, useMemo, useState } from "react";
import { citySearch} from "./NominatimService";
import { debounce } from "lodash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch,  faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export const SearchBox = () =>{
    
    const dispatch = useDispatch();
    const  address  = useSelector((state)=>state.address.address);
    const  suggestions = useSelector((state)=>state.address.suggestions);
    
   

     const [error, setErrors]= useState();
    
    const onInputChange = useMemo(
        ()=>
            debounce((e)=>{
                setErrors("");
                dispatch(setAddress(e.target.value));   
            }, 500),[dispatch]
    )

    const handleSearch = useCallback( async () =>{  
        dispatch(setSelectedRestaurant());
        
        if (!address.trim()) {
            setErrors("Veuillez entrer une ville.");
            return; 
        }      
        const results = await citySearch(address);       
        if(results){
            dispatch(setSuggestions(results));  
                  
        }
        if (results && results.length <= 0) {
            setErrors("Nous n'avons pas trouvé de villes.");
        }
             

        
    },[address, dispatch] )

    const handleSelectCity = async (item) =>{
            dispatch(selectSuggestion(item));
    }


  

    return(
        <>
        <div className="box__search">
            <span>Rechercher un restaurant</span>
            <div className="flex items-center mt-1">
                <input type="text"
                onChange={onInputChange}                        
                placeholder="Chercher par ville"
                className="input__search"
                />

             
            <button
            data-testid="search-button"
            onClick={() => handleSearch(address)} 
            
           className={`btn__search ${!address.trim() ? "btn__disabled" : ""}`}
         
           disabled={!address.trim()}
             > 
             <FontAwesomeIcon icon={faSearch} />
            </button>          
           

            </div>
           
            
            {error && (
                    <div className="error-message text-red-800 font-semibold pt-1"
                    data-testid="error-message-container">
                        <span role="img" aria-label="error">
                        <FontAwesomeIcon icon={faTriangleExclamation} />
                        </span>
                        {error}
                    </div>
                )}

           
            <ul>
         
                {suggestions.map((item,index)=>(
                    <li key={index}
                    onClick={() => {handleSelectCity(item)}}
                    className="border border-slate-300 bg-white p-1 mt-2 rounded cursor-pointer">
                        {item.display_name}
                    </li>
                    )
                )}
            </ul>
            
        </div>
        </>
        
    )
}

