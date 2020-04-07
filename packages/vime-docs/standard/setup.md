# Setup

[![html5-version-badge]][html5-package]
[![html5-size-badge]][html5-size]
[![youtube-version-badge]][youtube-package]
[![youtube-size-badge]][youtube-size]
[![vimeo-version-badge]][vimeo-package]
[![vimeo-size-badge]][vimeo-size]
[![dailymotion-version-badge]][dailymotion-package]
[![dailymotion-size-badge]][dailymotion-size]
[![license-badge]][license]
[![github-badge]][github]
[![tweet-badge]][tweet]

The Standard Player is used to interact with a provider/embed through the [core Vime player interface](./api/player.md).
If you'd like to know what features it includes and how it compares to other options then see 
the [getting started](../getting-started.md) page.

{% hint style="info" %}
If you want to try it out before installing then head over to our [playground][vime-playground].
{% endhint %}

[html5-package]: https://www.npmjs.com/package/@vime-js/html5
[html5-version-badge]: https://img.shields.io/npm/v/@vime-js/html5?label=html5&style=flat-square
[html5-size]: https://bundlephobia.com/result?p=@vime-js/html5
[html5-size-badge]: https://img.shields.io/bundlephobia/minzip/@vime-js/html5?label=html5&style=flat-square

[youtube-package]: https://www.npmjs.com/package/@vime-js/youtube
[youtube-version-badge]: https://img.shields.io/npm/v/@vime-js/youtube?label=youtube&style=flat-square
[youtube-size]: https://bundlephobia.com/result?p=@vime-js/youtube
[youtube-size-badge]: https://img.shields.io/bundlephobia/minzip/@vime-js/youtube?label=youtube&style=flat-square

[vimeo-package]: https://www.npmjs.com/package/@vime-js/vimeo
[vimeo-version-badge]: https://img.shields.io/npm/v/@vime-js/vimeo?label=vimeo&style=flat-square
[vimeo-size]: https://bundlephobia.com/result?p=@vime-js/vimeo
[vimeo-size-badge]: https://img.shields.io/bundlephobia/minzip/@vime-js/vimeo?label=vimeo&style=flat-square

[dailymotion-package]: https://www.npmjs.com/package/@vime-js/dailymotion
[dailymotion-version-badge]: https://img.shields.io/npm/v/@vime-js/dailymotion?label=dailymotion&style=flat-square
[dailymotion-size]: https://bundlephobia.com/result?p=@vime-js/dailymotion
[dailymotion-size-badge]: https://img.shields.io/bundlephobia/minzip/@vime-js/dailymotion?label=dailymotion&style=flat-square

[license]: https://github.com/vime-js/vime/blob/master/LICENSE
[license-badge]: https://img.shields.io/github/license/vime-js/vime?color=blue&style=flat-square
[tweet]: https://twitter.com/intent/tweet?text=Check%20out%20Vime%20%28https%3A%2F%2Fgithub.com%2Fvime-js%2Fvime%29%2C%20it%20makes%20embedding%20and%20using%20media%20players%20for%20the%20web%20simple.%20It%20supports%20Html5%2C%20YouTube%2C%20Dailymotion%2C%20Vimeo%20and%20more%20to%20come%21
[tweet-badge]: https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Fvime-js%2Fvime
[github]: https://github.com/vime-js/vime
[github-badge]: https://img.shields.io/github/stars/vime-js/vime?style=social
[vime-playground]: https://playground.vime-js.com/?path=/story/standard

## Installation

You can replace `{provider}` below with:

- html5
- youtube
- vimeo
- dailymotion

{% tabs %}
{% tab title="NPM" %}
```
npm install @vime-js/{provider}
```
{% endtab %}

{% tab title="YARN" %}
```
yarn add @vime-js/{provider}
```
{% endtab %}

{% tab title="UNPKG" %}
```html
<script src="https://unpkg.com/@vime-js/{provider}"></script>
```
{% endtab %}
{% endtabs %}

The `dist` folder inside the package contains multiple exports:

- `{provider}.js` is a UMD development build that can be used directly in the browser via the `<script>` tag.
- `{provider}.esm.js` is intended for use with modern bundlers like [Webpack][webpack] or [Rollup][rollup].
- `{provider}.min.js` is a UMD production build that can be used directly in the browser via the `<script>` tag.
- `{provider}.esm.min.js` is an ESM production build that can be used directly in modern browsers via the `<script type="module">` tag.

{% hint style="info" %}
* UMD builds are exported under the `Vime` namespace.
* If you're using a bundler then it will automatically pull in the correct files.
* If you're using [svelte-loader][svelte-loader] or [rollup-plugin-svelte][svelte-rollup] then you'll receive the uncompiled components.
{% endhint %}

[webpack]: https://webpack.js.org
[rollup]: http://rollupjs.org/guide/en
[svelte-loader]: https://github.com/sveltejs/svelte-loader
[svelte-rollup]: https://github.com/sveltejs/rollup-plugin-svelte

## Setup

The following uses YouTube to demonstrate how to get started but you can easily tailor it
to the provider you need.

{% tabs %}
{% tab title="JavaScript" %}
```js
import { YouTube } from '@vime-js/youtube';

const target = document.getElementById('player-target');

// Mount
const player = new YouTube({
  target,
  // If you'd like to initialize any props on setup, you can do so here.
  props: {}
});

// ...

// Destroy
player.$destroy();
```

{% hint style="info" %}
See the Svelte [Client-side component API][svelte-client-api] for the complete set of component initialization options.
{% endhint %}
{% endtab %}

[svelte-client-api]: https://svelte.dev/docs#Client-side_component_API

{% tab title="Svelte" %}
```html
<YouTube bind:this={player} />

<script>
  import { onMount } from 'svelte';
  import { YouTube } from '@vime-js/youtube';

  let player;

  onMount(() => {
    /**
     * If you need to call any methods, you have access 
     * to the player instance here.
     **/
  });
</script>
```
{% endtab %}
{% endtabs %}