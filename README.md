# tarea2_proyecto_cita_medica

## Integrantes:
- Huber Acarapi Mamani


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Ejecutar JSON Server

Instalar Json-server

```
npm install -g  json-server@0.17.1
```
Ejecutar Json-server

```
json-server --watch src/db/db.json --port 4000
```

Resources
  http://localhost:4000/pacientes
  http://localhost:4000/citas

  Home
  http://localhost:4000

  ```json
  {
  "pacientes": [
    { "id": 1, "nombre": "Juan Pérez", "edad": 35, "telefono": "555-1234" },
    { "id": 2, "nombre": "María López", "edad": 28, "telefono": "555-5678" }
  ],
  "citas": [
    { "id": 1, "fecha": "2024-12-30", "hora": "10:00", "pacienteId": 1, "descripcion": "Consulta general" },
    { "id": 2, "fecha": "2024-12-31", "hora": "11:00", "pacienteId": 2, "descripcion": "Chequeo anual" }
  ]
}
```

# Descripción del Proyecto
## Sistema de Gestión de Citas Médicas

Este proyecto es una aplicación web para la gestión de citas médicas. Permite manejar dos entidades principales: **Pacientes** y **Citas**, con funcionalidades completas de CRUD (Crear, Leer, Actualizar y Eliminar). Además, incluye un buscador y un filtro para facilitar la navegación.

## Características

- **Pacientes**
  - Crear, listar, editar y eliminar pacientes.
  - Búsqueda de pacientes por nombre.
  
- **Citas**
  - Crear, listar, editar y eliminar citas médicas.
  - Relación con pacientes mediante `pacienteId`.
  - Filtro por fecha para listar citas.

## Tecnologías Utilizadas

- **Frontend**: [Vue.js 3](https://vuejs.org/) con componentes personalizados.
- **Backend**: [json-server](https://github.com/typicode/json-server) para simular una API REST.

## Requisitos Previos

Asegúrate de tener instalados los siguientes programas:
- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación y Configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/citas-medicas.git
cd citas-medicas