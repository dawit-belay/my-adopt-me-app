import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./assets/fetchPet";

const Details = () => {
    const { id } = useParams();
    const results = useQuery({
        queryKey: ["details", id],fetchPet,
    });
    return <h2>{id}</h2>;
  };
  
  export default Details;