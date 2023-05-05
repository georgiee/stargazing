import {viteStaticCopy} from 'vite-plugin-static-copy'

/**
 * we provide all example content,
 * so we can load them unprocessed. Necessary for css files.
 * For other files we want vite to process them (like js files) so
 * we want to keep both worlds.
 */
export default {
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'examples2/**/*',
          dest: 'examples2-static'
        }
      ]
    })
  ]
}
