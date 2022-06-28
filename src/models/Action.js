export const AllActions = {
  awaitingOrders: {
    target: "waitingForOrder",
  },
  opponentThinking: {
    target: "waitingForOpponent",
  },
  wait: {
    action: -1,
    priority: -1,
    type: "basic",
    target: "none",
    affect: "player",
  },
  attack: {
    action: 0,
    priority: 0,
    type: "basic",
    target: "simple",
    affect: "enemy",
  },
  run: {
    action: 1,
    priority: 1,
    type: "basic",
    target: "none",
    affect: "player",
  },
};

const SimpleTargetActions = ["attack"];

const NoTargetActions = ["wait", "run"];

const TargetTypes = {
  SimpleTarget: "SimpleTarget",
  MultiTarget: "MultiTarget",
  NoTarget: "NoTarget",
};

export const GetActionTargetType = (name) => {
  if (SimpleTargetActions.indexOf(name) > -1) return TargetTypes.SimpleTarget;
  if (NoTargetActions.indexOf(name) > -1) return TargetTypes.NoTarget;
};
