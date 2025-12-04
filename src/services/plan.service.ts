import { api } from "./apiClient";

export async function listPlansWithouToken() {
    return await api.get(`/auth/plan/from/lp`);
}