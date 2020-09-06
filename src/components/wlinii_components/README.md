## Instalación

1_ Copiar el contenido del repositorio dentro de la carpeta components del proyecto Vue.
<br>
<br>
2_ Instalar las dependencias necesarias.

```
npm i node-sass sass-loader vue-carousel animejs
```

3_ Importar el archivo principal del proyecto dentro en el archivo "main.js" o "app.js"

```js
import Vue from "vue";
// ...
import "./components/wlinii_components";
```

## Configuración

Si va a usar los componentes en una aplicación creada con Vue-cli, es importante
incluir "runtimeCompiler: true" dentro del archivo "vue.config.js". Si no tiene el archivo,
puede crearlo en el directorio raíz de su proyecto.

```js
module.exports = {
    // ...
    runtimeCompiler: true
};
```