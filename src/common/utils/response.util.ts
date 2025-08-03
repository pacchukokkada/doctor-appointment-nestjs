export function successResponse<T>(data: T, message = 'Success', paginatedData) {
    return  {
      status: 'success',
      message,
      data,
      ...paginatedData
    };
  }
  