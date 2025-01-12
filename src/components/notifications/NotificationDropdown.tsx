// "use client";
// import { useEffect, useState } from "react";
// import { io } from "socket.io-client";

// const socket = io("https://green-leaf-server-site.vercel.app");

// const Notifications = () => {
//   const [notifications, setNotifications] = useState((prev: never[]) => any[]);

//   useEffect(() => {
//     // Listen for notifications
//     socket.on("receive_notification", (data) => {
//       setNotifications((prev: any) => [data, ...prev]);
//     });

//     return () => {
//       socket.off("receive_notification");
//     };
//   }, []);

//   return (
//     <div>
//       <h3 className="font-bold text-lg">Notifications</h3>
//       <ul>
//         {notifications.map((notification:any, index:any) => (
//           <li key={index} className="p-2 border-b">
//             {notification.message}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Notifications;
