class ApiResponse extends Error {
  constructor(
    statusCode,
    data,
    message = "Success",
    success,
  ) {

    this.statusCode = statusCode < 400
    this.data = data
    this.message = message
    this.success = success

  }
}

export { ApiResponse }