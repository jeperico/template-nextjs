import axios from 'axios';
import getHeaders from './getHeaders';

export interface IHttpRequestParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extraHeaders?: any;
  showToastOnGenericErrorOnly?: boolean;
  overwriteEndpoint?: string;
  enableRequestThrottle?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosConfig?: Omit<any, 'headers' | 'method' | 'data' | 'cancelToken'>;
}

export interface IPostRequestParams extends IHttpRequestParams {
  body?: object | string;
  image?: string;
  status?: string;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const httpRequest = async (
  uri: string,
  method: HttpMethod,
  props: IPostRequestParams = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const headers = getHeaders(props);

  const endpoint = `${process.env.NEXT_PUBLIC_BASE_API_URL}/${uri}`;

  const body = props.body ? { data: props.body } : {};

  const params = {
    url: endpoint,
    ...(props.axiosConfig || {}),
    ...body,
    headers,
    method,
  };

  try {
    const response = await axios(params);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const get = (uri: string, params?: IHttpRequestParams) =>
  httpRequest(uri, 'GET', params);

export const post = (uri: string, params?: IPostRequestParams) => {
  return httpRequest(uri, 'POST', params);
};

export const put = (uri: string, params?: IPostRequestParams) =>
  httpRequest(uri, 'PUT', params);

export const patch = (uri: string, params?: IPostRequestParams) =>
  httpRequest(uri, 'PATCH', params);

export const del = (uri: string, props?: IHttpRequestParams) =>
  httpRequest(uri, 'DELETE', props);
