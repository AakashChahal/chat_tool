import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, Button } from "@mui/material";
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

function Home() {
    const [videoSrc, setVideoSrc] = useState(null);

    useEffect(() => {
        const video = document.querySelector("video");
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                setVideoSrc(stream);
                video.srcObject = stream;
                video.play();
                console.log("Stream:", stream);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);
    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
                <Grid item>
                    <Box
                        sx={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            width: "30vw",
                            height: "40vh",
                            marginTop: "7vh",
                            marginLeft: "2vw",
                        }}
                    >
                        {videoSrc ? (
                            <video
                                src={videoSrc}
                                autoPlay={true}
                                controls={true}
                            />
                        ) : (
                            <p>Loading video...</p>
                        )}
                    </Box>
                    <Box
                        sx={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            width: "30vw",
                            height: "40vh",
                            marginTop: "7vh",
                            marginLeft: "2vw",
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: "center",
                                margin: "auto",
                                marginTop: "35%",
                            }}
                        >
                            Video 2
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Box
                        sx={{
                            border: "1px solid black",
                            borderRadius: "10px",
                            width: "60vw",
                            height: "80vh",
                            marginTop: "7vh",
                            marginRight: "2vw",
                            position: "relative",
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: "center",
                                margin: "auto",
                                marginTop: "35%",
                            }}
                        >
                            Main Content
                        </Typography>
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: "2vh",
                                left: "2vw",
                            }}
                        >
                            <Button variant="contained" color="primary">
                                Left
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: "2vh",
                                right: "2vw",
                            }}
                        >
                            <Button variant="contained" color="secondary">
                                Right
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default Home;
