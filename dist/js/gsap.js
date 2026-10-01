// const tl = gsap.timeline();

// tl.fromTo(
//   ".js-title-1",
//   {
//     x: -500// 100px右
//   },{
//     duration: 1.5,
//     ease: "back.out(2)",
//     x: 0
//   });

//   tl.fromTo(
//   ".js-title-2",
//   {
//     y: 200, // 100px下
//     opacity: 0
//   },
//   {
//     duration: 1.2,
//     opacity: 1,
//     y: 0
//   });

// const tl = gsap.timeline();

// tl.fromTo(
//   ".js-title-1",
//   {
//     x: -500, // 100px左から
//   },
//   {
//     duration: 1.5,
//     ease: "back.out(2)",
//     x: 0,
//   },
// )
//   .fromTo(
//     ".js-title-2",
//     {
//       y: 200,
//       opacity: 0,
//     },
//     {
//       duration: 1.2,
//       opacity: 1,
//       y: 0,
//     },
//   )
//   .fromTo(
//     ".js-title-3",
//     {
//       rotateZ: "180deg",
//       scale: 1.5,
//       opacity: 0,
//     },
//     {
//       rotateZ: "0deg",
//       scale: 1,
//       duration: 0.8,
//       opacity: 1,
//       y: 0,
//     },
//   );

gsap.fromTo(
  ".js-title-1",
  {
    x: -500, // 100px左から
  },
  {
    duration: 1.5,
    ease: "back.out(2)",
    x: 0,
    scrollTrigger: {
      trigger: ".js-title-1",
      start: "top 75%",
    },
  },
);

gsap.fromTo(
  ".js-title-2",
  {
    y: 200,
    opacity: 0,
  },
  {
    duration: 1.2,
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: ".js-title-2",
      start: "top 75%",
    },
  },
);

gsap.fromTo(
  ".js-title-3",
  {
    rotateZ: "180deg",
    scale: 1.5,
    opacity: 0,
  },
  {
    rotateZ: "0deg",
    scale: 1,
    duration: 0.8,
    opacity: 1,
    y: 0,
    scrollTrigger: {
      trigger: ".js-title-3",
      start: "top 75%",

    //   markers: true,
    },
  },
);

////////////////////////////////////////////
