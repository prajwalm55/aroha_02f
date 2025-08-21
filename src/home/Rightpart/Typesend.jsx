// import React, { useState } from "react";
// import { IoSend } from "react-icons/io5";
// import { FiPaperclip, FiSmile } from "react-icons/fi";
// import useSendMessage from "../../context/useSendMessage.js";
//
// function Typesend() {
//   const [message, setMessage] = useState("");
//   const { sendMessages } = useSendMessage();
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;
//     await sendMessages(message);
//     setMessage("");
//   };
//
//   return (
//     <div style={{
//       padding: "20px 25px",
//       borderTop: "1px solid #f0f0f5",
//       backgroundColor: "#ffffff",
//       boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.05)"
//     }}>
//       <form onSubmit={handleSubmit} style={{
//         display: "flex",
//         alignItems: "center",
//         gap: "12px"
//       }}>
//         {/* Attachment button */}
//         <button
//           type="button"
//           style={{
//             width: "44px",
//             height: "44px",
//             borderRadius: "50%",
//             border: "none",
//             backgroundColor: "#f2f2f7",
//             color: "#86868b",
//             cursor: "pointer",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             transition: "all 0.2s ease"
//           }}
//           onMouseEnter={(e) => {
//             e.target.style.backgroundColor = "#007aff";
//             e.target.style.color = "#ffffff";
//             e.target.style.transform = "scale(1.05)";
//           }}
//           onMouseLeave={(e) => {
//             e.target.style.backgroundColor = "#f2f2f7";
//             e.target.style.color = "#86868b";
//             e.target.style.transform = "scale(1)";
//           }}
//         >
//           <FiPaperclip size={18} />
//         </button>
//
//         {/* Message input */}
//         <div style={{
//           flex: 1,
//           position: "relative",
//           backgroundColor: "#f2f2f7",
//           borderRadius: "24px",
//           border: "2px solid transparent",
//           transition: "all 0.2s ease"
//         }}>
//           <input
//             type="text"
//             placeholder="Your message"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "12px 50px 12px 20px",
//               borderRadius: "24px",
//               border: "none",
//               outline: "none",
//               backgroundColor: "transparent",
//               fontSize: "15px",
//               color: "#1d1d1f",
//               fontWeight: "400"
//             }}
//             onFocus={(e) => {
//               e.target.parentElement.style.borderColor = "#007aff";
//               e.target.parentElement.style.backgroundColor = "#ffffff";
//               e.target.parentElement.style.boxShadow = "0 0 0 3px rgba(0, 122, 255, 0.1)";
//             }}
//             onBlur={(e) => {
//               e.target.parentElement.style.borderColor = "transparent";
//               e.target.parentElement.style.backgroundColor = "#f2f2f7";
//               e.target.parentElement.style.boxShadow = "none";
//             }}
//           />
//
//           {/* Emoji button */}
//           <button
//             type="button"
//             style={{
//               position: "absolute",
//               right: "8px",
//               top: "50%",
//               transform: "translateY(-50%)",
//               width: "36px",
//               height: "36px",
//               borderRadius: "50%",
//               border: "none",
//               backgroundColor: "transparent",
//               color: "#86868b",
//               cursor: "pointer",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//               transition: "all 0.2s ease"
//             }}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = "#e5e5e7";
//               e.target.style.transform = "translateY(-50%) scale(1.1)";
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = "transparent";
//               e.target.style.transform = "translateY(-50%) scale(1)";
//             }}
//           >
//             <FiSmile size={18} />
//           </button>
//         </div>
//
//         {/* Send button */}
//         <button
//           type="submit"
//           disabled={!message.trim()}
//           style={{
//             width: "44px",
//             height: "44px",
//             borderRadius: "50%",
//             border: "none",
//             backgroundColor: message.trim() ? "#007aff" : "#e5e5e7",
//             color: message.trim() ? "white" : "#86868b",
//             cursor: message.trim() ? "pointer" : "not-allowed",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             transition: "all 0.3s ease",
//             boxShadow: message.trim() ? "0 2px 12px rgba(0, 122, 255, 0.3)" : "none",
//             transform: message.trim() ? "scale(1)" : "scale(0.95)"
//           }}
//           onMouseEnter={(e) => {
//             if (message.trim()) {
//               e.target.style.transform = "scale(1.05)";
//               e.target.style.boxShadow = "0 4px 20px rgba(0, 122, 255, 0.4)";
//             }
//           }}
//           onMouseLeave={(e) => {
//             if (message.trim()) {
//               e.target.style.transform = "scale(1)";
//               e.target.style.boxShadow = "0 2px 12px rgba(0, 122, 255, 0.3)";
//             }
//           }}
//         >
//           <IoSend size={18} />
//         </button>
//       </form>
//     </div>
//   );
// }
//
// export default Typesend;








