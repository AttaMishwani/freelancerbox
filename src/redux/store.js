// redux/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import menuReducer from "./menuSlice";
import jobApplicationReducer from './jobApplicationSlice';
import bookmarkedJobsReducer from "./bookMarkedJobsSlice"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "bookmarkedJobs"]
};

const rootReducer = combineReducers({
    user: userReducer,
    menu: menuReducer,
    jobApplication: jobApplicationReducer,
    bookmarkedJobs: bookmarkedJobsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);



const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
});

export const persistor = persistStore(store)

export default store;
