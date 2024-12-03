/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Recipient {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 90
   */
  name?: string;
  /**
   * Desc
   * @minLength 1
   * @maxLength 140
   */
  desc?: string;
  /**
   * Phone
   * @minLength 1
   * @maxLength 18
   */
  phone?: string;
  /**
   * City
   * @minLength 1
   * @maxLength 40
   */
  city?: string;
  /**
   * Birthdate
   * @format date
   */
  birthdate?: string;
  /**
   * Avatar
   * @format uri
   * @maxLength 200
   */
  avatar?: string | null;
  /**
   * Uni
   * @minLength 1
   * @maxLength 140
   */
  uni?: string;
}

export interface User {
  /**
   * Username
   * @minLength 1
   * @maxLength 50
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface FileTransfer {
  /** ID */
  id?: number;
  /** Status */
  status?: "DRF" | "DEL" | "FRM" | "COM" | "REJ";
  /**
   * Created at
   * @format date-time
   */
  created_at?: string;
  /**
   * Formed at
   * @format date-time
   */
  formed_at?: string | null;
  /**
   * Completed at
   * @format date-time
   */
  completed_at?: string | null;
  /** Sender */
  sender?: number;
  /** Moderator */
  moderator?: number | null;
  /**
   * File
   * @format uri
   * @maxLength 200
   */
  file?: string | null;
}

export interface FileTransferRecipient {
  /** ID */
  id?: number;
  /**
   * Comment
   * @maxLength 200
   */
  comment?: string | null;
  /** Has read */
  has_read?: boolean;
  /** File transfer */
  file_transfer?: number;
  /** Recipient */
  recipient?: number;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  recipients = {
    /**
     * No description
     *
     * @tags recipients
     * @name RecipientsList
     * @request GET:/recipients/
     * @secure
     */
    recipientsList: (
      query?: {
        /** Used for filtration by recipient's name */
        "recipient-name"?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/recipients/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags recipients
     * @name RecipientsCreate
     * @request POST:/recipients/
     * @secure
     */
    recipientsCreate: (data: Recipient, params: RequestParams = {}) =>
      this.request<Recipient, any>({
        path: `/recipients/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recipients
     * @name RecipientsRead
     * @request GET:/recipients/{recipient_id}/
     * @secure
     */
    recipientsRead: (recipientId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/recipients/${recipientId}/`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags recipients
     * @name RecipientsUpdate
     * @request PUT:/recipients/{recipient_id}/
     * @secure
     */
    recipientsUpdate: (recipientId: string, data: Recipient, params: RequestParams = {}) =>
      this.request<Recipient, any>({
        path: `/recipients/${recipientId}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags recipients
     * @name RecipientsDelete
     * @request DELETE:/recipients/{recipient_id}/
     * @secure
     */
    recipientsDelete: (recipientId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/recipients/${recipientId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Adds avatar to the recipient
     *
     * @tags recipients
     * @name RecipientsAvatarCreate
     * @request POST:/recipients/{recipient_id}/avatar
     * @secure
     */
    recipientsAvatarCreate: (recipientId: string, data: File, params: RequestParams = {}) =>
      this.request<File, any>({
        path: `/recipients/${recipientId}/avatar`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Adds recipient to the user's draft file transfer
     *
     * @tags recipients
     * @name RecipientsDraftCreate
     * @request POST:/recipients/{recipient_id}/draft
     * @secure
     */
    recipientsDraftCreate: (recipientId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/recipients/${recipientId}/draft`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  session = {
    /**
     * @description Gets session info
     *
     * @tags session
     * @name SessionList
     * @request GET:/session/
     * @secure
     */
    sessionList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/session/`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
  signin = {
    /**
     * @description Signs the user in
     *
     * @tags signin
     * @name SigninCreate
     * @request POST:/signin
     * @secure
     */
    signinCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/signin`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  signout = {
    /**
     * @description Signs the user out
     *
     * @tags signout
     * @name SignoutCreate
     * @request POST:/signout
     * @secure
     */
    signoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/signout`,
        method: "POST",
        secure: true,
        ...params,
      }),
  };
  transfers = {
    /**
     * No description
     *
     * @tags transfers
     * @name TransfersList
     * @request GET:/transfers/
     * @secure
     */
    transfersList: (
      query?: {
        /** Filter by status */
        status?: string;
        /** Filter by range which the transfer was formed at (Type as: %Y-%m-%d,%Y-%m-%d) */
        "formed-at-range"?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/transfers/`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags transfers
     * @name TransfersRead
     * @request GET:/transfers/{transfer_id}
     * @secure
     */
    transfersRead: (transferId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/transfers/${transferId}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags transfers
     * @name TransfersUpdate
     * @request PUT:/transfers/{transfer_id}
     * @secure
     */
    transfersUpdate: (transferId: string, data: FileTransfer, params: RequestParams = {}) =>
      this.request<FileTransfer, any>({
        path: `/transfers/${transferId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transfers
     * @name TransfersDelete
     * @request DELETE:/transfers/{transfer_id}
     * @secure
     */
    transfersDelete: (transferId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/transfers/${transferId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Completes the transfer
     *
     * @tags transfers
     * @name TransfersCompleteUpdate
     * @request PUT:/transfers/{transfer_id}/complete
     * @secure
     */
    transfersCompleteUpdate: (
      transferId: string,
      data: {
        /**
         * Action: (reject|complete) the transfer
         * @default "complete"
         */
        action: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          /**
           * Action: (reject|complete) the transfer
           * @default "complete"
           */
          action: string;
        },
        any
      >({
        path: `/transfers/${transferId}/complete`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transfers
     * @name TransfersFormUpdate
     * @request PUT:/transfers/{transfer_id}/form
     * @secure
     */
    transfersFormUpdate: (transferId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/transfers/${transferId}/form`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags transfers
     * @name TransfersRecipientsUpdate
     * @request PUT:/transfers/{transfer_id}/recipients/{recipient_id}
     * @secure
     */
    transfersRecipientsUpdate: (
      transferId: string,
      recipientId: string,
      data: FileTransferRecipient,
      params: RequestParams = {},
    ) =>
      this.request<FileTransferRecipient, any>({
        path: `/transfers/${transferId}/recipients/${recipientId}`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags transfers
     * @name TransfersRecipientsDelete
     * @request DELETE:/transfers/{transfer_id}/recipients/{recipient_id}
     * @secure
     */
    transfersRecipientsDelete: (transferId: string, recipientId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/transfers/${transferId}/recipients/${recipientId}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  user = {
    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserList
     * @request GET:/user/
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<User[], any>({
        path: `/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserCreate
     * @request POST:/user/
     * @secure
     */
    userCreate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserRead
     * @request GET:/user/{id}/
     * @secure
     */
    userRead: (id: number, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserUpdate
     * @request PUT:/user/{id}/
     * @secure
     */
    userUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserPartialUpdate
     * @request PATCH:/user/{id}/
     * @secure
     */
    userPartialUpdate: (id: number, data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Класс, описывающий методы работы с пользователями Осуществляет связь с таблицей пользователей в базе данных
     *
     * @tags user
     * @name UserDelete
     * @request DELETE:/user/{id}/
     * @secure
     */
    userDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
