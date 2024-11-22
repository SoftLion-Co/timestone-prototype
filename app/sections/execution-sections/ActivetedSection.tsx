"use client";
import React, {useEffect} from "react";
import { useRouter } from 'next/router';
import { activateAccount } from "@/services/AuthService";

//!доробити логіку

const ActivatingSection = ({ activatedToken }: {activatedToken: string}) => {
	// const router = useRouter();

	useEffect(() => {
		const sendToken = async() => {
			const response = await activateAccount(activatedToken);
			//set tokens in context
			// router.push('/');
		}
		sendToken();
	 }, [activatedToken]);

  return (
    <div>
      <p>Activating...</p>
    </div>
  );
};

export default ActivatingSection;
