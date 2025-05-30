import {useState, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext"
import ErrorBoundary from "./ErrorBoundary";
import fetchPet from "./fetchPet";
import Carousel from "./Carousel";
import Modal from "./Modal"


const Details = () => {
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate();
    const [_, setAdoptedPet] = useContext(AdoptedPetContext);
    const { id } = useParams();
    const results = useQuery({
        queryKey:["details", id],
        queryFn:fetchPet,
    });
    if(results.isLoading){
        return (
            <div className="loading-pane">
                <h1 className="loader"></h1>
            </div>
        );
    }

    const pet = results.data.pets[0];

    return(
        <div className = "details">
            <Carousel images={pet.images}/>
            <div>
                <h1>{pet.name}</h1>
                <h2>
                    {pet.animal} - {pet.city}, - {pet.state}
                    <button onClick = {() => setShowModal(true)}>Adopt {pet.name}</button>
                    <p>{pet.description}</p>
                    {
                        showModal ?
                        (
                            <Modal>
                                <div>
                                    <h1>Would you like to adopt {pet.name}</h1>
                                    <div className="buttons">
                                        <button
                                            onClick = {()=>{
                                                setAdoptedPet(pet);
                                                navigate("/");
                                            }}
                                        >Yes</button>
                                        <button onClick = {() => setShowModal(false)}>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ): null
                    }
                </h2>
            </div>
        </div>
    );
  };

  function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
  export default DetailsErrorBoundary;