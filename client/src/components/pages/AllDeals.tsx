import {connect} from "react-redux"
import {getDealsWithBalances} from "../../selectors"
import React, {FC} from "react"
import Deals from "../Deals"
import {DealType, StateType} from "../../types"

type MapStatePropsType = {
    deals: DealType[]
}

const AllDeals: FC<MapStatePropsType> = ({deals}) => {
    return (
        <Deals dealsResult={deals} title={'Все договоры'}/>
    )
}

export default connect<MapStatePropsType, {}, {}, StateType>(state => ({deals: getDealsWithBalances(state)}))(AllDeals)