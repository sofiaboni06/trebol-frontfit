export function getHttpErrorMessage(error) {
  if (!error) {
    return 'Ocurrió un error desconocido';
  }

  if (error.response?.data) {
    const responseData = error.response.data;

    if (typeof responseData.message === 'string' && responseData.message.trim()) {
      return responseData.message;
    }

    if (typeof responseData.mensaje === 'string' && responseData.mensaje.trim()) {
      return responseData.mensaje;
    }

    if (typeof responseData.error === 'string' && responseData.error.trim()) {
      return responseData.error;
    }
  }

  if (typeof error.message === 'string') {
    const normalizedMessage = error.message.trim();
    if (/timeout/i.test(normalizedMessage) || error.code === 'ECONNABORTED') {
      return 'La solicitud tardó demasiado en responder';
    }

    if (/network error/i.test(normalizedMessage)) {
      return 'Error de red. Verifica tu conexión';
    }

    if (normalizedMessage) {
      return normalizedMessage;
    }
  }

  return 'Ocurrió un error desconocido';
}
