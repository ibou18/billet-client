const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateString(length, number) {
  let result = { code: "", status: false };
  let array = [];
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result.code += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  array.push(result);
  console.log("result", result);
  return result;
}
