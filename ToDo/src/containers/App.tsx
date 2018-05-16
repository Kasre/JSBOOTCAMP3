import * as React from 'react';

import ToDoList from './ToDoList';

interface IAppState {
    name: string
}

class App extends React.Component<{}, IAppState> {
    constructor(props: {}) {
        super(props);

        this.state = {
            name: 'Shai'
        }
    }

    public render() {
        return (
            <div>
                <div id="header">
                    <span>User name: </span>{this.state.name}
                </div>
                <br />

                <ToDoList/>
            </div>
        );
    }
}

export default App;