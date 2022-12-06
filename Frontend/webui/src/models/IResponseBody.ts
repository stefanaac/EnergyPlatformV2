import { Methods } from "../enums/methods";

export default interface IResponseBody {
    method: Methods,
    headers: HeadersInit,
    body?: BodyInit | null,
    credentials: RequestCredentials
}