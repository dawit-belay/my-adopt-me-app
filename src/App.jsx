import { useState } from "react";
import {Link, BrowserRouter, Routes,Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetContext"
import SearchParams from "./SearchParams";
import Details from "./Details";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cachTime: Infinity,
    },
  },
});
export default function App() {
  const adoptedPet = useState(null);
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AdoptedPetContext.Provider value={adoptedPet}>
        <header>
          <Link to="/">Adopt me</Link>
        </header>
          <Routes>
            <Route path="/Details/:id" element={<Details />} /> 
            <Route path="/" element={<SearchParams />} /> 
          </Routes>
      </AdoptedPetContext.Provider>
      
    </QueryClientProvider>
    
    </BrowserRouter>
  );
};

