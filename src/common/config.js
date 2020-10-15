
// export const SERVER_URL = "http://localhost:8000";
// export const API_URL = "http://localhost:8000/api";
export const SERVER_URL = "http://wlinii.com/appservice";
export const API_URL = "http://wlinii.com/appservice/api";
export const API_KEY = "$2y$10$ZwSKw2BFOm3QpL/ddQ4unu1H4sKvem2qqo2H..uDcIP/Pt.Y.rxE.";
// export default { API_URL, SERVER_URL };

export const Nav_Links = [
    {
        name: "Perfil",
        icon: "user",
        path: "/agente",
        type: ["1", "2"]
    },
    {
        name: "Perfil Brocker",
        icon: "user",
        path: "/perfil/brocker",
        type: ["3"]
    },
    {
        name: "Editar perfil",
        icon: "edit",
        path: "/agente/perfil",
        type: ["1", "2", "3"]
    },
    {
        name: "Publicaciónes",
        icon: "globe",
        path: "/publicaciones",
        type: ["3"]
    },
    {
        name: "Publicación",
        icon: "lock",
        path: "/publicaciones/nueva",
        type: ["1", "2"]
    },
    {
        name: "Administrar",
        icon: "globe",
        path: "/publicaciones",
        type: ["1", "2"]
    },
    {
        name: "AMC",
        icon: "database",
        path: "/amc/1",
        type: ["1", "2"]
    },
    {
        name: "Cerrar Sesión",
        icon: "logout",
        type: null
    }
];

export const Filters = [
    {
      state: false,
      name: "Ubicación",
      options: [],
      selectOption: null
    },
    {
      state: false,
      name: "Tipo de Operación",
      options: [],
      toggle: true,
      selectOption: null
    },
    {
      state: false,
      name: "Tipo de inmueble",
      options: [],
      toggle: true,
      selectOption: null
    },
    {
      state: false,
      name: "Fecha de Publicación",
      type: null,
      toggle: true,
      options: ["Desde Ayer", "Hoy", "Última Semana", "Últimos 15 Días", "Últimos 30 Días", "Últimos 45 Días"],
      selectOption: null
    },
    {
      state: false,
      name: "Dormitorios",
      type: "row",
      options: ["1", "2", "3", "4", ">5"],
      selectOption: null
    },
    {
      state: false,
      name: "Baños",
      type: "row",
      options: ["1", "2", "3", "4", ">5"],
      selectOption: null
    },
    {
      state: false,
      name: "Estacionamientos",
      type: "row",
      options: ["1", "2", "3", "4", ">5"],
      selectOption: null
    },
    {
      state: false,
      name: "Superficie",
      type: "selection-range",
      toggle: true,
      options: ["Techada", "Total"],
      selectOption: null,
      range: []
    },
    {
      state: false,
      name: "Precio",
      type: "selection-range",
      toggle: true,
      options: ["Soles", "Dolares", "Euros"],
      selectOption: null,
      range: []
    }
  ]