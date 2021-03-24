import {connect} from "react-redux";
import {getBills, getDealsWithBalanceByBills, getPayments} from "../../selectors";
import React from "react";
import Deals from "../Deals";
import Bills from "../Bills";
import Payments from "../Payments";

const AllPayments = ({payments}) => {

    return (
        <Payments paymentsResult={payments} title={'Оплата'}/>
    )
}

export default connect(state => ({payments: getPayments(state)}))(AllPayments)