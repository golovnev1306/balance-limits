import React from 'react'
import ReactDOM from 'react-dom'
import store from './redux/store'
import {Provider} from 'react-redux'
import './index.css'
import App from './App'
import 'fontsource-roboto'
import {BrowserRouter} from 'react-router-dom'
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles'
import {ruRU} from '@material-ui/core/locale'

const theme = createMuiTheme(
    {},
    ruRU,
)

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
