const logger = (store:any) => (next:any) => (action:any) => {
    //console.log(JSON.stringify(action, null, 2));
    const newState = next(action);
    //console.log("now", store.getState());
    return newState;
};

export default logger;