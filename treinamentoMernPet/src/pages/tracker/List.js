import React, {
    Component
} from 'react';

import Item from './Item'
import data from '../../data';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: data
        }
    }

    render() {
        let postList = this.state.issues.map(issue => {
            return (
                <Item
                    key={issue._id}
                    id={issue._id}
                    status={issue.status}
                    priority={issue.priority}
                    createdAt={issue.createdAt}
                    owner={issue.owner}
                    description={issue.description}/>
            )
        });
        return (
            <div className="ui form">
                <table className="ui single line celled table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Created At</th>
                        <th>Owner</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default List;