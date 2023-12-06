export const NUMBER = {
  compact: function(value = 0) {
    return value.toLocaleString("en-US", {
      notation: "compact",
    });
  },
};
