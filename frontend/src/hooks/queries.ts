import { useMutation, UseMutationOptions, useQuery } from "react-query";
import { post } from "../services/requests";
import { AxiosResponse } from "axios";

type mutationOption = Omit<
  UseMutationOptions<any, any, any, any>,
  "mutationFn"
>;

function mutation<T>(
  fn: (obj: T) => Promise<AxiosResponse<any, any>>,
  option?: mutationOption
) {
  return useMutation({
    mutationFn: (obj: T) => fn(obj),
    ...option,
  });
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
