import { create } from "zustand";

// const step = (arr: any[], lo: number, hi: number): number => {
//   let inx = lo - 1;
//   const pivot = hi;
//   const sumOfPivot = arr[pivot].plus + arr[pivot].minus;
//   for (let i = lo; i < pivot; i++) {
//     const sumOfI = arr[i].plus + arr[i].minus;
//     if (sumOfI < sumOfPivot) {
//       inx++;
//       const temp = arr[i];
//       arr[i] = arr[inx];
//       arr[inx] = temp;
//     }
//   }
//   const sumOfInx = arr[inx].plus + arr[inx].minus;
//   if (sumOfInx < sumOfPivot) {
//     inx++;
//     const temp = arr[inx];
//     arr[inx] = arr[pivot];
//     arr[pivot] = temp;
//   }
//   return inx;
// };
//
// const quickSort = (arr: any[], lo: number, hi: number) => {
//   if (lo >= hi) {
//     return arr;
//   }
//   const pivot = step(arr, lo, hi);
//   quickSort(arr, lo, pivot - 1);
//   quickSort(arr, pivot + 1, hi);
// };

export const useConsStore = create((set) => ({
  cons: [],
  addCons: (theme: string) =>
    set((state: any) => {
      if (state.cons.some((item: any) => item.theme === theme)) {
        //notification
        return state;
      }
      return {
        cons: [
          ...state.cons,
          {
            theme: theme,
            plus: 0,
            minus: 0,
            votedStatus: false,
          },
        ],
      };
    }),
  voteForTheme: (number: number, theme?: string, votedStatus?: string) =>
    set((state: any) => {
      const index = Math.random() * state.cons.length;
      const newTheme = theme || state.cons[Math.round(index)]?.theme;
      const newState = state.cons.map((item: any) => {
        if (item.theme === newTheme) {
          if (item.votedStatus !== false && votedStatus) {
            if (votedStatus === item.votedStatus) {
              return item;
            } else {
              return {
                ...item,
                votedStatus: votedStatus,
                plus: votedStatus === "plus" ? item.plus + 1 : item.plus - 1,
                minus:
                  votedStatus === "minus" ? item.minus + 1 : item.minus - 1,
              };
            }
          }
          return {
            ...item,
            votedStatus: votedStatus ? votedStatus : item.votedStatus,
            plus: number === 1 ? item.plus + number : item.plus,
            minus: number === -1 ? item.minus - number : item.minus,
          };
        }
        return item;
      });
      return {
        cons: newState,
      };
    }),
  // sort: () =>
  //   set((state: any) => {
  //     const sortedArr = quickSort(state.cons, 0, state.cons.length - 1);
  //   }),
}));

export const useProsStore = create((set) => ({
  pros: [],
  addPros: (theme: string) =>
    set((state: any) => {
      if (state.pros.some((item: any) => item.theme === theme)) {
        //notification
        return state;
      }
      return {
        pros: [
          ...state.pros,
          {
            theme: theme,
            plus: 0,
            minus: 0,
            votedStatus: false,
          },
        ],
      };
    }),
  voteForTheme: (number: number, theme: string, votedStatus?: string) =>
    set((state: any) => {
      const index = Math.random() * state.pros.length;
      const newTheme = theme || state.pros[Math.round(index)]?.theme;
      const newState = state.pros.map((item: any) => {
        if (item.theme === newTheme) {
          if (item.votedStatus !== false && votedStatus) {
            if (votedStatus === item.votedStatus) {
              return item;
            } else {
              return {
                ...item,
                votedStatus: votedStatus,
                plus: votedStatus === "plus" ? item.plus + 1 : item.plus - 1,
                minus:
                  votedStatus === "minus" ? item.minus + 1 : item.minus - 1,
              };
            }
          }
          return {
            ...item,
            votedStatus: votedStatus ? votedStatus : item.votedStatus,
            plus: number === 1 ? item.plus + number : item.plus,
            minus: number === -1 ? item.minus - number : item.minus,
          };
        }
        return item;
      });
      return {
        pros: newState,
      };
    }),
  // sort: () =>
  //   set((state: any) => {
  //     quickSort(state.pros, 0, state.pros.length - 1);
  //   }),
}));
