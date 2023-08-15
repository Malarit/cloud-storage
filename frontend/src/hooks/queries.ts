import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { get, post } from "../services/requests";
import { AxiosResponse } from "axios";

type mutationOption = Omit<
  UseMutationOptions<any, any, any, any>,
  "mutationFn"
>;
type queryOption = Omit<UseQueryOptions<any, any, any, any>, "queryKey">;

function mutation<T>(
  fn: (obj: T) => Promise<AxiosResponse<any, any>>,
  option?: mutationOption
) {
  return useMutation({ mutationFn: (obj: T) => fn(obj), ...option });
}
function query<T>(name: QueryKey, fn: () => Promise<T>, option?: queryOption) {
  return useQuery(name, () => fn(), option) as UseQueryResult<T, any>;
}

export const authorization = (option?: mutationOption) => {
  return mutation(post.authorization, option);
};

export const registration = (option?: mutationOption) => {
  return mutation(post.registration, option);
};

export const cloud_mutation = (option?: mutationOption) => {
  return mutation(post.cloud, option);
};

export const cloud_query = (
  params?: { filter?: string; folderId?: number },
  option?: queryOption
) => {
  return query(
    ["cloud", params?.filter, params?.folderId],
    () => get.cloud(params),
    option
  );
};
