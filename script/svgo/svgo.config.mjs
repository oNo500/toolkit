export default {
  multipass: false, // boolean
  js2svg: {
    indent: 4, // number
    pretty: true, // boolean
  },
  plugins: [
    // {
    //   name: "preset-default",
    //   params: {
    //     overrides: {
    //       //   removeViewBox: false,
    //     },
    //   },
    // },
    {
      name: "removeAttrs",
      params: {
        attrs: "(width|height|fill)",
      },
    },
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [
          { width: "1em" },
          { height: "1em" },
          { fill: "currentColor" },
        ],
      },
    },
  ],
};
