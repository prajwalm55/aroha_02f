import React, { useState, useEffect } from "react";
import { FiX, FiCheck, FiSearch, FiUsers } from "react-icons/fi";
// import useGetAllUsers from "../../context/useGetAllUsers";
import useGetAllUsers from "../../context/useGetAllUsers.jsx";

import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../../context/AuthProvider";

function CreateGroupModal({ isOpen, onClose, onGroupCreated }) {
  const [authUser] = useAuth();
  const [allUsers] = useGetAllUsers();
  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter users based on search term and exclude current user
  const filteredUsers = allUsers.filter(user => 
    user._id !== authUser?.user?._id &&
    (user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleMemberToggle = (user) => {
    setSelectedMembers(prev => {
      const isSelected = prev.some(member => member._id === user._id);
      if (isSelected) {
        return prev.filter(member => member._id !== user._id);
      } else {
        return [...prev, user];
      }
    });
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }
    
    if (selectedMembers.length === 0) {
      alert("Please select at least one member");
      return;
    }

    setLoading(true);
    try {
      const token = Cookies.get("jwt");
      const response = await axios.post("/api/group/create", {
        groupName: groupName.trim(),
        memberIds: selectedMembers.map(member => member._id)
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onGroupCreated(response.data);
      handleClose();
    } catch (error) {
      console.error("Error creating group:", error);
      alert(error.response?.data?.error || "Failed to create group");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setGroupName("");
    setSelectedMembers([]);
    setSearchTerm("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        width: "480px",
        maxWidth: "90vw",
        maxHeight: "80vh",
        overflow: "hidden",
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: "1px solid #f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <FiUsers size={20} color="#6366f1" />
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
              Create New Group
            </h3>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              borderRadius: "6px",
            }}
          >
            <FiX size={20} color="#6b7280" />
          </button>
        </div>

        {/* Group Name Input */}
        <div style={{ padding: "24px" }}>
          <label style={{
            display: "block",
            fontSize: "14px",
            fontWeight: "500",
            color: "#374151",
            marginBottom: "8px"
          }}>
            Group Name
          </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Enter group name"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => e.target.style.borderColor = "#6366f1"}
            onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
          />
        </div>

        {/* Search Input */}
        <div style={{ padding: "0 24px 16px" }}>
          <div style={{ position: "relative" }}>
            <FiSearch 
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af"
              }}
              size={16}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search contacts..."
              style={{
                width: "100%",
                padding: "12px 12px 12px 36px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Selected Members */}
        {selectedMembers.length > 0 && (
          <div style={{ padding: "0 24px 16px" }}>
            <div style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: "8px",
              marginBottom: "8px"
            }}>
              {selectedMembers.map(member => (
                <div
                  key={member._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: "20px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    color: "#1e40af"
                  }}
                >
                  <span>{member.fullname}</span>
                  <button
                    onClick={() => handleMemberToggle(member)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0",
                      color: "#1e40af"
                    }}
                  >
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
            <p style={{ 
              fontSize: "12px", 
              color: "#6b7280", 
              margin: 0 
            }}>
              {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
            </p>
          </div>
        )}

        {/* Members List */}
        <div style={{
          maxHeight: "300px",
          overflowY: "auto",
          borderTop: "1px solid #f0f0f0"
        }}>
          {filteredUsers.map(user => {
            const isSelected = selectedMembers.some(member => member._id === user._id);
            return (
              <div
                key={user._id}
                onClick={() => handleMemberToggle(user)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px 24px",
                  cursor: "pointer",
                  backgroundColor: isSelected ? "#f8fafc" : "transparent",
                  borderLeft: isSelected ? "3px solid #6366f1" : "3px solid transparent",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = "#f9fafb";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  flexShrink: 0
                }}>
                  {user.fullname.charAt(0).toUpperCase()}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#111827",
                    marginBottom: "2px"
                  }}>
                    {user.fullname}
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}>
                    {user.email}
                  </div>
                </div>
                
                {isSelected && (
                  <div style={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#6366f1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <FiCheck size={12} color="white" />
                  </div>
                )}
              </div>
            );
          })}
          
          {filteredUsers.length === 0 && (
            <div style={{
              textAlign: "center",
              padding: "40px 24px",
              color: "#6b7280"
            }}>
              No contacts found
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: "20px 24px",
          borderTop: "1px solid #f0f0f0",
          display: "flex",
          gap: "12px",
          justifyContent: "flex-end"
        }}>
          <button
            onClick={handleClose}
            style={{
              padding: "10px 20px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              backgroundColor: "transparent",
              color: "#374151",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleCreateGroup}
            disabled={loading || !groupName.trim() || selectedMembers.length === 0}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              backgroundColor: loading || !groupName.trim() || selectedMembers.length === 0 
                ? "#d1d5db" : "#6366f1",
              color: "white",
              cursor: loading || !groupName.trim() || selectedMembers.length === 0 
                ? "not-allowed" : "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            {loading ? "Creating..." : "Create Group"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateGroupModal;











// import React, { useState, useEffect } from "react";
// import { FiX, FiCheck, FiSearch, FiUsers } from "react-icons/fi";
// import useGetAllUsers from "../../context/useGetAllUsers.jsx";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useAuth } from "../../context/AuthProvider";

// function CreateGroupModal({ isOpen, onClose, onGroupCreated }) {
//   const [authUser] = useAuth();
//   const [allUsers] = useGetAllUsers();
//   const [groupName, setGroupName] = useState("");
//   const [selectedMembers, setSelectedMembers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Debug: Check what tokens are available
//   useEffect(() => {
//     if (isOpen) {
//       console.log("=== TOKEN DEBUG INFO ===");
//       console.log("All cookies:", document.cookie);
//       console.log("JWT from js-cookie:", Cookies.get("jwt"));
//       console.log("JWT from document.cookie:", document.cookie.split(';').find(cookie => cookie.trim().startsWith('jwt=')));
//       console.log("Auth user:", authUser);
//       console.log("LocalStorage items:", Object.keys(localStorage));
//       console.log("SessionStorage items:", Object.keys(sessionStorage));
      
//       // Check localStorage for token
//       const tokenFromLS = localStorage.getItem('jwt') || localStorage.getItem('token') || localStorage.getItem('authToken');
//       console.log("Token from localStorage:", tokenFromLS);
      
//       // Check sessionStorage for token
//       const tokenFromSS = sessionStorage.getItem('jwt') || sessionStorage.getItem('token') || sessionStorage.getItem('authToken');
//       console.log("Token from sessionStorage:", tokenFromSS);
//     }
//   }, [isOpen, authUser]);

//   // Filter users based on search term and exclude current user
//   const filteredUsers = allUsers.filter(user => 
//     user._id !== authUser?.user?._id &&
//     (user.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
//      user.email.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const handleMemberToggle = (user) => {
//     setSelectedMembers(prev => {
//       const isSelected = prev.some(member => member._id === user._id);
//       if (isSelected) {
//         return prev.filter(member => member._id !== user._id);
//       } else {
//         return [...prev, user];
//       }
//     });
//     setError(""); // Clear error when user interacts
//   };

//   const getAuthToken = () => {
//     // Try multiple sources for the token
//     let token = Cookies.get("jwt");
    
//     if (!token) {
//       token = localStorage.getItem('jwt') || localStorage.getItem('token') || localStorage.getItem('authToken');
//     }
    
//     if (!token) {
//       token = sessionStorage.getItem('jwt') || sessionStorage.getItem('token') || sessionStorage.getItem('authToken');
//     }
    
//     // If still no token, try to extract from authUser
//     if (!token && authUser?.token) {
//       token = authUser.token;
//     }
    
//     console.log("Final token found:", token ? "YES" : "NO");
//     return token;
//   };

//   const handleCreateGroup = async () => {
//     setError("");
    
//     if (!groupName.trim()) {
//       setError("Please enter a group name");
//       return;
//     }
    
//     if (selectedMembers.length === 0) {
//       setError("Please select at least one member");
//       return;
//     }

//     setLoading(true);
//     try {
//       const token = getAuthToken();
      
//       if (!token) {
//         setError("Authentication token not found. Please login again.");
//         setLoading(false);
//         return;
//       }

//       console.log("Creating group with:", {
//         groupName: groupName.trim(),
//         memberIds: selectedMembers.map(member => member._id),
//         tokenPresent: !!token,
//         tokenLength: token.length
//       });

//       // Try both ways - with cookies and with Authorization header
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         withCredentials: true,
//       };

//       // Also set cookie manually if not present
//       if (!Cookies.get("jwt")) {
//         Cookies.set("jwt", token, { path: '/', domain: 'localhost' });
//       }

//       const response = await axios.post("http://localhost:4002/api/group/create", {
//         groupName: groupName.trim(),
//         memberIds: selectedMembers.map(member => member._id)
//       }, config);

//       console.log("Group created successfully:", response.data);
      
//       if (onGroupCreated) {
//         onGroupCreated(response.data.group || response.data);
//       }
      
//       handleClose();
//     } catch (error) {
//       console.error("Error creating group:", error);
      
//       if (error.response) {
//         // Server responded with error
//         const errorMessage = error.response.data?.error || `Server error: ${error.response.status}`;
//         setError(errorMessage);
//         console.error("Server error:", error.response.data);
//         console.error("Response status:", error.response.status);
//         console.error("Response headers:", error.response.headers);
//       } else if (error.request) {
//         // Request made but no response
//         setError("Unable to connect to server. Please check if the server is running on port 4002.");
//         console.error("Network error:", error.request);
//       } else {
//         // Something else happened
//         setError("An unexpected error occurred: " + error.message);
//         console.error("Error:", error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setGroupName("");
//     setSelectedMembers([]);
//     setSearchTerm("");
//     setError("");
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: "rgba(0, 0, 0, 0.5)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 1000
//     }}>
//       <div style={{
//         backgroundColor: "#ffffff",
//         borderRadius: "12px",
//         width: "480px",
//         maxWidth: "90vw",
//         maxHeight: "80vh",
//         overflow: "hidden",
//         boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
//       }}>
//         {/* Header */}
//         <div style={{
//           padding: "20px 24px",
//           borderBottom: "1px solid #f0f0f0",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between"
//         }}>
//           <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//             <FiUsers size={20} color="#6366f1" />
//             <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
//               Create New Group
//             </h3>
//           </div>
//           <button
//             onClick={handleClose}
//             style={{
//               background: "none",
//               border: "none",
//               cursor: "pointer",
//               padding: "4px",
//               borderRadius: "6px",
//             }}
//           >
//             <FiX size={20} color="#6b7280" />
//           </button>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div style={{
//             padding: "16px 24px",
//             backgroundColor: "#fee2e2",
//             borderBottom: "1px solid #fecaca",
//             color: "#dc2626",
//             fontSize: "14px"
//           }}>
//             {error}
//           </div>
//         )}

//         {/* Debug Info - Remove this in production */}
//         <div style={{
//           padding: "12px 24px",
//           backgroundColor: "#f3f4f6",
//           borderBottom: "1px solid #e5e7eb",
//           fontSize: "12px",
//           color: "#6b7280"
//         }}>
//           Debug: Token {getAuthToken() ? "✅ Found" : "❌ Missing"} | 
//           Cookies: {Cookies.get("jwt") ? "✅" : "❌"} | 
//           Auth User: {authUser ? "✅" : "❌"}
//         </div>

//         {/* Group Name Input */}
//         <div style={{ padding: "24px" }}>
//           <label style={{
//             display: "block",
//             fontSize: "14px",
//             fontWeight: "500",
//             color: "#374151",
//             marginBottom: "8px"
//           }}>
//             Group Name *
//           </label>
//           <input
//             type="text"
//             value={groupName}
//             onChange={(e) => setGroupName(e.target.value)}
//             placeholder="Enter group name"
//             style={{
//               width: "100%",
//               padding: "12px",
//               border: "1px solid #d1d5db",
//               borderRadius: "8px",
//               fontSize: "14px",
//               outline: "none",
//               transition: "border-color 0.2s",
//             }}
//             onFocus={(e) => e.target.style.borderColor = "#6366f1"}
//             onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
//           />
//         </div>

//         {/* Search Input */}
//         <div style={{ padding: "0 24px 16px" }}>
//           <div style={{ position: "relative" }}>
//             <FiSearch 
//               style={{
//                 position: "absolute",
//                 left: "12px",
//                 top: "50%",
//                 transform: "translateY(-50%)",
//                 color: "#9ca3af"
//               }}
//               size={16}
//             />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               placeholder="Search contacts..."
//               style={{
//                 width: "100%",
//                 padding: "12px 12px 12px 36px",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "8px",
//                 fontSize: "14px",
//                 outline: "none",
//               }}
//             />
//           </div>
//         </div>

//         {/* Selected Members */}
//         {selectedMembers.length > 0 && (
//           <div style={{ padding: "0 24px 16px" }}>
//             <div style={{ 
//               display: "flex", 
//               flexWrap: "wrap", 
//               gap: "8px",
//               marginBottom: "8px"
//             }}>
//               {selectedMembers.map(member => (
//                 <div
//                   key={member._id}
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "6px",
//                     backgroundColor: "#eff6ff",
//                     border: "1px solid #bfdbfe",
//                     borderRadius: "20px",
//                     padding: "6px 12px",
//                     fontSize: "12px",
//                     color: "#1e40af"
//                   }}
//                 >
//                   <span>{member.fullname}</span>
//                   <button
//                     onClick={() => handleMemberToggle(member)}
//                     style={{
//                       background: "none",
//                       border: "none",
//                       cursor: "pointer",
//                       padding: "0",
//                       color: "#1e40af"
//                     }}
//                   >
//                     <FiX size={14} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <p style={{ 
//               fontSize: "12px", 
//               color: "#6b7280", 
//               margin: 0 
//             }}>
//               {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
//             </p>
//           </div>
//         )}

//         {/* Members List */}
//         <div style={{
//           maxHeight: "300px",
//           overflowY: "auto",
//           borderTop: "1px solid #f0f0f0"
//         }}>
//           {filteredUsers.map(user => {
//             const isSelected = selectedMembers.some(member => member._id === user._id);
//             return (
//               <div
//                 key={user._id}
//                 onClick={() => handleMemberToggle(user)}
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "12px",
//                   padding: "16px 24px",
//                   cursor: "pointer",
//                   backgroundColor: isSelected ? "#f8fafc" : "transparent",
//                   borderLeft: isSelected ? "3px solid #6366f1" : "3px solid transparent",
//                   transition: "all 0.2s ease"
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isSelected) {
//                     e.currentTarget.style.backgroundColor = "#f9fafb";
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isSelected) {
//                     e.currentTarget.style.backgroundColor = "transparent";
//                   }
//                 }}
//               >
//                 <div style={{
//                   width: "40px",
//                   height: "40px",
//                   borderRadius: "50%",
//                   backgroundColor: "#e5e7eb",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   fontSize: "16px",
//                   fontWeight: "600",
//                   color: "#374151",
//                   flexShrink: 0
//                 }}>
//                   {user.fullname.charAt(0).toUpperCase()}
//                 </div>
                
//                 <div style={{ flex: 1, minWidth: 0 }}>
//                   <div style={{
//                     fontSize: "14px",
//                     fontWeight: "500",
//                     color: "#111827",
//                     marginBottom: "2px"
//                   }}>
//                     {user.fullname}
//                   </div>
//                   <div style={{
//                     fontSize: "12px",
//                     color: "#6b7280",
//                     overflow: "hidden",
//                     textOverflow: "ellipsis",
//                     whiteSpace: "nowrap"
//                   }}>
//                     {user.email}
//                   </div>
//                 </div>
                
//                 {isSelected && (
//                   <div style={{
//                     width: "20px",
//                     height: "20px",
//                     borderRadius: "50%",
//                     backgroundColor: "#6366f1",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center"
//                   }}>
//                     <FiCheck size={12} color="white" />
//                   </div>
//                 )}
//               </div>
//             );
//           })}
          
//           {filteredUsers.length === 0 && (
//             <div style={{
//               textAlign: "center",
//               padding: "40px 24px",
//               color: "#6b7280"
//             }}>
//               {allUsers.length === 0 ? "Loading contacts..." : "No contacts found"}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div style={{
//           padding: "20px 24px",
//           borderTop: "1px solid #f0f0f0",
//           display: "flex",
//           gap: "12px",
//           justifyContent: "flex-end"
//         }}>
//           <button
//             onClick={handleClose}
//             disabled={loading}
//             style={{
//               padding: "10px 20px",
//               border: "1px solid #d1d5db",
//               borderRadius: "8px",
//               backgroundColor: "transparent",
//               color: "#374151",
//               cursor: loading ? "not-allowed" : "pointer",
//               fontSize: "14px",
//               fontWeight: "500",
//               opacity: loading ? 0.6 : 1
//             }}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleCreateGroup}
//             disabled={loading || !groupName.trim() || selectedMembers.length === 0}
//             style={{
//               padding: "10px 20px",
//               border: "none",
//               borderRadius: "8px",
//               backgroundColor: loading || !groupName.trim() || selectedMembers.length === 0 
//                 ? "#d1d5db" : "#6366f1",
//               color: "white",
//               cursor: loading || !groupName.trim() || selectedMembers.length === 0 
//                 ? "not-allowed" : "pointer",
//               fontSize: "14px",
//               fontWeight: "500"
//             }}
//           >
//             {loading ? "Creating..." : "Create Group"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateGroupModal;