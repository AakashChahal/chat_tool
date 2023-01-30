import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { redirect } from "react-router-dom";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAY2Sao6e8Iqb2sFeR0SbFQ3Lmqfc58llA",
    authDomain: "chatapp-38b66.firebaseapp.com",
    projectId: "chatapp-38b66",
    storageBucket: "chatapp-38b66.appspot.com",
    messagingSenderId: "749050828761",
    appId: "1:749050828761:web:3dd142c9266a86aeb5ebc8",
    measurementId: "G-VG6GL5Y8G9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider();
const auth = getAuth();
console.log(analytics);

const theme = createTheme({
    palette: {
        red: {
            main: "#ff0000",
            secondary: "#881122",
        },
        green: {
            main: "#00ff00",
            secondary: "#118811",
        },
        blue: {
            main: "#0000ff",
            secondary: "#111188",
        },
    },
});

function SignUp() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const [passwordError, setPasswordError] = React.useState(false);
    const [emailError, setEmailError] = React.useState(false);
    const [emailHelperText, setEmailHelperText] = React.useState("");
    const [passwordHelperText, setPasswordHelperText] = React.useState("");
    const [passwordConfirmHelperText, setPasswordConfirmHelperText] =
        React.useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlePasswordConfirmChange = (event) => {
        setPasswordConfirm(event.target.value);

        if (event.target.value !== password) {
            setPasswordError(true);
            setPasswordConfirmHelperText("Passwords do not match");
        } else {
            setPasswordError(false);
            setPasswordConfirmHelperText("");
        }
    };

    const handleSignUp = () => {
        if (email === "") {
            setEmailError(true);
            setEmailHelperText("Email cannot be empty");
        } else {
            setEmailError(false);
            setEmailHelperText("");
        }

        if (password === "") {
            setPasswordError(true);
            setPasswordHelperText("Password cannot be empty");
        } else {
            setPasswordError(false);
            setPasswordHelperText("");
        }

        if (passwordConfirm === "") {
            setPasswordError(true);
            setPasswordConfirmHelperText("Password cannot be empty");
        } else {
            setPasswordError(false);
            setPasswordConfirmHelperText("");
        }
    };

    const handleGoogleSignUp = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                window.location.href = "/home";
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography
                        component="h1"
                        variant="h2"
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        Boredom
                    </Typography>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        alignContent: "center",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <Typography
                            component="h2"
                            variant="h4"
                            sx={{
                                color: "green.main",
                                textAlign: "center",
                            }}
                        >
                            Sign Up
                        </Typography>
                        <Box sx={{ width: "100%", textAlign: "center" }}>
                            <FormControl
                                sx={{
                                    width: "50%",
                                }}
                            >
                                <TextField
                                    id="email"
                                    label="Email Address"
                                    aria-describedby="email-helper-text"
                                />
                                <FormHelperText id="email-helper-text">
                                    We'll never share your email.
                                </FormHelperText>
                                <TextField
                                    id="password"
                                    type={"password"}
                                    label="Password"
                                />
                            </FormControl>
                        </Box>
                        <Typography component={"h1"} variant={"h5"}>
                            OR
                        </Typography>
                        {/* Google sign up using firebase */}
                        <Button
                            sx={{
                                color: "blue.secondary",
                                border: "1px solid blue",
                                "&:hover": {
                                    backgroundColor: "blue.main",
                                    color: "white",
                                },
                                borderRadius: "0.5rem",
                            }}
                            onClick={handleGoogleSignUp}
                        >
                            Sign Up with Google{" "}
                            <span
                                style={{
                                    margin: "auto 0.5rem auto 0.5rem",
                                }}
                            >
                                <img
                                    width={"20px"}
                                    height={"20px"}
                                    src="https://img.icons8.com/color/512/google-logo.png"
                                    alt="google logo"
                                />
                            </span>
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default SignUp;
