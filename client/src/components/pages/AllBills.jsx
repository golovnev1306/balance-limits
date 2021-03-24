import {connect} from "react-redux";
import {getBills, getDealsWithBalanceByBills} from "../../selectors";
import React from "react";
import Deals from "../Deals";
import Bills from "../Bills";

const AllDeals = ({bills}) => {

    return (
        <Bills billsResult={bills} title={'Все счета'}/>
    )
}

export default connect(state => ({bills: getBills(state)}))(AllDeals)