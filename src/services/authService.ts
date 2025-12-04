import { api } from './apiClient'

export async function checkUserExists(params: { nif?: string; email?: string }) {
  return await api.get('/auth/check-user', { params });
}

export async function CreateUser(body: { name: string, nif: string, email: string, phone: string, plan_id: number, dataTerms: { ipAddress: string, acceptedTerms: boolean }}) {
  return await api.post<{
    order: {
      holderId: number;
      idOrder: number;
    };
    message: string;
  }>('/auth/create/simpleUser', body);
}


export interface CreateSessionResponse {
  data: {
    sessionId: string;
    url?: string;
  };
  sessionId: string
  url: string
}

export async function createSession(body: { plan: string; holderId: string, idOrder: string }) {
  return await api.post<CreateSessionResponse>('/auth/stripe/session', body);
}
