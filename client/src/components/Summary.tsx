import React, {CSSProperties, FC} from "react"
import {formatNumber} from "../helpers"
import Tooltip from "@material-ui/core/Tooltip"
import {SumsType} from "../types"

type PropsType = {
    sums: SumsType
    isActual: boolean
}

const Summary: FC<PropsType> = ({sums, isActual}) => {
    let style: CSSProperties = Object.assign({
        textAlign: 'right' as const,
        padding: '5px', borderRadius: '3px'
    }, isActual ? {'backgroundColor': '#efefff'} : {'backgroundColor': '#ffd0dd'})
    let title = isActual ? 'Итого' : 'Итоги посчитаны для всех данных, невзирая на фильтр, пожалуйста, обновите фильтр'
    return (
        <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '5px', color: '#333'}}>
            <Tooltip title={title}>
            <div style={style}>
                {Number.isFinite(sums.sum) ? <div className={'summary__item-wrap'}><span className={'summary__item'}>Сумма:</span><span>{` ${formatNumber(sums.sum)}`}</span></div> : ''}
                {Number.isFinite(sums.balanceByDeals) ? <div className={'summary__item-wrap'}><span className={'summary__item'}>Остаток:</span><span>{` ${formatNumber(sums.balanceByDeals)}`}</span></div> : ''}
                {Number.isFinite(sums.balanceByDealsWithBids) ? <div className={'summary__item-wrap'}><span className={'summary__item'}>С учетом заявок:</span><span>{` ${formatNumber(sums.balanceByDealsWithBids)}`}</span></div> : ''}
                {Number.isFinite(sums.balanceByPayments) ? <div className={'summary__item-wrap'}><span className={'summary__item'}>Остаток по оплате:</span><span>{` ${formatNumber(sums.balanceByPayments)}`}</span></div> : ''}
            </div>
            </Tooltip>
        </div>
    )
}

export default Summary