import React, { useState, useRef, useEffect } from "react";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
    const [message, setMessage] = useState("");
    const [showOptions, setShowOptions] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const optionsRef = useRef(null);
    const emojiRef = useRef(null);

    // File input refs
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const contactInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    // Use the actual useSendMessage hook instead of mock function
    const { sendMessages } = useSendMessage();

    const handleSubmit = async (e) => {
        // Handle form submission if called from form
        if (e) e.preventDefault();

        if (!message.trim() && selectedFiles.length === 0) return;

        if (selectedFiles.length > 0) {
            console.log("Sending files:", selectedFiles);
            // Add your file sending logic here
        }

        if (message.trim()) {
            await sendMessages(message);
        }

        setMessage("");
        setSelectedFiles([]);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // Close options when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
            if (emojiRef.current && !emojiRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        if (showOptions || showEmojiPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showOptions, showEmojiPicker]);

    // File handling functions
    const addFile = (file, type) => {
        const fileObj = {
            id: Date.now() + Math.random(),
            file: file,
            type: type,
            name: file.name,
            size: file.size,
            preview: null
        };

        // Create preview for images
        if (type === 'image' && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedFiles(prev => prev.map(f =>
                    f.id === fileObj.id ? { ...f, preview: e.target.result } : f
                ));
            };
            reader.readAsDataURL(file);
        }

        setSelectedFiles(prev => [...prev, fileObj]);
    };

    const removeFile = (fileId) => {
        setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
    };

    // Handlers for attachment clicks
    const handleFileClick = () => {
        fileInputRef.current?.click();
        setShowOptions(false);
    };

    const handleImageClick = () => {
        imageInputRef.current?.click();
        setShowOptions(false);
    };

    const handleContactClick = () => {
        contactInputRef.current?.click();
        setShowOptions(false);
    };

    const handleCameraClick = () => {
        cameraInputRef.current?.click();
        setShowOptions(false);
    };

    // File input handlers
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            addFile(file, 'document');
        }
    };

    const handleImageInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            addFile(file, 'image');
        }
    };

    const handleCameraInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            addFile(file, 'image');
        }
    };

    const handleContactInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            addFile(file, 'contact');
        }
    };

    // Emoji handling
    const handleEmojiClick = (emoji) => {
        setMessage(prev => prev + emoji);
        // Don't close the emoji picker - let it stay open
    };

    // Common emojis for WhatsApp-like experience
    const commonEmojis = [
        '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃',
        '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙',
        '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫',
        '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬',
        '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢',
        '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '🥸',
        '😎', '🤓', '🧐', '😕', '😟', '🙁', '😮', '😯', '😲', '😳',
        '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖',
        '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬',
        '👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉',
        '👆', '👇', '☝️', '✋', '🤚', '🖐️', '🖖', '👋', '🤏', '✊',
        '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🙏', '✍️', '💅',
        '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔',
        '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️'
    ];

    const attachmentOptions = [
        {
            id: 'document',
            emoji: '📄',
            label: 'Document',
            color: '#667eea',
            onClick: handleFileClick
        },
        {
            id: 'camera',
            emoji: '📸',
            label: 'Camera',
            color: '#f093fb',
            onClick: handleCameraClick
        },
        {
            id: 'gallery',
            emoji: '🖼️',
            label: 'Gallery',
            color: '#4facfe',
            onClick: handleImageClick
        },
        {
            id: 'contact',
            emoji: '👤',
            label: 'Contact',
            color: '#43e97b',
            onClick: handleContactClick
        }
    ];

    return (
        <div style={{
            padding: "15px 20px",
            borderTop: "1px solid #e4e6ea",
            backgroundColor: "#f0f2f5",
            position: "relative"
        }}>
            {/* File Preview - Small boxes beside input */}
            {selectedFiles.length > 0 && (
                <div style={{
                    display: "flex",
                    gap: "8px",
                    marginBottom: "12px",
                    flexWrap: "wrap"
                }}>
                    {selectedFiles.map((fileObj) => (
                        <div key={fileObj.id} style={{
                            position: "relative",
                            width: "60px",
                            height: "60px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            backgroundColor: "white",
                            border: "2px solid #e4e6ea",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                        }}>
                            {/* Preview Content */}
                            <div style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative"
                            }}>
                                {fileObj.type === 'image' && fileObj.preview ? (
                                    <img
                                        src={fileObj.preview}
                                        alt="Preview"
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover"
                                        }}
                                    />
                                ) : (
                                    <div style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: fileObj.type === 'document' ? '#667eea' :
                                            fileObj.type === 'contact' ? '#43e97b' : '#f093fb',
                                        fontSize: "24px"
                                    }}>
                                        {fileObj.type === 'document' ? '📄' :
                                            fileObj.type === 'contact' ? '👤' : '📸'}
                                    </div>
                                )}
                            </div>

                            {/* Remove button - small X in top right */}
                            <button
                                type="button"
                                onClick={() => removeFile(fileObj.id)}
                                style={{
                                    position: "absolute",
                                    top: "-6px",
                                    right: "-6px",
                                    width: "20px",
                                    height: "20px",
                                    borderRadius: "50%",
                                    border: "2px solid white",
                                    backgroundColor: "#ff3b30",
                                    color: "white",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "12px",
                                    fontWeight: "bold",
                                    zIndex: 1
                                }}
                            >
                                ×
                            </button>

                            {/* File type indicator */}
                            <div style={{
                                position: "absolute",
                                bottom: "2px",
                                left: "2px",
                                right: "2px",
                                backgroundColor: "rgba(0,0,0,0.7)",
                                color: "white",
                                fontSize: "8px",
                                padding: "2px 4px",
                                borderRadius: "4px",
                                textAlign: "center",
                                fontWeight: "500"
                            }}>
                                {fileObj.type === 'document' ? 'DOC' :
                                    fileObj.type === 'contact' ? 'VCF' : 'IMG'}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Main Input Row - Wrapped in form for proper submission */}
            <form onSubmit={handleSubmit} style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "8px",
                position: "relative"
            }}>
                {/* Attachment button */}
                <div style={{ position: "relative" }} ref={optionsRef}>
                    <button
                        type="button"
                        style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            border: "none",
                            backgroundColor: "white",
                            color: "#54656f",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "all 0.2s ease",
                            fontSize: "16px",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                        }}
                        onClick={() => setShowOptions(prev => !prev)}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#f5f6f6"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "white"}
                    >
                        📎
                    </button>

                    {/* WhatsApp-style dropdown menu */}
                    {showOptions && (
                        <div style={{
                            position: "absolute",
                            bottom: "50px",
                            left: "0",
                            background: "white",
                            borderRadius: "8px",
                            boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
                            padding: "6px 0",
                            zIndex: 20,
                            minWidth: "180px",
                            border: "1px solid #e4e6ea"
                        }}>
                            {/* Triangle pointer */}
                            <div style={{
                                position: "absolute",
                                bottom: "-6px",
                                left: "16px",
                                width: "0",
                                height: "0",
                                borderLeft: "6px solid transparent",
                                borderRight: "6px solid transparent",
                                borderTop: "6px solid white"
                            }}></div>

                            {/* Options list */}
                            <div>
                                {attachmentOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        type="button"
                                        onClick={option.onClick}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "10px 16px",
                                            border: "none",
                                            backgroundColor: "transparent",
                                            cursor: "pointer",
                                            transition: "all 0.15s ease",
                                            width: "100%",
                                            gap: "12px"
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.backgroundColor = "#f5f6f6";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.backgroundColor = "transparent";
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                borderRadius: "50%",
                                                backgroundColor: option.color,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                flexShrink: 0,
                                                fontSize: "14px"
                                            }}
                                        >
                                            {option.emoji}
                                        </div>
                                        <span style={{
                                            fontSize: "14px",
                                            fontWeight: "400",
                                            color: "#3b4a54",
                                            textAlign: "left"
                                        }}>
                      {option.label}
                    </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Message input container */}
                <div style={{
                    flex: 1,
                    position: "relative",
                    backgroundColor: "white",
                    borderRadius: "24px",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center"
                }}>
                    <input
                        type="text"
                        placeholder="Type a message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        style={{
                            width: "100%",
                            padding: "12px 50px 12px 16px",
                            borderRadius: "24px",
                            border: "none",
                            outline: "none",
                            backgroundColor: "transparent",
                            fontSize: "15px",
                            color: "#3b4a54",
                            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif"
                        }}
                    />

                    {/* Emoji button - positioned correctly */}
                    <div style={{
                        position: "absolute",
                        right: "8px",
                        top: "50%",
                        transform: "translateY(-50%)"
                    }} ref={emojiRef}>
                        <button
                            type="button"
                            onClick={() => setShowEmojiPicker(prev => !prev)}
                            style={{
                                border: "none",
                                background: "transparent",
                                cursor: "pointer",
                                color: showEmojiPicker ? "#00a884" : "#8696a0",
                                transition: "color 0.2s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                fontSize: "16px"
                            }}
                            onMouseOver={(e) => e.target.style.color = showEmojiPicker ? "#00a884" : "#54656f"}
                            onMouseOut={(e) => e.target.style.color = showEmojiPicker ? "#00a884" : "#8696a0"}
                        >
                            😊
                        </button>

                        {/* Emoji Picker */}
                        {showEmojiPicker && (
                            <div style={{
                                position: "absolute",
                                bottom: "45px",
                                right: "0",
                                width: "320px",
                                maxHeight: "300px",
                                backgroundColor: "white",
                                borderRadius: "12px",
                                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                                border: "1px solid #e4e6ea",
                                zIndex: 25,
                                overflow: "hidden"
                            }}>
                                {/* Triangle pointer */}
                                <div style={{
                                    position: "absolute",
                                    bottom: "-6px",
                                    right: "16px",
                                    width: "0",
                                    height: "0",
                                    borderLeft: "6px solid transparent",
                                    borderRight: "6px solid transparent",
                                    borderTop: "6px solid white"
                                }}></div>

                                {/* Header */}
                                <div style={{
                                    padding: "12px 16px",
                                    borderBottom: "1px solid #e4e6ea",
                                    backgroundColor: "#f8f9fa",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center"
                                }}>
                  <span style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#3b4a54"
                  }}>
                    Choose an emoji
                  </span>
                                    <button
                                        type="button"
                                        onClick={() => setShowEmojiPicker(false)}
                                        style={{
                                            border: "none",
                                            background: "transparent",
                                            cursor: "pointer",
                                            color: "#8696a0",
                                            fontSize: "16px",
                                            padding: "0",
                                            width: "20px",
                                            height: "20px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>

                                {/* Emoji Grid */}
                                <div style={{
                                    padding: "12px",
                                    display: "grid",
                                    gridTemplateColumns: "repeat(8, 1fr)",
                                    gap: "8px",
                                    maxHeight: "200px",
                                    overflowY: "auto"
                                }}>
                                    {commonEmojis.map((emoji, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleEmojiClick(emoji)}
                                            style={{
                                                width: "32px",
                                                height: "32px",
                                                border: "none",
                                                backgroundColor: "transparent",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                fontSize: "18px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                transition: "background-color 0.15s ease"
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = "#f0f2f5"}
                                            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>

                                {/* Footer with recently used */}
                                <div style={{
                                    padding: "8px 16px",
                                    borderTop: "1px solid #e4e6ea",
                                    backgroundColor: "#f8f9fa",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px"
                                }}>
                  <span style={{
                      fontSize: "12px",
                      color: "#8696a0",
                      marginRight: "8px"
                  }}>
                    Recently used:
                  </span>
                                    {['❤️', '😂', '👍', '😊', '🔥'].map((emoji, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => handleEmojiClick(emoji)}
                                            style={{
                                                width: "24px",
                                                height: "24px",
                                                border: "none",
                                                backgroundColor: "transparent",
                                                borderRadius: "4px",
                                                cursor: "pointer",
                                                fontSize: "14px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}
                                            onMouseOver={(e) => e.target.style.backgroundColor = "#e4e6ea"}
                                            onMouseOut={(e) => e.target.style.backgroundColor = "transparent"}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Send button */}
                <button
                    type="submit"
                    disabled={!message.trim() && selectedFiles.length === 0}
                    style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: (message.trim() || selectedFiles.length > 0) ? "#00a884" : "#8696a0",
                        color: "white",
                        cursor: (message.trim() || selectedFiles.length > 0) ? "pointer" : "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                        fontSize: "16px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)"
                    }}
                    onMouseOver={(e) => {
                        if (message.trim() || selectedFiles.length > 0) {
                            e.target.style.backgroundColor = "#008069";
                        }
                    }}
                    onMouseOut={(e) => {
                        if (message.trim() || selectedFiles.length > 0) {
                            e.target.style.backgroundColor = "#00a884";
                        }
                    }}
                >
                    ▶
                </button>

                {/* Hidden file inputs */}
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileInputChange}
                />
                <input
                    type="file"
                    accept="image/*"
                    ref={imageInputRef}
                    style={{ display: "none" }}
                    onChange={handleImageInputChange}
                />
                <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    ref={cameraInputRef}
                    style={{ display: "none" }}
                    onChange={handleCameraInputChange}
                />
                <input
                    type="file"
                    accept=".vcf"
                    ref={contactInputRef}
                    style={{ display: "none" }}
                    onChange={handleContactInputChange}
                />
            </form>
        </div>
    );
}

export default Typesend;