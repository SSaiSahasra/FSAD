const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
const APP_TOAST_EVENT = 'conference-platform:toast';

const emitToast = (type, message, duration = 5000) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.dispatchEvent(
    new CustomEvent(APP_TOAST_EVENT, {
      detail: { type, message, duration },
    }),
  );
};

const formatSuccessMessage = (method, path, payloadMessage) => {
  if (payloadMessage) {
    return payloadMessage;
  }

  const endpoint = path.split('?')[0].replace(/\/$/, '');
  const entity = endpoint.split('/').filter(Boolean).pop() || 'request';
  return `${method} ${entity} successful`;
};

const getHeaders = (token, extraHeaders = {}) => {
  const headers = {
    ...extraHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const handleResponse = async (response, meta = {}) => {
  const { method = 'GET', path = '', notifySuccess = method !== 'GET' } = meta;
  let payload = null;

  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.message || 'Something went wrong';
    emitToast('error', message, 5000);
    throw new Error(message);
  }

  if (payload && typeof payload === 'object' && Object.prototype.hasOwnProperty.call(payload, 'success')) {
    if (payload.success === false) {
      const message = payload.message || 'Something went wrong';
      emitToast('error', message, 5000);
      throw new Error(message);
    }

    if (notifySuccess) {
      emitToast('success', formatSuccessMessage(method, path, payload.message), 5000);
    }

    return Object.prototype.hasOwnProperty.call(payload, 'data') ? payload.data : payload;
  }

  if (notifySuccess) {
    emitToast('success', formatSuccessMessage(method, path, null), 5000);
  }

  return payload;
};

// ================= COMMON METHODS =================

export const apiPost = async (path, body, token, contentType = 'application/json') => {
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const payload = isFormData
    ? body
    : (typeof body === 'string' ? body : JSON.stringify(body));

  const headers = isFormData
    ? getHeaders(token)
    : getHeaders(token, {
      'Content-Type': contentType,
    });

  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers,
    body: payload,
  });

  return handleResponse(response, { method: 'POST', path, notifySuccess: true });
};

export const apiPut = async (path, body, token) => {
  const payload = typeof body === 'string' ? body : JSON.stringify(body);

  const headers = getHeaders(token, {
    'Content-Type': 'application/json',
  });

  const response = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers,
    body: payload,
  });

  return handleResponse(response, { method: 'PUT', path, notifySuccess: true });
};

export const apiGet = async (path, token) => {
  const headers = getHeaders(token);

  const response = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers,
  });

  return handleResponse(response, { method: 'GET', path, notifySuccess: false });
};

export const apiDelete = async (path, token) => {
  const headers = getHeaders(token);

  const response = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers,
  });

  return handleResponse(response, { method: 'DELETE', path, notifySuccess: true });
};

// ================= AUTH API =================

export const registerUser = (data) =>
  apiPost('/auth/register', data);

export const loginUser = (data) =>
  apiPost('/auth/login', data);

// ================= CONFERENCE API =================

export const getConferences = (token) =>
  apiGet('/conferences', token);

export const getConferenceById = (id, token) =>
  apiGet(`/conferences/${id}`, token);

export const createConference = (data, token) =>
  apiPost('/conferences', data, token);

export const updateConference = (id, data, token) =>
  apiPut(`/conferences/${id}`, data, token);

export const deleteConference = (id, token) =>
  apiDelete(`/conferences/${id}`, token);

export default {
  registerUser,
  loginUser,
  getConferences,
  getConferenceById,
  createConference,
  updateConference,
  deleteConference,
};