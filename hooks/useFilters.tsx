'use client';

import { createContext, useReducer, useContext } from 'react';

interface FiltersContextType {
  filters: FiltersState;
  dispatch: React.Dispatch<FiltersAction>;
}

interface FiltersState {
  searchText: string;
  minPrice: number;
  maxPrice: number;
  productType: string;
//   watchesColor: string[];
//   strapsColor: string[];
//   countries: string[];
  checkboxes: Record<string, string[]>;
  sortedBy: string;
  reverse: boolean;
}

const initialFilters: FiltersState = {
  searchText: '',
  minPrice: 0,
  maxPrice: 0,
  productType: '',
  checkboxes: {},
//   watchesColor: [],
//   strapsColor: [],
//   countries: [],
  sortedBy: 'RELEVANCE',
  reverse: false,
};

type FiltersAction =
  | { type: 'SET_SEARCH_TEXT'; payload: string }
  | { type: 'SET_MIN_PRICE'; payload: number }
  | { type: 'SET_MAX_PRICE'; payload: number }
  | { type: 'SET_PRODUCT_TYPE'; payload: string }
  | { type: 'TOGGLE_CHECKBOXES'; payload: Record<string, string[]> }
//   | { type: 'TOGGLE_WATCH_COLOR'; payload: string[] }
//   | { type: 'TOGGLE_STRAP_COLOR'; payload: string[] }
//   | { type: 'SET_COUNTRIES'; payload: string[] }
  | { type: 'SET_SORTING'; payload: string }
  | { type: 'SET_REVERSE'; payload: boolean };

const filtersReducer = (
  state: FiltersState,
  action: FiltersAction
): FiltersState => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return { ...state, searchText: action.payload };
    case 'SET_MIN_PRICE':
      return { ...state, minPrice: action.payload };
    case 'SET_MAX_PRICE':
      return { ...state, maxPrice: action.payload };
    case 'SET_PRODUCT_TYPE':
      return { ...state, productType: action.payload };
	 case 'TOGGLE_CHECKBOXES':
	   return { ...state, checkboxes: action.payload };
   //  case 'TOGGLE_WATCH_COLOR':
   //    return { ...state, watchesColor: action.payload };
   //  case 'TOGGLE_STRAP_COLOR':
   //    return { ...state, strapsColor: action.payload };
   //  case 'SET_COUNTRIES':
   //    return { ...state, countries: action.payload };
    case 'SET_SORTING':
      return { ...state, sortedBy: action.payload };
    case 'SET_REVERSE':
      return { ...state, reverse: action.payload };
    default:
      return state;
  }
};

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filters, dispatch] = useReducer(filtersReducer, initialFilters);

  return (
    <FiltersContext.Provider value={{ filters, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = (): FiltersContextType => {
  const context = useContext(FiltersContext);

  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }

  return context;
};
