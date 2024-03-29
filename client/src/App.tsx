import React, {FC, Fragment, Suspense, useEffect} from 'react'
import {connect} from 'react-redux'
import './App.css'
import Header from './Header'
import {getBills, getDealsWithBalances, getIsInitialized, getLimitsWithBalances, getMessage} from './selectors'
import {initApp, setMessage, setSelectedBill, setSelectedDeal, setSelectedLimit} from './redux/app-reducer'
import {Route, Switch} from 'react-router-dom'
import Main from './components/pages/Main'
import FreeDeals from './components/pages/FreeDeals'
import AllDeals from './components/pages/AllDeals'
import AllBills from './components/pages/AllBills'
import Import from './components/pages/Import'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import AllPayments from './components/pages/AllPayments'
import Loading from './components/common/Loading'
import {BillType, DealType, LimitType, MessageType, StateType, TDispatch} from './types'

const ExportXls = React.lazy(() => import('./components/pages/ExportXls'))

type MapStateType = {
    isInitialized: boolean
    limits: LimitType[]
    deals: DealType[]
    bills: BillType[]
    message: MessageType
}

type MapDispatchType = {
    initApp: () => void
    setSelectedLimit: (selectedLimit: LimitType) => void,
    setSelectedDeal: (selectedDeal: DealType) => void
    setSelectedBill: (selectedBill: BillType) => void
    closeMessage: () => void
}

const App: FC<MapStateType & MapDispatchType> = ({initApp, isInitialized, message, closeMessage}) => {
    useEffect(() => {
        initApp()
    }, [])

    const handleCloseMessage = () => {
        closeMessage()
    }


    if (isInitialized) {
        return (
            <Fragment>
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
                                <Suspense fallback={<Loading/>}>
                                    <ExportXls/>
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
            </Fragment>)
    }

    return (<Fragment>
        {!!message.body
        ? (<div className={'alert alert-warning'}>{message.body}</div>)
        : (<Loading/>)}
        </Fragment>
    )
}

const mapStateToProps = (state: StateType) => {
    return {
        isInitialized: getIsInitialized(state),
        limits: getLimitsWithBalances(state),
        deals: getDealsWithBalances(state),
        bills: getBills(state),
        message: getMessage(state)
    }
}

const mapDispatchToProps = (dispatch: TDispatch) => {
    return {
        initApp: () => dispatch(initApp()),
        setSelectedLimit: (selectedLimit: LimitType) => dispatch(setSelectedLimit(selectedLimit)),
        setSelectedDeal: (selectedDeal: DealType) => dispatch(setSelectedDeal(selectedDeal)),
        setSelectedBill: (selectedBill: BillType) => dispatch(setSelectedBill(selectedBill)),
        closeMessage: () => dispatch(setMessage(''))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
