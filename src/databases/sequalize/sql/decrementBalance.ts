export const decrementIfUserFoundUnsafe = (id: string, amount: number) => {
  return `
DO $$
BEGIN
  UPDATE users SET balance = balance - ${amount} WHERE id = '${id}' AND balance > ${amount}
END $$
`;
};
