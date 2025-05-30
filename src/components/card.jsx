import React from "react";
import { useSelector } from "react-redux";

const Card = React.memo(() => {

    const selectedRestaurant = useSelector((state) => state.address.selectedRestaurant);

    return (
        <>
            <div className="card">

                {!selectedRestaurant?.item ? <span>Aucun restauran selectionné</span> :
                    <div>
                        <p >{selectedRestaurant.item.display_name}</p>
                        <button
                            className="bg-[#F0C900] py-2 px-4 font-medium mt-3 rounded-md cursor-pointer hover:bg-[#F0C900]">Continuer</button>
                    </div>
                }

            </div>

        </>
    )
})

export default Card;