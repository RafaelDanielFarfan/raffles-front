import { configureStore } from "@reduxjs/toolkit";
import { ticketsReducer } from "../reducer/ticketsReducer";

const reducer = {
    tickets: ticketsReducer,
};

const store = configureStore({
    reducer,
    devTool: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;