// import React from "react";
// import Left from "./home/Leftpart/Left";
// import Right from "./home/Rightpart/Right";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import { useAuth } from "./context/AuthProvider";
// import { Toaster } from "react-hot-toast";

// import { Navigate, Route, Routes } from "react-router-dom";
// function App() {
//   const [authUser, setAuthUser] = useAuth();
//   console.log(authUser);
//   return (
//     <>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             authUser ? (
//               // <div className="flex h-screen">
//               //   <Left />
//               //   <Right />
//               // </div>
//               <div className="drawer lg:drawer-open">
//                 <input
//                   id="my-drawer-2"
//                   type="checkbox"
//                   className="drawer-toggle"
//                 />
//                 <div className="drawer-content flex flex-col items-center justify-center">
//                   <Right />
//                 </div>
//                 <div className="drawer-side">
//                   <label
//                     htmlFor="my-drawer-2"
//                     aria-label="close sidebar"
//                     className="drawer-overlay"
//                   ></label>
//                   <ul className="menu w-80 min-h-full bg-black text-base-content">
//                     <Left />
//                   </ul>
//                 </div>
//               </div>
//             ) : (
//               <Navigate to={"/login"} />
//             )
//           }
//         />
//         <Route
//           path="/login"
//           element={authUser ? <Navigate to="/" /> : <Login />}
//         />
//         <Route
//           path="/signup"
//           element={authUser ? <Navigate to="/" /> : <Signup />}
//         />
//       </Routes>
//       <Toaster />
//     </>
//   );
// }

// export default App;







// import React, { useEffect, useState } from "react";
// import Left from "./home/Leftpart/Left";
// import Right from "./home/Rightpart/Right";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import { useAuth } from "./context/AuthProvider";
// import { Toaster } from "react-hot-toast";
// import { Navigate, Route, Routes } from "react-router-dom";
// import axios from "axios";

// function App() {
//   const [authUser] = useAuth();
//   const [chatData, setChatData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch data from backend
//   useEffect(() => {
//     if (authUser) {
//       axios
//         .get("http://localhost:5000/api/chats") // Update API endpoint
//         .then((res) => {
//           setChatData(res.data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching chat data:", err);
//           setLoading(false);
//         });
//     }
//   }, [authUser]);

//   if (!authUser) {
//     return (
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="*" element={<Navigate to="/login" />} />
//       </Routes>
//     );
//   }

//   return (
//     <>
//       <div style={styles.container}>
//         {/* Left Sidebar */}
//         <div style={styles.sidebar}>
//           <Left chatData={chatData} loading={loading} />
//         </div>

//         {/* Main Chat Area */}
//         <div style={styles.main}>
//           <Right chatData={chatData} />
//         </div>
//       </div>

//       <Toaster />
//     </>
//   );
// }

// // Inline CSS Styles
// const styles = {
//   container: {
//     display: "flex",
//     height: "100vh",
//     backgroundColor: "#f8f9fa",
//     fontFamily: "Arial, sans-serif",
//   },
//   sidebar: {
//     width: "300px",
//     backgroundColor: "#ffffff",
//     borderRight: "1px solid #ddd",
//     padding: "10px",
//     overflowY: "auto",
//   },
//   main: {
//     flex: 1,
//     backgroundColor: "#f1f3f6",
//     display: "flex",
//     flexDirection: "column",
//   },
// };

// export default App;




// claude u






import React, { useEffect, useState } from "react";
import Left from "./home/Leftpart/Left";
import Right from "./home/Rightpart/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import axios from "axios";

function App() {
  const [authUser] = useAuth();
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from backend
  useEffect(() => {
    if (authUser) {
      axios
        .get("http://localhost:5000/api/chats") // Update API endpoint
        .then((res) => {
          setChatData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching chat data:", err);
          setLoading(false);
        });
    }
  }, [authUser]);

  if (!authUser) {
    return (
      <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    );
  }

  return (
    <>
      <div style={styles.container}>
        {/* Left Sidebar */}
        <div style={styles.sidebar}>
          <Left chatData={chatData} loading={loading} />
        </div>

        {/* Main Chat Area */}
        <div style={styles.main}>
          <Right chatData={chatData} />
        </div>
      </div>

      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
            borderRadius: '8px'
          }
        }}
      />
    </>
  );
}

// Updated styles to match the modern interface
const styles = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#1a1a1a",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
    overflow: "hidden"
  },
  sidebar: {
    width: "380px",
    backgroundColor: "#1a1a1a",
    borderRight: "1px solid #3e3e42",
    display: "flex",
    flexDirection: "column",
    minWidth: "380px"
  },
  main: {
    flex: 1,
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
    minWidth: 0 // Prevents flex item from overflowing
  }
};

export default App;