// 格式化金額顯示
export const formatMoneyShow = (amount: number) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
