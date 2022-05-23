export const STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export const validPrice = (numberString) => numberString.replace('.', ',');

export const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');

export const changeStatusColor = (status) => {
  if (status === 'Pendente') {
    return '#BA9B45';
  }
  if (status === 'Preparando') {
    return '#4CAF55';
  }
  if (status === 'Em trânsito') {
    return '#CC6C6C';
  }
  if (status === 'Entregue') {
    return '#6CCCAF';
  }
  return '#4CAF50';
}
