import React, {
    Component
}

    from 'react';
import{
    Link
}

    from 'react-router';
import Moment from 'moment';

class Item extends Component {
    getStatus(n) {
        switch(n){
            case 0:
                return "New";
            case 1:
                return "In Progress";
            case 2:
                return "Closed";
            default:
                throw new Error("Invalid status code. ");
        }
    }
    getPriority(n) {
        switch(n){
            case 0:
                return "Low";
            case 1:
                return "Medium";
            case 2:
                return "High";
            default:
                throw new Error("Invalid priority code. ");
        }
    }
    getColor(n) {
        switch(n){
            case 0:
                return "positive";
            case 1:
                return "warning";
            case 2:
                return "negative";
            default:
                throw new Error("Invalid color code. ");
        }
    }

    render() {
        return (
            <tr>
                <td>
                    <Link to={'/issue/' + this.props.id}>
                        {this.props.id}
                    </Link>
                </td>
                <td className={this.getColor(this.props.status)}>
                    {this.getStatus(this.props.status)}
                </td>
                <td className={this.getColor(this.props.priority)}>
                    {this.getPriority(this.props.priority)}
                </td>
                <td> {Moment(this.props.createdAt).format('L')} </td>
                <td> {this.props.owner} </td>
                <td> {this.props.description} </td>
            </tr>
        )
    }
}

export default Item;