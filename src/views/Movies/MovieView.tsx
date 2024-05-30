import React, {FC, Fragment, useMemo} from 'react';
import {useMovieContext} from "./context";
import {Box, CircularLoader, CenteredLayout} from "../../components";
import {CardComponent} from "./components";
import {useParams} from "react-router-dom";

export const Movie: FC = () => {
    const params = useParams<{movieId: string}>();
    const {loading, getOneById} = useMovieContext()

    const movie = useMemo(() => getOneById(params.movieId!), [getOneById, params])

    if (loading) {
        return <CenteredLayout fullsize><CircularLoader/></CenteredLayout>
    }

    return <div>
        {JSON.stringify(movie)}
    </div>
}