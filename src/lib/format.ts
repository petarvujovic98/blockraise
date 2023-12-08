import { format as fns } from "date-fns";

export const NUMBER = {
  compact: function(value = 0) {
    return value.toLocaleString("en-US", {
      notation: "compact",
    });
  },
};

export const DATE = {
  date: function(value: string | number | Date = Date.now()) {
    return fns(new Date(value), "PPPP");
  },
  input: function(value: string | number | Date = Date.now()) {
    return fns(new Date(value), "PPP");
  },
};
