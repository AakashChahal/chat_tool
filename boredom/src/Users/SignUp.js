import React from "react";
import { Typography } from "@mui/material";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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

function SignUp() {
    return (
        <>
            <Typography
                component="h1"
                variant="h1"
                sx={{
                    textAlign: "center",
                }}
            >
                Sign Up
            </Typography>
        </>
    );
}

export default SignUp;
