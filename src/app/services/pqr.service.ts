import { Injectable } from "@angular/core"
import type { HttpClient } from "@angular/common/http"
import { type Observable, of } from "rxjs"
import { delay } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class PqrService {
  private pqrs: any[] = []

  constructor(private http: HttpClient) {}

  submitPqr(pqr: any): Observable<any> {
    // Simulamos una llamada a la API
    const newPqr = { ...pqr, id: this.pqrs.length + 1, status: "Pendiente" }
    this.pqrs.push(newPqr)
    return of(newPqr).pipe(delay(500))
  }

  getPqrs(): Observable<any[]> {
    // Simulamos una llamada a la API
    return of(this.pqrs).pipe(delay(500))
  }

  updatePqrStatus(id: number, status: string): Observable<any> {
    // Simulamos una llamada a la API
    const pqr = this.pqrs.find((p) => p.id === id)
    if (pqr) {
      pqr.status = status
    }
    return of(pqr).pipe(delay(500))
  }
}

