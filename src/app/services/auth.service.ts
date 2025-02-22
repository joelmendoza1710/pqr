import { Injectable } from "@angular/core"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isLoggedIn = false

  login(username: string, password: string): boolean {
    // Simular autenticación
    if (username === "admin" && password === "password") {
      this.isLoggedIn = true
      return true
    }
    return false
  }

  logout(): void {
    this.isLoggedIn = false
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn
  }
}

