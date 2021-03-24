import {connect} from "react-redux";
import {getDealsWithBalances} from "../../selectors";
import React from "react";
import Deals from "../Deals";
import Bills from "../Bills";

const AllDeals = ({deals}) => {

    return (
        <Deals dealsResult={deals} title={'Все договоры'}/>
    )
}

export default connect(state => ({deals: getDealsWithBalances(state)}))(AllDeals)