import {createContext, FC, ReactNode, useCallback, useContext, useMemo, useState} from 'react';
import {IMovie} from "../../../api/features/movie/types";
import {useMoviesQuery} from "../../../api";
import {useSearchParams} from "react-router-dom";

interface MovieContextProps {
  list: IMovie[];
  loading: boolean,
    categoriesMap: Map<string, string[]>

    init(): void;
    getOneById(id: string): IMovie | undefined;
}
const initialValue: MovieContextProps = {
  list: [],
  loading: false,
    categoriesMap: new Map(),

    init: () => {},
    getOneById: () => undefined,
};
export const MovieContext = createContext<MovieContextProps>(initialValue);

export const MovieProvider: FC<{
  children?: ReactNode | 'string' | null;
}> = ({ children }) => {
    const [searchParams] = useSearchParams();
    const searchQuery = useMemo(() => searchParams.get('search'), [searchParams]);
    const [listDict, setListDict] = useState(new Map());
    const [categories, setCategories] = useState(new Map<string, string[]>());

  const {data, isFetching, refetch} = useMoviesQuery({
      q: searchQuery
  }, {
      enabled: false,
      onSuccess(data) {
          const newMap = new Map();
          const newCategoriesMap = new Map();

          (data?.data?.movies ?? []).forEach((item: IMovie) => {
              newMap.set(item.id, item);


              item.genres.forEach((category) => {
                  newCategoriesMap.set(category, [
                      ...(newCategoriesMap.get(category) ?? []),
                      item.id
                  ])
              })
          });
          setListDict(newMap)
          setCategories(newCategoriesMap)
      }
  })

  const list = useMemo(() => data?.data?.movies ?? [], [data]);

  const getOneById = useCallback((id: string) => listDict.get(id), [listDict])

  return (
    <MovieContext.Provider
      value={{
        list,
        loading: isFetching,
          categoriesMap: categories,
          getOneById,
          init: refetch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () =>
  useContext<MovieContextProps>(MovieContext);
