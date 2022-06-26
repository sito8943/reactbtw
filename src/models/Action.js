export const AllActions = {
  wait: { action: -1, priority: -1 },
  attack: { action: 0, priority: 0 },
  run: { action: 1, priority: 1 },
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
