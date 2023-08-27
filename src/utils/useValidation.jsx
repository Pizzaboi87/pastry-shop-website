import { useSwalMessage } from "./useSwalMessage";

export const useValidation = (validationRules) => {
  const { showErrorSwal } = useSwalMessage();

  const rules = {
    name: /^[-\p{L}\s]+$/u,
    password: /^[0-9,.\-_;:?!()%"@$/€\p{L}\s]+$/u,
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
