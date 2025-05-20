import { useQuery } from "@tanstack/react-query";
import { useState, useContext } from "react";
import AdoptedPetContext from "./AdoptedPetContext"
import useBreedList from "./useBreedList";
import Results from "./Results";
import fetchSearch from "./fetchSearch"
const ANIMALS = ["bird", "cat", "dog", "rabit", "reptile"];

const SearchParams = () => {
    const [requestParams, setRequestParams] = useState({
        location:"", animal:"", breed:"",
    });
    const [animal, setAnimal] = useState("");
    const [breeds] = useBreedList(animal);
    const [adoptedPet, _] = useContext(AdoptedPetContext)

    const results = useQuery({
        queryKey:["search", requestParams],
        queryFn:fetchSearch,
    })

    const pets = results?.data?.pets ?? [];

    return (
        <div className="search-params">
            <form
                onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const obj = {
                    animal:formData.get("animal") ?? "",
                    breed:formData.get("breed") ?? "",
                    location:formData.get("location") ?? "",
                };
                setRequestParams(obj);
            }}
            >
                {
                    adoptedPet ? (
                        <div className = "pet image-container">
                            <img src ={adoptedPet.images[0]} alt={adoptedPet.name} />
                        </div>
                    ): null
                }
                <label htmlFor="location">
                    Location
                    <input 
                        id="location" 
                        name="location" 
                        placeholder="location"
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        value={animal}
                        onChange={(e) => {
                        setAnimal(e.target.value);
                        }}
                    >
                        <option />
                        {ANIMALS.map((animal) => (
                        <option key={animal} value={animal}>{animal}</option>
                        ))}
                    </select>
                </label>

                <label htmlFor="breed">
                Breed
                <select
                    id="breed"
                    disabled={breeds.length === 0}
                    name="breed"
                >
                    <option />
                    {breeds.map((breed) => (
                    <option key={breed} value={breed}>
                        {breed}
                    </option>
                    ))}
                </select>
                </label>
                <button>Submit</button>
            </form>
                    <Results pets={pets} />
        </div>
    )
}

export default SearchParams;