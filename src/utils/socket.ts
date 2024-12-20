"use client";
import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

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
