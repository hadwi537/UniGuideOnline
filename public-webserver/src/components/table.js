import React, { Component }  from 'react';
import axios from 'axios';

// table header
const TableHeader = () => {
    return (
        <thread>
            <tr>
                <th> Paper Code </th>
                <th>Paper Title</th>
                <th> Year </th>
                <th> Prerequistes </th>
            </tr>
        </thread>
    )
}

const TableBody = (props) => {
    const rows = props.paperData.map((paper) => {
        return (
            <tr key = {paper.paper_code}>
            <td> {paper.paper_code} </td>
            <td>{paper.title}</td>
            <td>{paper.year}</td>
            <td>{paper.prereq_list.map(paper_code => (
                <td> {paper_code} </td>
            ))}</td>
            </tr>
        )
    })
    return <tbody>{rows}</tbody>
}

export default class Table extends React.Component {
    state = {
        reply: []
    }
    componentDidMount() {
        axios.get('https://ijo4298cse.execute-api.us-east-1.amazonaws.com/papers').then(res => {
            const reply = res.data;
            console.log(reply);
            this.setState({reply});
        });
    }
    render() {
        return (
            <table style={{border: '1px solid black', margin_left: 'auto', margin_right: 'auto'}}>
                <TableHeader />
                <TableBody paperData = {this.state.reply} />
            </table>
        )
    }
}