"use client";
import { Loader } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { activateAccount } from "@/services/AuthService";

import Button from "@/components/ButtonComponent";

//!добавити обробку помилки, router on account, to set tokens
const ActivatedSection = ({ activatedToken }: { activatedToken: string }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const activate = async () => {
      try {
        await activateAccount(activatedToken);
        setLoading(false);
      } catch (error) {
        console.error("Failed to activate", error);
      }
    };

    activate();
  }, []);

  return (
    <div className="container">
      {activatedToken === "" ? (
        <p>Невірний запит, невірний token.</p>
      ) : loading ? (
        <div className="container flex justify-center">
          <Loader className="animate-spin rounded-full border-4 border-darkBurgundy border-b-transparent w-10 h-10" />
        </div>
      ) : (
        <Button
          href="/account"
          tag="a"
          text="Return to Homepage"
          className=" mb-[10px] focus:outline-none focus:ring-0 cursor-pointer"
        />
      )}
    </div>
  );
};

export default ActivatedSection;