import { useQuery, UseQueryOptions } from 'react-query';
import { axiosInstance } from './axios';
import {AxiosResponse} from "axios";


export interface FetchQueryFactoryOption<T = any> {
  apiUrl: string;
    filterMap?: any;
}
export const getFetchOneByIdQuery =
  ({
    apiUrl,
  }: FetchQueryFactoryOption) =>
  (
    queryOptions: number,
    options: Omit<UseQueryOptions<any, any, any>, 'queryKey' | 'queryFn'> = {},
  ) =>
    useQuery(
      [`getOne${apiUrl}`, queryOptions],
      ({ signal }) => {
        return axiosInstance
          .get(`${apiUrl}${queryOptions}/`, {
            signal,
          })
      },
      options,
    );

export const getFetchQuery =
    <T>({
          apiUrl,
         filterMap = {},
      }: FetchQueryFactoryOption) =>
        (
            queryOptions?: any,
            options: Omit<UseQueryOptions<any, any, any>, 'queryKey' | 'queryFn'> = {},
        ) =>
            useQuery<AxiosResponse<T>>(
                [`getAll${apiUrl}`, queryOptions],
                ({ signal }) => {
                    const queryParams = new URLSearchParams();

                    Object.entries(queryOptions ?? {}).forEach(([queryKey, value]) => {
                        if ((value !== undefined && value !== null) && value !== '') {
                            queryParams.append(filterMap[queryKey] ? filterMap[queryKey] : queryKey, `${value}`);
                        }
                    });
                    let url = apiUrl;
                    const queryString = queryParams.toString();

                    if (queryString) {
                        url += `?${queryString}`;
                    }

                    return axiosInstance
                        .get<T>(url, {
                            signal,
                        })
                },
                options,
            );
