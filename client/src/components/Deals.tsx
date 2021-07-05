import {connect} from "react-redux"
import {getSelectedDeal} from "../selectors"
import React, {FC, Fragment, useEffect, useState} from "react"
import CommonTable from "./common/CommonTable"
import DealForm from "./common/forms/DealForm"
import {deleteDealThunk} from "../redux/deals-reducer"
import {setSelectedDeal} from "../redux/app-reducer"
import BillsByDeal from "./BillsByDeal"
import {DealType, Nullable, ShowModeType, StateType, TDispatch} from '../types'

type MapStatePropsType = {
    selectedDeal: Nullable<DealType>,
}

type MapDispatchPropsType = {
    deleteDeal: (dealId: number) => void
    setSelectedDeal: (selectedDeal: Nullable<DealType>) => void,
}

type OwnPropsType = {
    dealsResult: DealType[]
    title: string
    resetPage?: boolean
    setResetPage?: (isReset: boolean) => void
}

const Deals: FC<MapStatePropsType & MapDispatchPropsType & OwnPropsType> = ({deleteDeal, setSelectedDeal, selectedDeal, dealsResult, title, resetPage, setResetPage}) => {

    const handleDelete = () => {
        if (selectedDeal)
            deleteDeal(selectedDeal.id)
    }

    const [showMode, setShowMode] = useState<ShowModeType>('all')
    const [filteredDeals, setFilteredDeals] = useState<DealType[]>([])

    useEffect(() => {
        switch (showMode) {
            case 'all': setFilteredDeals(dealsResult)
                break
            case 'onlyBids': setFilteredDeals(dealsResult.filter(deal => deal.is_bid))
                break
            case 'onlyDeals': setFilteredDeals(dealsResult.filter(deal => !deal.is_bid))
                break
            case 'dealsWithEconomy': setFilteredDeals(dealsResult.filter(deal => Number.isFinite(deal.economy)))
                break
        }
    }, [dealsResult, showMode])

    return (
        <Fragment>
        <CommonTable resetPage={resetPage}
                     setResetPage={setResetPage}
                     ChildrenForm={DealForm}
                     setSelectedItem={setSelectedDeal}
                     selectedItem={selectedDeal}
                     data={filteredDeals}
                     tableName={'deals'}
                     ChildComponent={BillsByDeal}
                     title={title}
                     modalTitlePostfix={'договор'}
                     handleDelete={handleDelete}
                     showModeDeals={showMode}
                     setShowModeDeals={setShowMode}
                     instance={'deals'}
        />
        </Fragment>
    )
}

const mapStateToProps = (state: StateType): MapStatePropsType => ({
    selectedDeal: getSelectedDeal(state),
})
const mapDispatchToProps = (dispatch: TDispatch): MapDispatchPropsType => {
    return {
        deleteDeal: (dealId: number) => dispatch(deleteDealThunk(dealId)),
        setSelectedDeal: (selectedDeal: Nullable<DealType>) => dispatch(setSelectedDeal(selectedDeal)),
    }
}

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, StateType>(mapStateToProps, mapDispatchToProps)(Deals)