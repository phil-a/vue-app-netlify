export const Rules = {
  required: (value: string) => !!value || "Required",

  alphabeticOnly: (value: string) => {
    if (value) {
      const pattern = /^([a-zA-Z ' ` ~ ñ á é ü ô č]*)$/;
      return pattern.test(value) || "Must contain only letters";
    }
    return true;
  },

  email: (value: string) => {
    if (value) {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || "Invalid e-mail.";
    }
    return true;
  },

  maxValue: (value: string, length: number) => {
    if (value) {
      return (
        (value.length > 0 && value.length < length) ||
        "Should not have more than " + ": " + length + " " + "characters"
      );
    }
    return true;
  },

  max60: (value: string) => {
    return Rules.maxValue(value, 60);
  },

  max100: (value: string) => {
    return Rules.maxValue(value, 100);
  },

  max255: (value: string) => {
    return Rules.maxValue(value, 255);
  },
};
