function isNumber(value: any): boolean {
  const number = Number(String(value));

  if (isNaN(number)) {
    return false;
  }

  if (!isFinite(number)) {
    return false;
  }

  return true;
}

export default isNumber;
