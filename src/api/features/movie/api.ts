import {getFetchQuery} from "../../fetch";
import {IMovie} from "./types";

const apiUrl = '/'
export const useMoviesQuery = getFetchQuery<{movies: IMovie[]}>(
    {
        apiUrl,

    },
);