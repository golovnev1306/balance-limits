import {connect} from "react-redux";
import {
    getBills,
    getDealsWithBalanceByBills,
    getPayments,
    getPaymentsComparedWithBills,
    getProblemsPayments
} from "../../selectors";
import React, {Fragment, useState} from "react";
import Deals from "../Deals";
import Bills from "../Bills";
import Payments from "../Payments";
import Switch from "@material-ui/core/Switch";

const AllPayments = ({payments, promlemsPayments}) => {

    const [isCompareMode, setIsCompareMode] = useState(false)
    const onChangeHandler = () => {
        setIsCompareMode(!isCompareMode)
        setIsOnlyProblems(false)
    }

    const [isOnlyProblems, setIsOnlyProblems] = useState(false)
    const onChangeHandlerIsOnlyProblems = () => {
        setIsOnlyProblems(!isOnlyProblems)
    }

    return (
        <Fragment>
            <Payments paymentsResult={isOnlyProblems ? promlemsPayments : payments} title={'Оплата'} isCompareMode={isCompareMode}/>
            <Switch
                color="primary"
                checked={isCompareMode}
                onChange={onChangeHandler}
            /> Режим сравнения со счетами
            {isCompareMode && (
                <Fragment>
                    <Switch
                        color="primary"
                        checked={isOnlyProblems}
                        onChange={onChangeHandlerIsOnlyProblems}
                    /> Показать только проблемные
                </Fragment>
            )}
        </Fragment>
    )
}

export default connect(state => ({
    payments: getPaymentsComparedWithBills(state),
    promlemsPayments: getProblemsPayments(state)
}))(AllPayments)