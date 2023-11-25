#!/bin/sh

# Instalar las dependencias de la aplicación
npm install

# Compilar el código de la aplicación
npm run devStart

# Generar el archivo de distribución
cp -r dist .