class ApiResponse {
  constructor(statusCode, response, message = "Success") {
    this.statusCode = statusCode;
    this.response = response;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
