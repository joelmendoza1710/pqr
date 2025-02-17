import { Component } from "@angular/core"
import { type FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms"
import type { PqrService } from "../../services/pqr.service"

@Component({
  selector: "app-pqr-form",
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="pqrForm" (ngSubmit)="onSubmit()" class="space-y-6">
      <div>
        <label for="type" class="block text-sm font-medium text-gray-700">Tipo</label>
        <select id="type" formControlName="type" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="peticion">Petición</option>
          <option value="queja">Queja</option>
          <option value="reclamo">Reclamo</option>
        </select>
      </div>
      <div>
        <label for="subject" class="block text-sm font-medium text-gray-700">Asunto</label>
        <input type="text" id="subject" formControlName="subject" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea id="description" formControlName="description" rows="3" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
      </div>
      <div>
        <button type="submit" [disabled]="!pqrForm.valid" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Enviar PQR
        </button>
      </div>
    </form>
  `,
})
export class PqrFormComponent {
  pqrForm = this.fb.group({
    type: ["", Validators.required],
    subject: ["", Validators.required],
    description: ["", Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private pqrService: PqrService,
  ) {}

  onSubmit() {
    if (this.pqrForm.valid) {
      this.pqrService.submitPqr(this.pqrForm.value).subscribe({
        next: () => {
          alert("PQR enviado con éxito")
          this.pqrForm.reset()
        },
        error: (error) => {
          console.error("Error al enviar PQR", error)
          alert("Error al enviar PQR")
        },
      })
    }
  }
}

