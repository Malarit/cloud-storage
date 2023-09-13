import { params_get } from "../services/requests/types";
import { cloud_query, queryOption } from "./queries";

export class UseQueryFiles {
  private filter?: string;
  private folderId?: number;
  private search?: string;
  private trash?: boolean;
  private order: params_get["cloud"]["order"];
  private limit?: number;

  setParamsAndQuery(
    filter?: string,
    folderId?: number,
    trash?: boolean,
    limit?: number,
    opt?: queryOption
  ) {
    this.filter = filter;
    this.folderId = folderId;
    this.trash = trash;
    this.limit = limit;
    return this.query(opt);
  }

  setSearch(search?: string, opt?: queryOption) {
    this.search = search;
    return this.query(opt);
  }

  setOrder(order?: params_get["cloud"]["order"], opt?: queryOption) {
    this.order = order;
    return this.query(opt);
  }

  query(option?: queryOption) {
    return cloud_query(
      {
        filter: this.filter,
        folderId: this.folderId,
        search: this.search,
        order: this.order,
        trash: this.trash,
        limit: this.limit,
      },
      {
        refetchOnWindowFocus: false,
        ...option,
      }
    );
  }
}

export default new UseQueryFiles();
