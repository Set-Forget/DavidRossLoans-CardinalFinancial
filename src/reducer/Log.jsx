export const logsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGS":
      return {
        ...state,
        logsData: action.payload,
      };
    case "SET_SELECTED_ROW": {
      const groupDataByScenario = action.payload.reduce((acc, item) => {
        const scenarioIndex = item.scenarioIndex;
        if (!acc[scenarioIndex]) {
          acc[scenarioIndex] = [];
        }
        acc[scenarioIndex].push(item);
        return acc;
      }, {});
    
      return {
        ...state,
        selectedRow: groupDataByScenario,
      };
    };
    case "SHOW_MODAL":
      return {
        ...state,
        showModal: action.payload,
      };
    default:
      return state;
  }
};
