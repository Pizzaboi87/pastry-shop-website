import { useSwalMessage } from "./useSwalMessage";

export const useValidation = (validationRules) => {
  const { showErrorSwal } = useSwalMessage();

  const rules = {
    name: /^[-\p{L}\s]+$/u,
    password: /^[0-9,.\-()_;:?!%"@#$/€\p{L}\s]+$/u,
    text: /^[0-9A-Za-z,.\-;:?!()%"@$/€\p{L}0-9\n\s]+$/u,
    email: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    normal: /^[\p{L}\-.()\//0-9\s]+$/u,
    withNumber: /^[\p{L}0-9-.()\//\s]+$/u,
    comment:
      /(?:[\u{1F000}-\u{1FFFF}]|\p{Emoji_Presentation}|\p{Emoji}\ufe0f|[\p{L}0-9,.\-;:?!()%"@$/€\n\s])/u,
  };

  const isValid = () => {
    for (const fieldName in validationRules) {
      const rule = validationRules[fieldName];
      const value = rule.value;

      const regex = rules[rule.validationRule];

      if (regex && !regex.test(value)) {
        showErrorSwal(rule.errorMessage);
        return false;
      }
    }

    return true;
  };

  return { isValid };
};
