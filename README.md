# x-retro

x-retro provides custom elements for retro emulators.

## Adding to your page

Add this to your head:

```html
<script src="https://matthewbauer.us/x-retro.js"></script>
```

and put this in your body:

```html
<canvas is="x-retro" src="/my-super-nintendo-rom.sfc" core="snes9x-next" autostart></canvas>
```

## Cores supported

Any [retrojs](https://github.com/matthewbauer/retrojs) compatible core should work. Right now, the built version only contains support for the snes9x-next core.

## Running locally

```sh
git clone https://github.com/matthewbauer/x-retro.git
cd x-retro
npm install
npm start
```

Navigate to localhost:8080

## Contributing

Look at the open issues and make pull request.
