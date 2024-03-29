import TextField from '@material-ui/core/TextField'
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React, {FC} from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import {Checkbox} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import {DecoratedFormProps, InjectedFormProps, WrappedFieldProps} from 'redux-form'
import {AllItemsType, hasOwnProperty, LimitType} from '../../../types'
import {AutocompleteRenderInputParams} from '@material-ui/lab/Autocomplete/Autocomplete'

type OwnPropsType = {
    itemsForSelectField?: AllItemsType[]
    partners: any
    allowNullParent?: boolean
    type: 'select' | 'number' | 'autocomplete' | 'checkbox'
}

type AllPropsType = WrappedFieldProps & OwnPropsType

const MaterialField: FC<AllPropsType> = ({input, meta, itemsForSelectField, partners, allowNullParent, ...rest}) => {


    switch (rest.type) {
        case 'select':
            return (
                <FormControl {...rest} error={meta.touched && meta.invalid}>
                    <InputLabel>Привязка</InputLabel>
                    <Select style={{textAlign: 'left'}} {...input} {...rest}>
                        {allowNullParent && (<MenuItem value={-1}>Без привязки</MenuItem>)}
                        {itemsForSelectField && itemsForSelectField.map((item) => {
                            return hasOwnProperty(item, 'name') ?
                                (<MenuItem value={item.id} key={item.id}>
                                    {item.name}<br/>
                                    КВР: {item.kvr} | КОСГУ: {item.kosgu} | КВФО: {item.kvfo}<br/>
                                    Отр.код: {item.ok}
                                </MenuItem>)
                                : (<MenuItem value={item.id} key={item.id}>
                                    Номер: {item.number}<br/>
                                    Партнер: {item.partner}<br/>
                                    КВР: {item.kvr} | КОСГУ: {item.kosgu} | КВФО: {item.kvfo}<br/>
                                    Отр.код: {item.ok}
                                </MenuItem>)
                        })}
                    </Select>
                    {meta.touched && meta.invalid && <FormHelperText>{meta.error}</FormHelperText>}
                </FormControl>
            )
        case 'number':
            return (
                <TextField {...input} {...rest} error={meta.touched && meta.invalid}
                           helperText={meta.touched && meta.invalid ? meta.error : ''}/>
            )
        case 'autocomplete':
            return (
                <Autocomplete
                    inputValue={input.value || ''}
                    style={{width: '100%'}}
                    options={partners}
                    getOptionLabel={(option: string) => {
                        return option
                    }}
                    disableClearable={true}
                    onChange={(e, newValue) => {
                        input.onChange(newValue)
                    }}
                    getOptionSelected={(option, value) => {
                        return option === value
                    }}
                    freeSolo={true}
                    renderInput={(params) => {
                        return <TextField {...params} value={input.value} onChange={input.onChange} {...rest}
                                          error={meta.touched && meta.invalid}
                                          helperText={meta.touched && meta.invalid ? meta.error : ''}
                                          type={'text'}/>
                    }
                    }
                />

            )
        case 'checkbox':
            return (
                <FormControlLabel
                    control={<Checkbox {...input} />}
                    label="Является заявкой"
                />
            )
        default:
            return (
                <TextField {...input} {...rest} error={meta.touched && meta.invalid}
                           helperText={meta.touched && meta.invalid ? meta.error : ''}/>
            )
    }

}

export default MaterialField