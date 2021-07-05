import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import WarningIcon from '@material-ui/icons/Warning'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import React, {FC} from 'react'
import List from '@material-ui/core/List'

type OwnPropsType = {
    options: JSX.Element[]
}

const WarningOptions: FC<OwnPropsType> = ({options}) => {
    return (
        <List dense={true}>
            {
                options.map((option, index) => <WarningOptionsItem key={index}>{option}</WarningOptionsItem>)
            }
        </List>
    )
}

const WarningOptionsItem: FC = ({children}) => {
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <WarningIcon/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText>
                <Typography color={'primary'}>
                    {children}
                </Typography>
            </ListItemText>
        </ListItem>
    )
}

export default WarningOptions