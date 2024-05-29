const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Comercios - Express API with Swagger (OpenAPI 3.0)",
            version: "0.1.0",
            description: "This is a CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "u-tad",
                url: "https://u-tad.com",
                email: "alvaro.salis@u-tad.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer"
                },
            },
            schemas: {
                users: {
                    type: "object",
                    required: ["nombre", "email", "password", "edad", "ciudad", "intereses", "recibirOfertas"],
                    properties: {
                        nombre: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                            format: "email",
                        },
                        password: {
                            type: "string",
                        },
                        edad: {
                            type: "number",
                        },
                        ciudad: {
                            type: "string",
                        },
                        intereses: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                        recibirOfertas: {
                            type: "boolean",
                            default: true,
                        },
                    },
                },
                comercios: {
                    type: "object",
                    required: ["nombre", "cif", "direccion", "email", "telefono", "id"],
                    properties: {
                        nombre: {
                            type: "string",
                        },
                        cif: {
                            type: "string",
                        },
                        direccion: {
                            type: "string",
                        },
                        email: {
                            type: "string",
                            format: "email",
                        },
                        telefono: {
                            type: "string",
                        },
                        id: {
                            type: "number",
                        },
                        eliminado: {
                            type: "boolean",
                            default: false,
                        },
                    },
                },
                paginas: {
                    type: "object",
                    properties: {
                        ciudad: {
                            type: "string",
                        },
                        actividad: {
                            type: "string",
                        },
                        titulo: {
                            type: "string",
                        },
                        resumen: {
                            type: "string",
                        },
                        textos: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                        fotos: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                        puntuaciones: {
                            type: "array",
                            items: {
                                type: "number",
                            },
                        },
                        resenas: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                        },
                    },
                },
            },
        },
        paths: {
            "/api/auth/register": {
                post: {
                    summary: "Registra un nuevo usuario",
                    tags: [
                        "users"
                    ],
                    requestBody: {
                        required: true,
                        
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users",
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Objeto con token de autenticación y datos del usuario registrado",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            token: { type: "string" },
                                            user: { $ref: "#/components/schemas/users" },
                                        },
                                    },
                                },
                            },
                        },
                        default: {
                            description: "Error al registrar al usuario",
                        },
                    },
                },
            },
            "/api/auth/login": {
                post: {
                    summary: "Inicia sesión de usuario",
                    tags: [
                        "users"
                    ],
                    requestBody: {
                        required: true,
                    
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        email: { type: "string" },
                                        password: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Objeto con token de autenticación y datos del usuario",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            token: { type: "string" },
                                            user: { $ref: "#/components/schemas/users" },
                                        },
                                    },
                                },
                            },
                        },
                        404: {
                            description: "Usuario no encontrado",
                        },
                        401: {
                            description: "Contraseña inválida",
                        },
                        default: {
                            description: "Error al hacer login del usuario",
                        },
                    },
                },
            },
            "/api/auth/paginas": {
                get: {
                    summary: "Obtiene todas las páginas",
                    tags: [
                        "paginas"
                    ],
                    responses: {
                        200: {
                            description: "Lista de páginas",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/paginas",
                                        },
                                    },
                                },
                            },
                        },
                        default: {
                            description: "Error al cargar las páginas",
                        },
                    },
                },
            },
            "/api/auth/paginas-id/{id}": {
                get: {
                    summary: "Obtiene una página por su ID",
                    tags: [
                        "paginas"
                    ],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Objeto de la página encontrada",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/paginas",
                                    },
                                },
                            },
                        },
                        default: {
                            description: "Error al cargar la página por ID",
                        },
                    },
                },
            },
            "/api/auth/paginas-ciudad/{ciudad}": {
                get: {
                    summary: "Obtiene páginas por ciudad",
                    tags: [
                        "paginas"
                    ],
                    parameters: [
                        {
                            name: "ciudad",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Lista de páginas encontradas en la ciudad",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/paginas",
                                        },
                                    },
                                },
                            },
                        },
                        default: {
                            description: "Error al cargar las páginas por ciudad",
                        },
                    },
                },
            },
            "/api/auth/paginas-ciudad-actividad/{ciudad}/{actividad}": {
                get: {
                    summary: "Obtiene páginas por ciudad y actividad",
                    tags: [
                        "paginas"
                    ],
                    parameters: [
                        {
                            name: "ciudad",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                        {
                            name: "actividad",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Lista de páginas encontradas en la ciudad y actividad especificadas",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/paginas",
                                        },
                                    },
                                },
                            },
                        },
                        default: {
                            description: "Error al cargar las páginas por ciudad y actividad",
                        },
                    },
                },
            },
            "/api/auth/update/{id}": {
                put: {
                    summary: "Actualiza un usuario por su ID",
                    tags: [
                        "users"
                    ],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users",
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Objeto del usuario actualizado",
                        },
                        default: {
                            description: "Error al actualizar el usuario",
                        },
                    },
                },
            },
            "/api/auth/updateSelf": {
                put: {
                    summary: "Actualiza el usuario actualmente autenticado",
                    tags: [
                        "users"
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/users",
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Objeto del usuario actualizado",
                        },
                        default: {
                            description: "Error al actualizar el usuario",
                        },
                    },
                },
            },
            "/api/auth/users": {
                get: {
                    summary: "Obtiene todos los usuarios",
                    tags: [
                        "users"
                    ],
                    responses: {
                        200: {
                            description: "Lista de usuarios",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/users",
                                        },
                                    },
                                },
                            },
                        },
                        default: {
                            description: "Error al obtener los usuarios",
                        },
                    },
                },
            },
            "/api/auth/grant/{id}": {
                patch: {
                    summary: "Concede el rol de administrador a un usuario",
                    tags: [
                        "users"
                    ],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Objeto de confirmación de concesión del rol de administrador",
                        },
                        default: {
                            description: "Error al conceder el rol de administrador",
                        },
                    },
                },
            },
            "/api/auth/valorar/{id}": {
                patch: {
                    summary: "Valorar una página",
                    tags: [
                        "paginas"
                    ],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        puntuacion: { type: "number" },
                                        resena: { type: "string" },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Objeto de la página actualizada con la valoración",
                        },
                        404: {
                            description: "Página no encontrada",
                        },
                        default: {
                            description: "Error al valorar la página",
                        },
                    },
                },
            },
            "/api/auth/users/{id}": {
                delete: {
                    summary: "Elimina un usuario por su ID",
                    tags: [
                        "users"
                    ],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Objeto de confirmación de eliminación del usuario",
                        },
                        default: {
                            description: "Error al eliminar el usuario",
                        },
                    },
                },
            },
            "/api/auth/registrarComercio": {
                post: {
                    summary: "Registra un nuevo comercio",
                    tags: [
                        "comercios"
                    ],
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/comercios",
                                },
                            },
                        },
                    },
                    responses: {
                        200: {
                            description: "Objeto del comercio registrado",
                        },
                        default: {
                            description: "Error al registrar el comercio",
                        },
                    },
                },
            },
            "/api/auth/consultarComercio/{id}": {
                get: {
                    summary: "Obtiene un comercio por su ID",
                    tags: [
                        "comercios"
                    ],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Objeto del comercio encontrado",
                        },
                        default: {
                            description: "Error al obtener el comercio por ID",
                        },
                    },
                },
            },
            "/api/auth/consultarComercios": {
                get: {
                    summary: "Obtiene todos los comercios",
                    tags: [
                        "comercios"
                    ],
                    tags: [
                        "comercios"
                    ],
                    responses: {
                        200: {
                            description: "Lista de comercios",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "array",
                                        items: {
                                            $ref: "#/components/schemas/comercios",
                                        },
                                    },
                                },
                            },
                        },
                        default: {
                            description: "Error al obtener los comercios",
                        },
                    },
                },
            },
            "/api/auth/borrarComercio/{id}": {
                delete: {
                    summary: "Elimina un comercio por su ID",
                    tags: [
                        "comercios"
                    ],
                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            schema: {
                                type: "string",
                            },
                        },
                    ],
                    responses: {
                        200: {
                            description: "Objeto de confirmación de eliminación del comercio",
                        },
                        default: {
                            description: "Error al eliminar el comercio",
                        },
                    },
                },
            },
            "/api/auth/loginComercio": {
                "post": {
                    "summary": "Realiza el inicio de sesión para un comercio.",
                    "tags": [
                        "comercios"
                    ],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        "email": {
                                            "type": "string"
                                        }
                                    },
                                    "required": ["email"]
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Objeto con el token de sesión y los datos del comercio"
                        },
                        "default": {
                            "description": "Error al iniciar sesión del comercio"
                        }
                    }
                }
            },
            "/api/auth/modificarPagina/{id}": {
                "put": {
                    "summary": "Modifica una página existente.",
                    "tags": [
                        "paginas"
                    ],
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        // Aquí debes incluir la estructura del body de la solicitud si tienes la definición
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Objeto de la página modificada"
                        },
                        "default": {
                            "description": "Error al modificar la página"
                        }
                    }
                }
            },
            "/api/auth/publicarPagina": {
                "post": {
                    "summary": "Publica una nueva página.",
                    "tags": [
                        "paginas"
                    ],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        // Aquí debes incluir la estructura del body de la solicitud si tienes la definición
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Objeto de la página publicada"
                        },
                        "default": {
                            "description": "Error al publicar la página"
                        }
                    }
                }
            },
            "/api/auth/borrarPagina/{id}": {
                "delete": {
                    "summary": "Elimina una página por su ID.",
                    "tags": [
                        "paginas"
                    ],
                    "parameters": [
                        {
                            "name": "id",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Objeto de confirmación de eliminación de la página"
                        },
                        "default": {
                            "description": "Error al eliminar la página"
                        }
                    }
                }
            },
            "/api/auth/subirFoto": {
                "post": {
                    "summary": "Sube una foto a una página existente.",
                    "tags": [
                        "paginas"
                    ],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "multipart/form-data": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        // Aquí debes incluir la estructura del body de la solicitud si tienes la definición
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Objeto con el mensaje de éxito y detalles de la foto subida"
                        },
                        "400": {
                            "description": "No se ha subido ninguna imagen"
                        },
                        "404": {
                            "description": "Página no encontrada"
                        },
                        "default": {
                            "description": "Error al subir la foto"
                        }
                    }
                }
            },
            "/api/auth/subirTexto": {
                "post": {
                    "summary": "Sube un texto a una página existente.",
                    "tags": [
                        "paginas"
                    ],
                    "requestBody": {
                        "required": true,
                        "content": {
                            "application/json": {
                                "schema": {
                                    "type": "object",
                                    "properties": {
                                        // Aquí debes incluir la estructura del body de la solicitud si tienes la definición
                                    }
                                }
                            }
                        }
                    },
                    "responses": {
                        "200": {
                            "description": "Objeto con el mensaje de éxito"
                        },
                        "500": {
                            "description": "Error interno del servidor"
                        }
                    }
                }
            },
            "/api/auth/buscarUsuarios/{ciudad}": {
                "get": {
                    "summary": "Obtiene usuarios por ciudad.",
                    "tags": [
                        "users"
                    ],
                    "parameters": [
                        {
                            "name": "ciudad",
                            "in": "path",
                            "required": true,
                            "schema": {
                                "type": "string"
                            }
                        }
                    ],
                    "responses": {
                        "200": {
                            "description": "Lista de usuarios en la ciudad especificada"
                        },
                        "default": {
                            "description": "Error al obtener usuarios por ciudad"
                        }
                    }
                }
            },            
        },
    },
    apis: ["./routes/*.js"],
};

module.exports = swaggerJsdoc(options);
