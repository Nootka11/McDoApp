import { useEffect, useState } from "react";
import { MapContainer, TileLayer , Marker, Popup, useMap  } from "react-leaflet";
import { SearchBox } from "../components/searchBox";
import { useDispatch, useSelector } from "react-redux";
import { searchMcDonaldsInCity } from "../components/NominatimService";
import { setMcDonalds, setSelectedRestaurant } from "../components/dataSlice";
import Card from "../components/card";

const CenterMap = ({ position }) => {
    const map = useMap();
    map.setView(position, map.getZoom()); // Centrar el mapa en las nuevas coordenadas
    return null;
  };

const Home = () =>{
    // const [coords, setCoords]=useState([48.8566,2.3522])
    // const [bounds,setBounds] = useState(null);
    const dispatch = useDispatch();
    const selectedPlace = useSelector((state) => state.address.selectedPlace );
    const mcDonalds =useSelector((state)=>state.address.mcDonalds)
    const [markerPosition, setMarkerPosition ] = useState([48.8566, 2.3522]);
    const [zoom, setZoom] = useState(12);


    useEffect(()=>{
        if(!selectedPlace ) return;
        // console.log('Home: selectedPlace', selectedPlace)
       
        // Convertimos lat y lon a números
         const latitude = parseFloat(selectedPlace.lat);
         const longitude = parseFloat(selectedPlace.lon);

         const fetchData = async () => {
            const listeMcDonalds = await searchMcDonaldsInCity(selectedPlace.display_name, latitude, longitude);
            setMarkerPosition([latitude,longitude]);
            // console.log('mcdos en Home avant redux: ',listeMcDonalds)
            dispatch(setMcDonalds(listeMcDonalds));
            // console.log('mcdos en Home: ',mcDonalds);

         };
        fetchData();
        
    }, [selectedPlace])

    
    return(
        <>
        <div style={{ height: '802px' , width: '362px'}} 
            className='relative  h-[800px] w-[360px] mt-6 mx-auto'>
        
            
                <SearchBox />
                <Card/>
            
            <div>
                <MapContainer center={markerPosition} zoom={zoom} 
                className='h-full w-full absolute z-0'>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <Marker position={markerPosition}>
                            <Popup>
                                L'addresse selectionnée
                            </Popup>
                    </Marker>

                    {mcDonalds.map((item,index)=>(
                        <Marker  key={index} position={[parseFloat(item.lat),parseFloat(item.lon)]}>
                            <Popup>
                            <div className='flex flex-col gap-3'>
                              {item.display_name}
                              <button 
                              className='px-3 py-2 bg-yellow-400 rounded w-20 font-bold cursor-pointer hover:bg-yellow-500'
                               onClick={()=> dispatch(setSelectedRestaurant({item}))}
                              
                              >
                                Choisir</button>
                              </div>
                            </Popup>
                        </Marker>
                    ))}
                    <CenterMap position={markerPosition}/>

                </MapContainer>
               
            </div>
        </div>
        </>
    )

}
export default Home;