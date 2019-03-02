// import { SlideBuilder } from './slide-builder';

// function run() {
//   const dashAnimationBuilder = new SlideBuilder();
//   dashAnimationBuilder.fragments([
//     () => {
//       console.log('fragment 1');
//       nextFrame();
//     },
//     () => {
//       console.log('fragment 2');
//       nextFrame();
//     },
//     () => {
//       console.log('fragment 3');
//       nextFrame();
//     },
//   ], () => {
//     console.log('hidden');
//     previousFrame();
//   });
// }
// window.addEventListener('DOMContentLoaded', run);

// const dashDemoFragments = new SlideBuilder(dashdemo);
//       dashDemoFragments.fragments([
//         () => {
//           console.log('fragment 1');
//           nextFrame();
//         },
//         () => {
//           console.log('fragment 2');
//           nextFrame();
//         },
//         () => {
//           console.log('fragment 3');
//           nextFrame();
//         },
//       ], () => {
//         console.log('hidden');
//         previousFrame();
//       });

//       function nextFrame() {
//         const iframe = dashdemo;
//         const content = iframe.contentWindow;;
//         console.log('nextFrame', content)

//         content.postMessage("next-topic", "*");
//       }

//       function previousFrame() {
//         const iframe = dashdemo;
//         const content = iframe.contentWindow;;
//         content.postMessage("previous-topic", "*");
//       }