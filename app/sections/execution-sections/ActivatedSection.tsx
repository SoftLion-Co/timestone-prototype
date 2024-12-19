"use client";
import { Loader } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { activateAccount } from "@/services/AuthService";

const ActivatedSection = ({ activatedToken }: { activatedToken: string }) => {
  const router = useRouter();

  useEffect(() => {
    const activate = async () => {
      try {
        await activateAccount(activatedToken);
        router.push("/account");
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
      ) : (
        <div className="container flex justify-center">
          <Loader className="animate-spin rounded-full border-4 border-darkBurgundy border-b-transparent w-10 h-10" />
        </div>
      )}
    </div>
  );
};

export default ActivatedSection;
