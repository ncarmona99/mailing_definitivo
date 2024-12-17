Este es el archivo principal del Api-Gateway. Para hacerlo funcionar es necesario cumplir con los siguientes pasos:

1. Instalación de Docker y Docker compose (deben estar abiertos para construir y levantar el proyecto)
2. Navegar al directorio api-gateway
3. Construir y levantar los servicios escribiendo el sigueinte comando: docker-compose up --build
4. Para validar que todo esté corriendo, debería estar funcionando el puerto 4000 del localhost: http://localhost:4000
5. (El prototipo fue pensado para funcionar netamente a través de backend, enviando Json a las diferentes API)
