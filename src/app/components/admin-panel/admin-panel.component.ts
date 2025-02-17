import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { PqrService } from "../../services/pqr.service"

@Component({
  selector: "app-admin-panel",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asunto</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                @for (pqr of pqrs; track pqr.id) {
                  <tr>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ pqr.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ pqr.type }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">{{ pqr.subject }}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {{ pqr.status }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button (click)="updateStatus(pqr.id, 'En proceso')" class="text-indigo-600 hover:text-indigo-900 mr-2">En proceso</button>
                      <button (click)="updateStatus(pqr.id, 'Resuelto')" class="text-green-600 hover:text-green-900">Resuelto</button>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminPanelComponent implements OnInit {
  pqrs: any[] = []

  constructor(private pqrService: PqrService) {}

  ngOnInit() {
    this.loadPqrs()
  }

  loadPqrs() {
    this.pqrService.getPqrs().subscribe({
      next: (pqrs) => {
        this.pqrs = pqrs
      },
      error: (error) => {
        console.error("Error al obtener PQRs", error)
      },
    })
  }

  updateStatus(id: number, status: string) {
    this.pqrService.updatePqrStatus(id, status).subscribe({
      next: () => {
        this.loadPqrs()
      },
      error: (error) => {
        console.error("Error al actualizar el estado del PQR", error)
      },
    })
  }
}

