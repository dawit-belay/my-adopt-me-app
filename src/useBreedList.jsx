import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

export default function useBreedList(animal) {
    const results = useQuery({
        queryKey:["breeds", animal],
        queryFn:fetchBreedList,
        enabled: !!animal, // only run if animal is truthy
    });

    return [results?.data?.breeds ?? [], results.status];
} 
