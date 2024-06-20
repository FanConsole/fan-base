function getInputType(integer) {
  return { type: "text", mode: integer ? "numeric" : "decimal" };
}
export {
  getInputType
};
