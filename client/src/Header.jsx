import {NavLink} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import {clearAllSelected} from "./redux/app-reducer";
import {connect} from "react-redux";


const Header = ({clearAllSelected}) => {

    const clickHandler = () => {
        clearAllSelected()
    }

    return (
        <div className={'header'}>
            <div className='l-container'>
                <NavLink exact onClick={clickHandler} to={'/'} className={'menu-link'}
                         activeClassName={'active-menu-link'}>
                    <MenuItem className={'header-menu-item'}>Главная</MenuItem>
                </NavLink>
                <NavLink onClick={clickHandler} to={'/free-deals'} className={'menu-link'}
                         activeClassName={'active-menu-link'}>
                    <MenuItem className={'header-menu-item'}>
                        Свободные договора
                    </MenuItem></NavLink>
                <NavLink onClick={clickHandler} to={'/all-deals'} className={'menu-link'}
                         activeClassName={'active-menu-link'}>
                    <MenuItem className={'header-menu-item'}>
                        Все договора
                    </MenuItem>
                </NavLink>
                <NavLink onClick={clickHandler} to={'/all-bills'} className={'menu-link'}
                         activeClassName={'active-menu-link'}>
                    <MenuItem className={'header-menu-item'}>
                        Все счета
                    </MenuItem>
                </NavLink>
                <NavLink to={'/all-payments'} className={'menu-link'}
                         activeClassName={'active-menu-link'}>
                    <MenuItem className={'header-menu-item'}>
                        Оплата
                    </MenuItem>
                </NavLink>
                <NavLink to={'/export'} className={'menu-link'}
                         activeClassName={'active-menu-link'}>
                    <MenuItem className={'header-menu-item'}>
                        Экспорт
                    </MenuItem>
                </NavLink>
                <NavLink to={'/import'} className={'menu-link'}
                         activeClassName={'active-menu-link'}>
                    <MenuItem className={'header-menu-item'}>
                        Импорт
                    </MenuItem>
                </NavLink>
            </div>
        </div>
    )
}

export default connect(null, dispatch => ({clearAllSelected: () => dispatch(clearAllSelected())}))(Header)