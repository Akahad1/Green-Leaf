"use client";
import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("https://green-leaf-server-site.vercel.app");

export const useSocket = () => {
  useEffect(() => {
    socket.on("newNotification", (data) => {
      alert(`New notification for User ${data.userId}: ${data.message}`);
    });

    return () => {
      socket.off("newNotification");
    };
  }, []);
};

export default socket;
