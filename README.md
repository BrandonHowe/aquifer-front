# disclone

This is the front end of my disclone. It's a clone of discord that I'm making to reinforce my knowledge of Vue, Webpack, and websockets. Hopefully it'll grow into something meaningful but it probably won't. Do what you wish with this repo, although I am not going to accept PR's (most likely).

## Project setup
```
npm install
```

### Compiles for development
```
npm run dev
```
I use webpack to serve my files, you can use `npm run serve` but I prefer webpack. Output goes to `dist/aquifer.bundle.dev.js`. You can see the file at `dist/index.html`.

### Compiles and minifies for production
```
npm run prod
```
Again, I use webpack, so the Vue `npm run build` is unnecessary. Output goes to `production/aquifer.bundle.prod.js`. You can see the file at `production/index.html`.

### Run your tests
```
npm run test
```
I don't use tests, at least not in this small-scale of a project. I might add them later, but not now.

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).