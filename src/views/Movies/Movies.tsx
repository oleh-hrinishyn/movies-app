import React, {FC, Fragment, useCallback, useMemo, useState} from 'react';
import {useMovieContext} from "./context";
import {Box, CircularLoader} from "../../components";
import {CenteredLayout} from "../../components/CenteredLayout";
import {CardComponent} from "./components";
import {useSearchParams} from "react-router-dom";

export const Movies: FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const {categoriesMap, loading, getOneById, init} = useMovieContext()
    const categoryList = useMemo(() => Array.from(categoriesMap).map(([category, idList]) => ({
        category,
        movies: idList.map(getOneById)
    })), [categoriesMap, getOneById])


    const [query, setQuery] = useState(searchParams.get('search') ?? '')

    const handleQueryInput = useCallback((newQuery: string) => {
        setQuery(newQuery);
    }, [setQuery])

    const handleSearch = useCallback(
        (newQuery: string) => {
            searchParams.delete('search');
            searchParams.append('search', newQuery);
            setSearchParams(searchParams);
            setTimeout(() => init());
        },
        [searchParams, setSearchParams, init],
    );

    return <>
        <header>
            <Box>
                <div>LOGO</div>
                <input onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)} placeholder='Enter a query and press ENTER to submit' name='search' value={query} onInput={e => handleQueryInput((e.target as HTMLInputElement).value)}/>
            </Box>
        </header>
        {loading ? <CenteredLayout fullsize><CircularLoader/></CenteredLayout> :
        <main>
            {categoryList.map(({category, movies}) => (<Fragment key={category}>
                    <h1>{category}</h1>
                    <Box>
                        {movies.map(movie => <Fragment key={`${category}-${movie?.id}`}>
                            <CardComponent {...movie!}></CardComponent>
                        </Fragment>)}
                    </Box>
            </Fragment>))}
        </main>}
    </>
}