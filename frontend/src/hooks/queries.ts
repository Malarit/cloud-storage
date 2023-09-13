import {
  QueryKey,
  useInfiniteQuery,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "react-query";
import { get, post } from "../services/requests";
import { AxiosProgressEvent, AxiosResponse } from "axios";
import { params_get } from "../services/requests/types";
import * as sType from "../services/requests/types";
import config from "../../config";

export type mutationOption = Omit<
  UseMutationOptions<any, any, any, any>,
  "mutationFn"
>;
export type queryOption = Omit<UseQueryOptions<any, any, any, any>, "queryKey">;

function mutation<T>(
  fn: (obj: T) => Promise<AxiosResponse<any, any>>,
  option?: mutationOption
) {
  return useMutation({ mutationFn: (obj: T) => fn(obj), ...option });
}
function query<T>(name: QueryKey, fn: () => Promise<T>, option?: queryOption) {
  return useQuery(name, () => fn(), option) as UseQueryResult<T, any>;
}

//post
export const authorization = (option?: mutationOption) => {
  return mutation(post.authorization, option);
};

export const registration = (option?: mutationOption) => {
  return mutation(post.registration, option);
};

export const cloud_mutation = (option?: mutationOption) => {
  return mutation(post.cloud, option);
};

export const update_folder_cloud = (option?: mutationOption) => {
  return mutation(post.update_folder_cloud, option);
};

export const delete_file = (option?: mutationOption) => {
  return mutation(post.delete_file, option);
};

export const update_name = (option?: mutationOption) => {
  return mutation(post.update_name, option);
};

export const recover_file = (option?: mutationOption) => {
  return mutation(post.recover_file, option);
};

export const updateUserData = (option?: mutationOption) => {
  return mutation(post.updateUserData, option);
};

//get
export const cloud_query = (
  params?: params_get["cloud"],
  option?: queryOption
) => {
  return useInfiniteQuery<sType.get["cloud"]>(
    ["cloud", params?.filter, params?.folderId, params?.trash],
    ({ pageParam = 0 }) => get.cloud({ ...params, page: pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const { prevOffset, totalCount } = lastPage;
        if ((prevOffset + 1) * config.LIMIT > totalCount) {
          return false;
        }
        return prevOffset + 1;
      },
      ...option,
    }
  );
};

export const download_query = (
  params: { id: number },
  lastIndex?: number,
  onDownloadProgress?: (e: AxiosProgressEvent, lastIndex?: number) => void,
  signal?: AbortSignal,
  option?: queryOption
) => {
  return query<Blob | undefined>(
    ["download", params.id],
    () => {
      return get.download(
        params,
        (e) => onDownloadProgress?.(e, lastIndex),
        signal
      );
    },
    {
      ...option,
      refetchOnWindowFocus: false,
      refetchOnMount: "always",
      retry: false,
    }
  );
};

export const userData_query = (option?: queryOption) => {
  return query<sType.get["userData"]>(["userData"], get.userData, {
    ...option,
    refetchOnWindowFocus: false,
  });
};

export const exitLogin_query = (option?: queryOption) => {
  return query(["exitLogin"], get.exitLogin, option);
};
