# React clase dos

Este repositorio se hizo con la librería de `create-react-app`. Viene con muchos scripts y configuraciones ya armadas, pero la mayoría no serán necesarias. Para empezar a trabajar:

1. `npm install`
2. `npm start`

Eso es todo! La aplicación debería levantarse automáticamente en `localhost:3000`

## Tareas

Hay dos tareas para completar en esta clase.

La primera tarea consiste en completar el archivo `components/pages/TicTacToe.js`. Como en la clase anterior, este archivo contiene un componente que deben completar, aunque esta vez es más complicado. Si logran hacer la tarea, tendrán un juego de ta-te-ti funcional.

La segunda tarea consiste en re-implementar la tarea del memo test usando react. No hay archivo definido para esto, deben crear uno propio en `compontents/pages` y agregarlo a la lista de navegación que mostramos en `App.js`. Los estilos de este y como lo arman queda a su criterio, el único requisito es que se muestre en el header y que sea funcional.

## FAQ

Si al correr los comandos para correr la app les tira un error que dice `ERR_OSSL_EVP_UNSUPPORTED`, cambien la siguiente línea del package.json:

```
//antes
"start": "react-scripts start"

//despues
"start": "react-scripts --openssl-legacy-provider start"
```

Este es un bug con node 17 y react-scripts que debería arreglarse eventualmente. Ante todo siempre es más recomendable usar [la versión LTS de node](https://nodejs.org/en/).
