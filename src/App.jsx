import {Link, BrowserRouter, Routes,Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <header>
      <Link to="/">Adopt me</Link>
    </header>
      <Routes>
        <Route path="/Details/:id" element={<Details />} /> 
        <Route path="/" element={<SearchParams />} /> 
      </Routes>
    </QueryClientProvider>
    
    </BrowserRouter>
  );
};

