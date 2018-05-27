import React, { Component } from "react";
import io from "socket.io-client";

import CopyToClipboard from "react-copy-to-clipboard";
// import {clipboard} = require('electron');

var socket = io("http://localhost:3001");

var subscribeComponent = comp => {
  socket.on("connect", function() {
    console.log("connect");
  });

  socket.on("codeList", function(data) {
    console.log("socket codeList: " + JSON.stringify(data));
    comp.setState({
      items: data
    });
  });

  socket.on("disconnect", function() {
    console.log("socket disconnect");
  });
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicks: 0,
      items: []
    };
    console.log(process.env.NODE_ENV);
  }

  componentDidMount() {
    subscribeComponent(this);
  }

  refresh() {
    socket.emit("refresh", "yami");
  }

  render() {
    return (
      <div>
        <table className="table table-striped table-dark">
          <thead>
            <th>
              <button className="btn btn-success" onClick={this.refresh}>
                refresh
              </button>
            </th>
            <th>&nbsp;</th>
          </thead>
          <tbody>
            {this.state.items.map(item => (
              <tr key={item.code}>
                <td>
                  <CopyToClipboard text={item.code}>
                      <span>{item.code}</span>
                  </CopyToClipboard>
                </td>
                <td>
                  <CopyToClipboard text={item.code}>
                    <span>{item.date}</span>
                  </CopyToClipboard>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
