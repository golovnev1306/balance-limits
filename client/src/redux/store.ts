import {combineReducers, createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import appReducer from "./app-reducer"
import limitsReducer from "./limits-reducer"
import dealsReducer from "./deals-reducer"
import billsReducer from "./bills-reducer"
import {reducer as formReducer} from "redux-form"
import partnersReducer from "./partners-reducer"
import paymentsReducer from "./payments-reducer"

export const rootReducer = combineReducers({
    app: appReducer,
    limits: limitsReducer,
    deals: dealsReducer,
    bills: billsReducer,
    payments: paymentsReducer,
    partners: partnersReducer,
    form: formReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store