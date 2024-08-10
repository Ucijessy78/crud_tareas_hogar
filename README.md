# Informe del Proyecto: Web Component con Stencil

## Introducción

Este proyecto utiliza Stencil para construir un Web Component independiente destinado a la gestión de tareas. Stencil es una herramienta que combina los mejores conceptos de los frameworks frontend populares en una herramienta de compilación para generar Web Components estándar. El componente incluye funcionalidades para listar, editar y eliminar tareas, utilizando SVG para los íconos en lugar de una librería externa como Font Awesome.

## Descripción del Proyecto

El componente  task-list permite gestionar una lista de tareas. Incluye funciones para visualizar las tareas existentes, editar detalles de una tarea y eliminar tareas. La interfaz está diseñada para ser intuitiva y funcional, integrando los estilos necesarios directamente en el componente.

## Configuración del Entorno

Para configurar el entorno del proyecto, sigue estos pasos:

1. **Clonar el Repositorio**

   Clona este repositorio en un nuevo directorio y elimina la referencia remota original:

     git clone https://github.com/ionic-team/stencil-component-starter.git my-component
   cd my-component
   git remote rm origin
   
Instalar Dependencias
Instala las dependencias necesarias para el proyecto: 
npm install
Iniciar el Servidor de Desarrollo
Inicia el servidor de desarrollo para ver los cambios en tiempo real:
npm start
Construir el Componente para Producción

Construye el componente para producción:

npm run build
Ejecutar las Pruebas Unitarias

Ejecuta las pruebas unitarias para verificar el funcionamiento de los componentes:

npm test
Desinstalar Font Awesome

Si has instalado Font Awesome previamente y deseas desinstalarlo, utiliza el siguiente comando:

npm uninstall @fortawesome/fontawesome-free
Elimina cualquier referencia a Font Awesome en los archivos del proyecto, como importaciones en CSS o en el código JavaScript.

Desarrollo del Componente
Componente task-list
El componente task-list permite gestionar una lista de tareas, mostrando una tabla con las opciones para editar y eliminar tareas.
