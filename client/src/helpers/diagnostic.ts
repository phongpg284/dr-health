export const getBMI = (height: number, weight: number) => {
  return weight / (height * height);
};

export const getDiagnostic = (BMI: number) => {
  if (BMI < 18.5) return "Gầy";
  else if (BMI < 22.9) return "Bình thường";
  else if (BMI <= 24.9) return "Tiền béo phì";
  else if (BMI <= 29.9) return "Béo phì độ I";
  else return "Béo phì độ II";
};
