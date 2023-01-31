import React, { useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
    Box,
    Button,
    Link,
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
    const [errorMessage, setErrorMessage] = React.useState("");
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
            return;
        } else {
            setEmailError(false);
            setEmailHelperText("");
        }

        if (password === "") {
            setPasswordError(true);
            setPasswordHelperText("Password cannot be empty");
            return;
        } else {
            setPasswordError(false);
            setPasswordHelperText("");
        }

        if (passwordConfirm === "") {
            setPasswordError(true);
            setPasswordConfirmHelperText("Password cannot be empty");
            return;
        } else {
            setPasswordError(false);
            setPasswordConfirmHelperText("");
        }

        if (password !== passwordConfirm) {
            setPasswordError(true);
            setPasswordConfirmHelperText("Passwords do not match");
            return;
        } else {
            setPasswordError(false);
            setPasswordConfirmHelperText("");
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);
                window.localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "/home";
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                setErrorMessage(errorMessage);
            });
    };

    const handleGoogleSignUp = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(token);
                // The signed-in user info.
                const user = result.user;
                window.localStorage.setItem("user", JSON.stringify(user));
                window.location.href = "/home";
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log(errorCode);
                const errorMessage = error.message;
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                console.log(credential);
                setErrorMessage(errorMessage);
                // ...
            });
    };

    const checkIfLoggedIn = () => {
        const user = JSON.parse(window.localStorage.getItem("user"));
        if (user) {
            window.location.href = "/home";
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        checkIfLoggedIn();
    }, []);

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
                            aria-describedby="sign-up-helper-text"
                        >
                            Sign Up
                        </Typography>
                        <FormHelperText
                            id="sign-up-helper-text"
                            sx={{
                                color: "red.main",
                            }}
                        >
                            {errorMessage && errorMessage}
                        </FormHelperText>
                        <Box
                            sx={{
                                width: "50%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "0.2rem",
                            }}
                        >
                            <TextField
                                fullWidth
                                id="email"
                                label="Email Address"
                                aria-describedby="email-helper-text"
                                onChange={handleEmailChange}
                            />
                            <FormHelperText id="email-helper-text">
                                {emailError && emailHelperText}
                            </FormHelperText>
                            <TextField
                                fullWidth
                                id="password"
                                type={"password"}
                                label="Password"
                                aria-describedby="password-helper-text"
                                onChange={handlePasswordChange}
                            />
                            <FormHelperText id="password-helper-text">
                                {passwordError && passwordHelperText}
                            </FormHelperText>
                            <TextField
                                fullWidth
                                id="password-confirm"
                                type={"password"}
                                label="Confirm Password"
                                onChange={handlePasswordConfirmChange}
                                aria-describedby="password-confirm-helper-text"
                            />
                            <FormHelperText id="password-confirm-helper-text">
                                {passwordError && passwordConfirmHelperText}
                            </FormHelperText>
                            <Button
                                fullWidth
                                sx={{
                                    color: "blue.secondary",
                                    border: "1px solid blue",
                                    "&:hover": {
                                        backgroundColor: "blue.main",
                                        color: "white",
                                        boxShadow:
                                            "0.2rem 0.2rem 1rem 0 rgba(0,0,0,0.25)",
                                    },
                                    borderRadius: "0.5rem",
                                }}
                                onClick={handleSignUp}
                            >
                                Sign Up
                            </Button>
                            <Typography variant="p">
                                Already have an account?{" "}
                                <Link
                                    href="/signin"
                                    sx={{
                                        color: "blue.main",
                                        "&:hover": {
                                            color: "blue.secondary",
                                        },
                                    }}
                                >
                                    Login
                                </Link>
                            </Typography>
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
                                    boxShadow:
                                        "0.2rem 0.2rem 1rem 0 rgba(0,0,0,0.25)",
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
