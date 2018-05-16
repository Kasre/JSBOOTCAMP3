import * as React from 'react';

interface IListItem {
    label: string
    isActive?: boolean
}

const ListItem = (props: IListItem) => {
    const style = {
        color: props.isActive ? 'blue' : 'black'
    };

    return (<li style={style}>{props.label}</li>);
};

export default ListItem;