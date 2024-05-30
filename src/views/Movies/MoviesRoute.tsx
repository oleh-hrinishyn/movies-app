import React from 'react';
import { Outlet } from 'react-router-dom';
import {MovieProvider} from "./context";

export const MoviesRoute: React.FC = () => {
    return (
        <MovieProvider>
            <Outlet />
        </MovieProvider>
    );
};
