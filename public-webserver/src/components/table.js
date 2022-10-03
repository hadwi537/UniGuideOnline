import React, { Component }  from 'react';
import axios from 'axios';

// table header
const TableHeader = () => {
    return (
            <tr>
                <th>Paper Code </th>
                <th>Paper Title</th>
                <th> Year </th>
                <th> Prerequistes </th>
            </tr>
    )
}

const TableBody = (props) => {
    const rows = props.paperData.map((paper) => {
        console.log(paper.paper_code)
        return (
            <tr key = {paper.paper_code}>
            <td>{paper.paper_code}</td>
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
            const reply = res.data.Items;
            console.log(reply);
            this.setState({reply});
        });
    }
    render() {
        return (
            <table style={{border: '1px solid black', margin: 'auto'}}>
                <TableHeader />
                <TableBody paperData = {this.state.reply} />
            </table>
        )
    }
}