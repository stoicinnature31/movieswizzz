import { create } from "zustand";

const useSearchStore = create((set) => ({
  searchResults: [],
  setSearchResults: (results) => set({ searchResults: results }),
}));

export default useSearchStore;
