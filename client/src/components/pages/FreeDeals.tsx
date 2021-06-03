import {connect} from "react-redux"
import {getFreeDeals} from "../../selectors"
import React, {FC} from "react"
import Deals from "../Deals"
import {DealType, StateType} from "../../types"

type MapStatePropsType = {
    deals: DealType[]
}

const FreeDeals: FC<MapStatePropsType> = ({deals}) => {

    return (
        <Deals dealsResult={deals} title={'Свободные договоры'}/>
    )
}

export default connect<MapStatePropsType, {}, {}, StateType>(state => ({deals: getFreeDeals(state)}))(FreeDeals)