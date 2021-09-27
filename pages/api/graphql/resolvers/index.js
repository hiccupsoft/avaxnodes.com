import node from "./node";
import nodes from "./nodes";
import stats from "./stats";
import notifierStats from "./notifierStats";
import transactions from "./transactions";

export const resolvers = {
  Query: {
    stats: stats,
    nodes: nodes,
    node: node,
    notifierStats: notifierStats,
    transactions:transactions,
  }
};
