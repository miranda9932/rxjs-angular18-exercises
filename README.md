# RxJS + Angular 18 Exercises

Proyecto preparado para practicar RxJS dentro de una aplicación Angular 18 standalone.

## Requisitos

- Node.js recomendado: 20.x LTS o superior compatible con Angular 18.
- Visual Studio Code.
- Terminal integrada de VS Code.

## Instalación

```bash
npm install
```

## Ejecutar

```bash
npm start
```

Abre:

```txt
http://localhost:4200
```

## Qué contiene

La app está dividida en rutas:

1. `01 - Bases RxJS`  
   `Observable`, `of`, `from`, `interval`, `pipe`, `map`, `filter`, `tap`, `take`.

2. `02 - Subjects`  
   Diferencias entre `Subject`, `BehaviorSubject` y `ReplaySubject`.

3. `03 - AsyncPipe`  
   Cómo consumir Observables en Angular 18 sin dejar suscripciones abiertas. Incluye `AsyncPipe` y `takeUntilDestroyed`.

4. `04 - HTTP`  
   Servicio con `HttpClient`, mapping DTO -> modelo de vista y `catchError`.

5. `05 - Cache`  
   Cache en memoria con `shareReplay({ bufferSize: 1, refCount: false })`.

6. `06 - Trigger`  
   HTTP disparado por un `Subject` usando `switchMap`.

7. `07 - HTTP encadenado`  
   Primera llamada devuelve un ID y la segunda devuelve el detalle final.

8. `08 - Filtrado`  
   Filtrar datos sin modificar el Observable original usando `combineLatest`.

9. `09 - Mini reto final`  
   Combina búsqueda, trigger, HTTP, filtros y `AsyncPipe`.

## Backend mock

No necesitas levantar ningún backend. El proyecto usa un interceptor en:

```txt
src/app/core/mock-api.interceptor.ts
```

Este interceptor simula:

```txt
GET  /api/users
GET  /api/users?search=...
POST /api/orders
GET  /api/orders/:id
```

## Estructura principal

```txt
src/app
├── app.component.ts
├── app.config.ts
├── app.routes.ts
├── core
│   ├── mock-api.interceptor.ts
│   ├── models.ts
│   ├── order.service.ts
│   └── user.service.ts
├── exercises
│   ├── 01-basics
│   ├── 02-subjects
│   ├── 03-async-pipe
│   ├── 04-http
│   ├── 05-cache
│   ├── 06-trigger
│   ├── 07-chained-http
│   ├── 08-filter
│   └── 09-mini-challenge
└── shared
    └── user-list.component.ts
```

## Forma recomendada de practicar

No intentes hacerlo todo de golpe. Hazlo así:

1. Ejecuta la app.
2. Entra en el ejercicio 01.
3. Lee el componente correspondiente.
4. Modifica una línea.
5. Guarda y observa el navegador.
6. Pasa al siguiente ejercicio.

## Nota

El proyecto no incluye `node_modules`. Eso es normal. Debes ejecutar `npm install` después de descomprimirlo.
