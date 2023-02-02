import React, { useEffect, useState, useRef } from "react";
import { Typography, Box, Grid, Button, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ff0000",
        },
        secondary: {
            main: "#00ff00",
        },
    },
});

const preMessages = [
    {
        text: "Hello!",
        author: "User 1",
    },
    {
        text: "Hi! How are you?",
        author: "User 2",
    },
    {
        text: "I'm good, thanks. How about you?",
        author: "User 1",
    },
    {
        text: "I'm doing well, thanks!",
        author: "User 2",
    },
];

function Home() {
    const [videoSrc, setVideoSrc] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [peerConnection, setPeerConnection] = useState(null);

    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    const startVideoChat = async () => {
        const localStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        setLocalStream(localStream);
        localVideoRef.current.srcObject = localStream;

        const peerConnection = new RTCPeerConnection();
        setPeerConnection(peerConnection);
        peerConnection.addStream(localStream);

        peerConnection.onaddstream = (event) => {
            setRemoteStream(event.stream);
            remoteVideoRef.current.srcObject = event.stream;
        };

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        // Signaling code to send the offer to the remote peer goes here
    };

    const postMessage = () => {
        if (message === "") return;
        const newMessage = {
            text: message,
            author: "User 1",
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        document.getElementById("message").value = "";
        // send message to server

        // receive message from server
        setTimeout(() => {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: "I'm bored too!", author: "User 2" },
            ]);
        }, 1000);
    };

    const loggedIn = () => {
        const user = localStorage.getItem("user");
        if (user) {
            return true;
        }
        window.location.href = "/signin";
    };

    useEffect(() => {
        setMessages([...preMessages]);
        startVideoChat();
    }, []);
    return (
        <>
            {loggedIn() && (
                <ThemeProvider theme={theme}>
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            height: "100vh",
                            width: "100vw",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                textAlign: "center",
                                marginTop: "2vh",
                            }}
                        >
                            <Typography variant="h3">Boredom</Typography>
                        </Box>
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            sx={{
                                margin: "auto",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    // height: "40vh",
                                    marginLeft: "1vw",
                                }}
                            >
                                <video
                                    ref={localVideoRef}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "10px",
                                        boxShadow:
                                            "0 19px 51px 0 rgba(0,0,0,0.16), 0 14px 19px 0 rgba(0,0,0,0.07)",
                                    }}
                                    autoPlay
                                    playsInline
                                />
                            </Box>
                            <Box
                                sx={{
                                    width: "100%",
                                    marginLeft: "1vw",
                                }}
                            >
                                {videoSrc ? (
                                    <video
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "10px",
                                            boxShadow:
                                                "0 19px 51px 0 rgba(0,0,0,0.16), 0 14px 19px 0 rgba(0,0,0,0.07)",
                                        }}
                                        autoPlay
                                        playsInline
                                    />
                                ) : (
                                    <p>Loading video...</p>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box
                                sx={{
                                    border: "1px solid black",
                                    borderRadius: "10px",
                                    width: "100%",
                                    height: "87vh",
                                    marginRight: "2vw",
                                    marginLeft: "1vw",
                                    position: "relative",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box
                                    sx={{
                                        height: "80vh",
                                        overflow: "auto",
                                        padding: "1rem",
                                    }}
                                >
                                    {messages.map((message) => (
                                        <Typography sx key={message.message}>
                                            {message.author}: {message.text}
                                        </Typography>
                                    ))}
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "1rem",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{
                                            height: "4em",
                                        }}
                                    >
                                        Next
                                    </Button>
                                    <TextField
                                        id="message"
                                        label="Message"
                                        variant="outlined"
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        fullWidth
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        sx={{
                                            height: "4em",
                                        }}
                                        onClick={postMessage}
                                    >
                                        Send
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </ThemeProvider>
            )}
        </>
    );
}

export default Home;
