import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useMovieContext} from "./context";
import {Movies} from "./Movies";
import {Movie} from "./MovieView";

export const MoviesNestedRouter: React.FC = () => {
    const {init} = useMovieContext()

    useEffect(() => {
        init();
    }, []);

    return (
        <Routes>

            <Route
                path={''}
                element={
                    <Movies/>
                }
            />
            <Route
                path={'/:movieId'}
                element={
                    <Movie/>
                }
            />
        </Routes>
    );
};
