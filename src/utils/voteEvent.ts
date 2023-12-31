const intervalFunc = (
  intervalTime: any,
  clearTime: any,
  voteForPros: any,
  voteForCons: any,
) => {
  const interval = setInterval(() => {
    const rand = Math.random() - 0.5;
    if (rand > 0) {
      const score = Math.random() - 0.5;
      if (score > 0) {
        voteForPros(1);
      } else {
        voteForPros(-1);
      }
    } else {
      const score = Math.random() - 0.5;
      if (score > 0) {
        voteForCons(1);
      } else {
        voteForCons(-1);
      }
    }
  }, intervalTime);
  setTimeout(() => {
    clearTimeout(interval);
  }, clearTime);
};

export const generateVotes = (voteForPros: any, voteForCons: any) => {
  setTimeout(() => {
    intervalFunc(12, 20000, voteForPros, voteForCons);
  }, 5000);
  setTimeout(() => {
    intervalFunc(16, 40000, voteForPros, voteForCons);
  }, 25000);
  setTimeout(() => {
    intervalFunc(20, 40000, voteForPros, voteForCons);
  }, 65000);
  setTimeout(() => {
    intervalFunc(26, 180000, voteForPros, voteForCons);
  }, 105000);
};
