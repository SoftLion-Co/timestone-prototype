"use client";
import { Loader } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { removeReceiver } from "@/services/SubscribeService";

import Button from "@/components/ButtonComponent";

const UnsubscribeSection = ({ email }: { email: string }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const remove = async () => {
      try {
        await removeReceiver(email);
        setLoading(false);
      } catch (error) {
        console.error("Failed to remove", error);
      }
    };

    remove();
  }, []);

  return (
    <div className="container">
      {email === "" ? (
        <p>Невірний запит, невірний email.</p>
      ) : loading ? (
        <div className="container flex justify-center">
          <Loader className="animate-spin rounded-full border-4 border-darkBurgundy border-b-transparent w-10 h-10" />
        </div>
      ) : (
        <Button
        href="/"
        tag="a"
        text="Return to Homepage"
        className=" mb-[10px] focus:outline-none focus:ring-0 cursor-pointer"
      />
      )}
    </div>
  );
};

export default UnsubscribeSection;
