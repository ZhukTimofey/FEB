export const sortWithInterval = (cons: () => void, pros: () => void) => {
  const interval = setInterval(() => {
    cons();
    pros();
  }, 10000);
  setTimeout(() => {
    clearInterval(interval);
  }, 300000);
};
