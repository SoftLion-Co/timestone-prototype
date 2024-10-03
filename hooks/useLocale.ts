"use client";
import { useEffect, useState } from "react";

const useLocale = () => {
  const [locale, setLocale] = useState<string>("");

  useEffect(() => {
    const updateLocale = () => {
      const pathname = window.location.pathname;
      const pathParts = pathname.split("/");
      const initialLocale =
        pathParts[1] === "form" ? pathParts[2] : pathParts[1];
      setLocale(initialLocale);
    };

    window.addEventListener("popstate", updateLocale);
    updateLocale();

    return () => {
      window.removeEventListener("popstate", updateLocale);
    };
  }, []);

  return locale;
};

export default useLocale;
