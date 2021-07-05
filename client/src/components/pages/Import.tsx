import React, {FC, Fragment, useCallback, useState} from 'react'
import ImportPaymentsForm from '../common/forms/ImportPaymentsForm'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import {TabPanel} from '@material-ui/lab'
import ImportEconomyOfDealsForm from '../common/forms/ImportEconomyOfDealsForm'

const Import: FC = () => {
    const [selectedTab, setSelectedTab] = useState(1)

    const TabPanel = useCallback(({children, value, index, ...other}) => {

        return (
            <div
                role='tabpanel'
                hidden={value !== index}
                {...other}
            >
                {value === index && (
                    children
                )}
            </div>
        )
    }, [])

    const handleChangeTab = (event: any, newValue: any) => {
        setSelectedTab(newValue)
    }

    return (
        <Fragment>
            <Tabs
                centered={true}
                onChange={handleChangeTab}
                value={selectedTab}
                indicatorColor='primary'
                textColor='primary'
            >
                <Tab label='Импорт таблицы с оплатой'/>
                <Tab label='Импорт таблицы с экономией по договорам'/>
            </Tabs>
            <TabPanel value={selectedTab} index={0}>
                <ImportPaymentsForm/>
            </TabPanel>

            <TabPanel value={selectedTab} index={1}>
                <ImportEconomyOfDealsForm/>
            </TabPanel>

        </Fragment>
    )
}

export default Import