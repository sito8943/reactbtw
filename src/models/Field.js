export const FieldType = {
  plains: 0,
};

export const EventsTypeEnum = {
  World: "world",
};

export const CreationField = {
  plains: {
    effects: [],
  },
};

export default class Field {
  constructor(options = { name: "", type: "", effects: [] }) {
    const { name, type, effects } = options;
  }
}