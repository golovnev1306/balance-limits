import CommonTable from "./common/CommonTable"
import LimitForm from "./common/forms/LimitForm"
import React, {FC, useCallback, useMemo, useState} from "react"
import {
    getLimitsWithBalances,
    getSelectedLimit
} from "../selectors"
import {setSelectedBill, setSelectedDeal, setSelectedLimit} from "../redux/app-reducer"
import {setDealsThunk} from "../redux/deals-reducer"
import {deleteLimitThunk} from "../redux/limits-reducer"
import {connect} from "react-redux"
import DealsByLimit from "./DealsByLimit"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import PaymentsByLimit from "./PaymentsByLimit"
import {BillType, DealType, LimitType, Nullable, StateType, TDispatch} from "../types";

type MapStatePropsType = {
    selectedLimit: Nullable<LimitType>
    limitsResult: LimitType[]
}

type MapDispatchPropsType = {
    setDials: () => void
    deleteLimit: (limitId: number) => void
    setSelectedLimit: (selectedLimit: Nullable<LimitType>) => void
    setSelectedDeal: (selectedDeal: Nullable<DealType>) => void
    setSelectedBill: (selectedBill: Nullable<BillType>) => void
}


const Limits: FC<MapStatePropsType & MapDispatchPropsType> = ({limitsResult, deleteLimit, selectedLimit, setSelectedLimit}) => {

    const [selectedTab, setSelectedTab] = useState(0)

    const TabPanel = useCallback(({ children, value, index, ...other }) => {

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                {...other}
            >
                {value === index && (
                    children
                )}
            </div>
        );
    }, [limitsResult])

    const handleChangeTab = (event: any, newValue: any) => {
        console.log('event', event)
        setSelectedTab(newValue)
    }

    const handleDelete = () => {
        if (selectedLimit)
        deleteLimit(selectedLimit.id)
    }

    return (
        <>
            <Tabs
                centered={true}
                onChange={handleChangeTab}
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                aria-label="disabled tabs example"
            >
                <Tab label="Лимиты-договора-счета"/>
                <Tab label="Лимиты-оплата"/>
            </Tabs>
            <TabPanel value={selectedTab} index={0}>

            </TabPanel>

            {/*@ts-ignore*/}
            <CommonTable ChildrenForm={LimitForm}
                         title={'Лимиты'}
                         ChildComponent={selectedTab === 0 ? DealsByLimit : PaymentsByLimit}
                         tableName={'limits'}
                         data={limitsResult}
                         selectedItem={selectedLimit}
                         setSelectedItem={setSelectedLimit}
                         modalTitlePostfix={'лимит'}
                         handleDelete={handleDelete}
            />
                </>)
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        selectedLimit: getSelectedLimit(state),
        limitsResult: getLimitsWithBalances(state)
    }
}

const mapDispatchToProps = (dispatch: TDispatch): MapDispatchPropsType => {
    return {
        setDials: () => dispatch(setDealsThunk()),
        deleteLimit: limitId => dispatch(deleteLimitThunk(limitId)),
        setSelectedLimit: selectedLimit => dispatch(setSelectedLimit(selectedLimit)),
        setSelectedDeal: selectedDeal => dispatch(setSelectedDeal(selectedDeal)),
        setSelectedBill: selectedBill => dispatch(setSelectedBill(selectedBill))
    }
}


export default connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps, mapDispatchToProps)(Limits)
