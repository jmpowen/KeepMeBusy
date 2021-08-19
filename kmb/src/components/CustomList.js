import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import SchoolIcon from '@material-ui/icons/School';
import SportsFootballIcon from '@material-ui/icons/SportsFootball';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import AlarmIcon from '@material-ui/icons/Alarm';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {

    }
});

export default function CustomList({ list, handleClick, itemID = '', itemPrimaryText = '', itemSecondaryText = '' }) {
    return (
        <>
            <List>
                {list && (
                    list.map(item => (
                        <ListItem button divider onClick={() => handleClick(item)} key={item[itemID]}>
                            <ListItemText 
                                primary={item[itemPrimaryText]}
                                secondary={item[itemSecondaryText]}
                            />
                        </ListItem>
                    ))
                )}
            </List>
        </>
    )
}