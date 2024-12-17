'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PageInfo {
  startCursor: string | '';
  endCursor: string | '';
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PaginationContextProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  goToPage: (page: number) => void;
  pageInfo: PageInfo;
  setPageInfo: (info: PageInfo) => void;
}

const PaginationContext = createContext<PaginationContextProps | undefined>(
  undefined
);

export const PaginationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    startCursor: '',
    endCursor: '',
    hasNextPage: true,
    hasPreviousPage: false,
  });

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <PaginationContext.Provider
      value={{
        currentPage,
		  setCurrentPage,
        totalPages,
        setTotalPages,
        goToPage,
        pageInfo,
        setPageInfo,
      }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const useCustomPagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(
      'useCustomPagination must be used within a PaginationProvider'
    );
  }
  return context;
};
