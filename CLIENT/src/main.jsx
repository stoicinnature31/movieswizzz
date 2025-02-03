import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'aos';
import 'aos/dist/aos.css';
import { NextUIProvider } from '@nextui-org/react';
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <NextUIProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <App />
    </NextUIProvider>
  </ChakraProvider>
);
