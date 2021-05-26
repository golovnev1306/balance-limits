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
                {sums.sum ? <div>{`Сумма: ${formatNumber(sums.sum)}`}</div> : ''}
                {sums.balance ? <div>{`Остаток: ${formatNumber(sums.balance)}`}</div> : ''}
                {sums.balanceByPayments ? <div>{`Остаток по оплате: ${formatNumber(sums.balanceByPayments)}`}</div> : ''}
            </div>
            </Tooltip>
        </div>
    )
}

export default Summary