class ApiResponse {
  constructor(statusCode, response, token, message = "Success") {
    this.statusCode = statusCode;
    this.response = token ? { response, token } : response;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export default ApiResponse;
