import { api } from "../lib/axios";

export async function useRegister(url: string, Tobject: unknown ){
    await api.post(url, Tobject)
}