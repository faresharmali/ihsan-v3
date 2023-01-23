const Famillies = [];

const AddChild = (state, action) => {
  state.forEach((family) => {
    if (family.id == action.data.id) {
      family.children=[...family?.children,action.data]
    }
  });
  return state;
};
const DeleteChild = (state, action) => {
  state.forEach((family) => {
    if (family._id == action.data.family) {
      console.log("faaaa",family);
      family.children=family?.children.filter(child=>child.identifier!=action.data.identifier)
    }
  });
  return state;
};
export default FamilyReducer = (state = Famillies, action) => {
  switch (action.type) {
    case "showFamilies":
      return state;
    case "updateFamiliesList":
      return [...action.data];
    case "AddFamily":
      return [...state, action.data];
    case "AddChild":
      return AddChild(state, action);
    case "deleteChild":
      return DeleteChild(state, action)
    default:
      return state;
  }
};
