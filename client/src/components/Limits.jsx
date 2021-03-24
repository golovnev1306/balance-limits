import CommonTable from "./common/CommonTable"
import LimitForm from "./common/forms/LimitForm"
import React, {useCallback, useMemo, useState} from "react"
import {
    getLimitsWithBalances,
    getSelectedLimit
} from "../selectors"
import {setSelectedBill, setSelectedDeal, setSelectedLimit} from "../redux/app-reducer"
import {setDealsThunk} from "../redux/deals-reducer"
import {deleteLimitThunk} from "../redux/limits-reducer"
import {connect} from "react-redux"
import DealsByLimit from "./DealsByLimit";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PaymentsByLimit from "./PaymentsByLimit";


const Limits = ({limitsResult, deleteLimit, selectedLimit, setSelectedLimit}) => {

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

    const handleChangeTab = (event, newValue) => {
        setSelectedTab(newValue)
    }

    const handleDelete = () => {
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

const mapStateToProps = (state) => {
    return {
        selectedLimit: getSelectedLimit(state),
        limitsResult: getLimitsWithBalances(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setDials: () => dispatch(setDealsThunk()),
        deleteLimit: limitId => dispatch(deleteLimitThunk(limitId)),
        setSelectedLimit: selectedLimit => dispatch(setSelectedLimit(selectedLimit)),
        setSelectedDeal: selectedDeal => dispatch(setSelectedDeal(selectedDeal)),
        setSelectedBill: selectedBill => dispatch(setSelectedBill(selectedBill))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Limits)
