import React, {
    Component
} from 'react';

import Moment from 'moment';
import data from '../../data';

class Page extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.id
        };
    }

    getStatus(n) {
        switch (n) {
            case 0:
                return 'New';
            case 1:
                return 'In Progress';
            case 2:
                return 'Closed';
            default:
                throw new Error('Invalid status Code.')
        }

    }

    getPriority(n) {
        switch (n) {
            case 0:
                return 'Low';
            case 1:
                return 'Medium';
            case 2:
                return 'High';
            default:
                throw new Error('Invalid priority Code.')
        }
    }

    getColor(n) {
        switch (n) {
            case 0:
                return 'green';
            case 1:
                return 'yellow';
            case 2:
                return 'red';
            default:
                throw new Error('Invalid Code.')
        }
    }


    render() {
        let issue = data[this.state.id];

        let comments = issue.comments.map((comment,index) => {
            return (
                <div className="ui segment" key={index}>
                    <strong>{comment.user + ': '}</strong>
                        {comment.message}
                </div>
            )
        });
        return (
            <div>
                <h1 className="ui centered header">
                    {'Issue #' + this.state.id}
                </h1>
                <div className="subHeader">
                    <em>{'Created at '}</em>
                    <strong>{Moment(issue.createdAt).format('DD/MM/YYYY')}</strong>
                    <em>{ ' by ' }</em>
                    <strong>{ issue.owner}</strong>
                </div>
                <div className="ui horizontal segments">
                    <div className={ 'ui centered aligned ' + this.getColor(issue.status) + ' inverted segment'}>
                        <strong>{ 'Status:' } </strong>
                        {this.getStatus(issue.status)}
                    </div>
                    <div className={ 'ui centered aligned ' + this.getColor(issue.priority) + ' inverted segment'}>
                        <strong>{ 'Priority:' } </strong>
                        {this.getPriority(issue.priority)}
                    </div>
                </div>
                <div className="ui center aligned segment">
                    <strong>{'Description: '}</strong>
                    {issue.description}
                </div>
                <h2>Discussion</h2>
                <div className="ui segments">
                    {comments}
                </div>

            </div>
        )
    }

}

export default Page;