export const AllActions = {
  waitingForOrder: {
    target: "waitingForOrder",
    id: "waitingForOrder",
  },
  waitingForOpponent: {
    target: "waitingForOpponent",
    id: "waitingForOpponent",
  },
  wait: {
    action: -1,
    priority: -1,
    type: "basic",
    target: "none",
    affect: "player",
    id: "wait",
  },
  attack: {
    action: 0,
    priority: 0,
    type: "basic",
    target: "simple",
    affect: "enemy",
    id: "attack",
  },
  run: {
    action: 1,
    priority: 1,
    type: "basic",
    target: "none",
    affect: "player",
    id: "run",
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
