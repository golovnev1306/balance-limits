import {connect} from "react-redux";
import {getComparedPaymentsData, getPaymentsComparedWithBills, getProblemsPayments} from "../../selectors";
import React, {FC, Fragment, useState} from "react";
import Payments from "../Payments";
import Switch from "@material-ui/core/Switch";
import {ComparedData, PaymentType, StateType} from "../../types";

type MapStatePropsType = {
    payments: PaymentType[]
    problemsPayments: PaymentType[]
    comparedPaymentsData: ComparedData[]
}

const AllPayments: FC<MapStatePropsType> = ({payments, problemsPayments, comparedPaymentsData}) => {

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
            <Payments comparedData={comparedPaymentsData} paymentsResult={isOnlyProblems ? problemsPayments : payments} title={'Оплата'} isCompareMode={isCompareMode}/>
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

export default connect<MapStatePropsType, {}, {}, StateType>(state => ({
    payments: getPaymentsComparedWithBills(state),
    problemsPayments: getProblemsPayments(state),
    comparedPaymentsData: getComparedPaymentsData(state)
}))(AllPayments)