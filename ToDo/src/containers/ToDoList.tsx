import * as React from 'react';

import ListItem from '../components/ListItem';

interface IToDoListState {
    active: number
    items: string[]
}

class ToDoList extends React.Component<{}, IToDoListState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            active: 2,
            items: ['Clean kitchen', 'Kiss your dog', 'Sell drugs to kids']
        }
    }

    public render() {
        const listItems = this.state.items.map((item, idx) => {
            const isActive: boolean = this.state.active === idx;

            return (<ListItem isActive={isActive} key={idx} label={item}/>);
        });

        return (
            <ul>{listItems}</ul>
        );
    }
}

export default ToDoList;












