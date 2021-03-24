import {connect} from "react-redux"
import {getFreeDeals} from "../../selectors"
import React from "react"
import Deals from "../Deals"

const FreeDeals = ({deals}) => {

    return (
        <Deals dealsResult={deals} title={'Свободные договоры'}/>
    )
}

export default connect(state => ({deals: getFreeDeals(state)}))(FreeDeals)