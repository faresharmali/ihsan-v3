const Reports = [];

export default ReportsReducer = (state = Reports, action) => {
  switch (action.type) {
    
    case "updateReportsList":
      return [...action.data];
 
    default:
      return state;
  }
};
