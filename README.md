# # Cerviño Bernabé - Junior Fullstack Developer Challenge

Solución técnica para el challenge de Nimble Gravity.

## Requisitos

- Usar React (cualquier versión).
- Mostrar un listado de posiciones obtenido de la API.
- Cada posición debe tener un campo de input para la URL del repo de GitHub y un botón "Submit".
- El botón debe hacer el POST con el body correcto.
- Manejar estados de carga y error en la UI.

## Tecnologías Utilizadas

- **Core:** React 19, TypeScript, Vite.
- **Estilos:** Tailwind CSS v4 (Mobile First & Responsive Design).
- **Arquitectura:** Modular (Services, Hooks, Atomic Components).
- **Estado:** Custom Hooks para gestión de API (`useJobs`, `useCandidate`).

## Características Implementadas

1.  **Arquitectura Limpia:** Separación estricta de responsabilidades.
    - `services/`: Capa de abstracción para fetch y manejo de errores HTTP.
    - `hooks/`: Lógica de negocio y ciclo de vida (loading/error/success).
    - `components/ui/`: UI Kit reutilizable (Card, Button, Input).
2.  **UX/UI Robusta:**
    - Indicador visual de estado de sesión (Conexión con API).
    - Feedback inmediato al usuario (Spinners, Toasts nativos, Badges).
    - Validación de inputs (Sanitización con `.trim()` antes del envío).
    - Diseño responsive adaptado a móviles y escritorio.
3.  **Seguridad & Buenas Prácticas:**
    - Tipado estricto con TypeScript (Interfaces para Payload y Responses).
    - Manejo de errores centralizado.
    - Variables de entorno para endpoints de API.

## Cómo ejecutar el proyecto

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/Bertz96/nimble-gravity-challenge
    cd nimble-gravity-challenge
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crear un archivo `.env` en la raíz, reemplazando BASE_URL con la URL del challenge:

    ```env
    VITE_BASE_URL="BASE_URL"
    ```

4.  **Correr en desarrollo:**
    ```bash
    npm run dev
    ```

## Estructura del Proyecto

```text
src/
├── components/       # Componentes visuales
│   ├── ui/           # Átomos (Button, Input, Card)
│   └── JobCard.tsx   # Tarjeta de postulación
├── hooks/            # Lógica de React (useJobs, useCandidate)
├── services/         # Comunicación con API externa
├── types/            # Definiciones TypeScript (Interfaces)
└── App.tsx           # Integración principal
```
