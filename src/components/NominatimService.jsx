import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const BASE_URL = "https://nominatim.openstreetmap.org/search";

export const citySearch = async (address) => {
           
    if(!address.trim()) return;
        try {
      
                const { data } = await axios.get(BASE_URL,{ 
                  params: {
                    format: "json",
                    q: address,
                    addressdetails:1,
                    limit:5,
                  },
                })
                
                
                const citySuggestion = data.filter( 
                  item =>  item.addresstype==="town" || item.addresstype ==="city" || item.addresstype === "village" 
                );
                
                return citySuggestion;
              
                
            } catch (err) {
                console.log('Error al buscar la ciudad', err)
                throw err; 
               
            }       
    }; 

    export const searchMcDonaldsInCity = async (cityName, lat, lon) => {
        
                try {
                  const radius = 0.09; // Radio de búsqueda en grados
                  const minLon = lon - radius;
                  const maxLon = lon + radius;
                  const minLat = lat - radius;
                  const maxLat = lat + radius;
              
                  const encodedQuery = encodeURIComponent(`McDonald's ${cityName}`);
                  
                  const url = `${BASE_URL}?q=${encodedQuery}&format=jsonv2&bounded=1&viewbox=${minLon},${maxLat},${maxLon},${minLat}&limit=30`;
                  
                  const response = await fetch(url);
                  if (!response.ok) {
                    throw new Error("Error al buscar McDonald's en Nominatim");
                  }
              
                  const data = await response.json();
                  
                  return data;
                } catch (error) {
                  console.error("Error al buscar McDonald's:", error);
                }
              };

export const useCitySearch = (address) =>{
  return useQuery({
    queryKey:['cities', address],
    queryFn:() => citySearch(address),
    enabled: !!address,
    staleTime:1000 * 60 *5,
  });


}