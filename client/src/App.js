import React, {Suspense, useEffect} from 'react'
import {connect} from 'react-redux'
import './App.css'
import Header from "./Header"
import {getBills, getDealsWithBalances, getIsInitialized, getLimitsWithBalances, getMessage} from './selectors'
import {initApp, setMessage, setSelectedBill, setSelectedDeal, setSelectedLimit} from "./redux/app-reducer"
import {Switch, Route} from "react-router-dom"
import Main from "./components/pages/Main"
import FreeDeals from "./components/pages/FreeDeals"
import AllDeals from "./components/pages/AllDeals"
import AllBills from "./components/pages/AllBills"
import Import from "./components/pages/Import";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import AllPayments from "./components/pages/AllPayments";
import Loading from "./components/common/Loading";

const ExportCss = React.lazy(() => import('./components/pages/ExportCss'))

const App = ({initApp, isInitialized, limits, deals, bills, message, closeMessage}) => {
    useEffect(() => {
        initApp()
    }, [])

    const handleCloseMessage = () => {
        closeMessage()
    }


    if (isInitialized) {
        return (
            <>
                <Header/>
                <div className='l-container'>
                    <div className="l-content">
                        <Switch>
                            <Route exact path="/free-deals">
                                <FreeDeals/>
                            </Route>
                            <Route exact path="/all-deals">
                                <AllDeals/>
                            </Route>
                            <Route exact path="/all-bills">
                                <AllBills/>
                            </Route>
                            <Route exact path="/all-payments">
                                <AllPayments/>
                            </Route>
                            <Route exact path="/export">
                                <Suspense fallback={<Loading />}>
                                    <ExportCss/>
                                </Suspense>
                            </Route>
                            <Route exact path="/import">
                                <Import/>
                            </Route>
                            <Route exact path="/">
                                <Main/>
                            </Route>
                            <Route>
                                Страница не найдена (404)
                            </Route>
                        </Switch>
                    </div>
                </div>
                <Snackbar open={!!message.body} autoHideDuration={3000} onClose={handleCloseMessage}>
                    <Alert onClose={handleCloseMessage} severity={message.type}>
                        {message.body}
                    </Alert>
                </Snackbar>
            </>)
    }
    return (
        <Loading />
    )

}

const mapStateToProps = (state) => {
    return {
        isInitialized: getIsInitialized(state),
        limits: getLimitsWithBalances(state),
        deals: getDealsWithBalances(state),
        bills: getBills(state),
        message: getMessage(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initApp: () => dispatch(initApp()),
        setSelectedLimit: selectedLimit => dispatch(setSelectedLimit(selectedLimit)),
        setSelectedDeal: selectedDeal => dispatch(setSelectedDeal(selectedDeal)),
        setSelectedBill: selectedBill => dispatch(setSelectedBill(selectedBill)),
        closeMessage: () => dispatch(setMessage(''))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
