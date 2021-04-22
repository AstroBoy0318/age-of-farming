import { getAllLotteries, getIssueIndex, getRates, LotteryHistory } from "./lotteryUtils";
import { ceilDecimal } from "./mathUtils";

export const lotteryHistory = async () => {
  const issueIndex = await getIssueIndex();
  if (typeof issueIndex !== "number") {
    throw new Error("IssueIndex not a number");
  }
  const allLotteries = await getAllLotteries(issueIndex - 1);
  const history: Array<any> = allLotteries.map(
    (x): any => {
      return {
        lotteryNumber: x.issueIndex,
        poolSize: ceilDecimal(x.numbers2[0], 2),
        burned: ceilDecimal((x.numbers2[0] / 100) * getRates(x.issueIndex).burn, 2),
      };
    }
  );
  return history;
};

const a = 1000;

export default a;
