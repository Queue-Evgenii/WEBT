import { HttpHeaders } from "@angular/common/http";

export function headers() : HttpHeaders {
  let httpHeaders = new HttpHeaders();
  const token = localStorage.getItem("token")
  if (token) {
    httpHeaders = httpHeaders.append("Authorization", "Bearer " + JSON.parse(token))
    httpHeaders = httpHeaders.append("Content-Type", "application/json")
  }
  return httpHeaders;
}