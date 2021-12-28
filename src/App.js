import React, { Component } from 'react'
import "./App.scss"

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copy: false,
      invalid:"",
      status: false,
      data: '',
      api_data: [],
      msg: "",
      btnTxt: "Submit"
    }
    // this.press = this.press.bind(this);

  }
  //time variable
  show;

  //fetching 

  ShortMe = (p) => {
    p.preventDefault();
    this.setState({ disable: true })
    if (this.state.data.length === 0) {
      alert("enter url");
    }
    else {
      this.setState({ btnTxt: "Fetching..." })
      fetch(`https://api.shrtco.de/v2/shorten?url=${this.state.data}`)
        .then(res => res.json())
        .then((resp) => {
          if (!resp.ok) { throw Error(resp.error), this.setState({invalid:resp.error,btnTxt:"Submit"}) }
          else{
            this.setState({
              api_data: resp.result,
              status: true,
            })
          }
        })
        .catch(e => {
          this.setState({ data: '', status: false })
          console.log(e);
        })
    }
  }
  //read user input

  userInput = (e) => {
    this.setState({
      data: e.target.value,
      status: false,
      copy: false,
      btnTxt: "Submit",
      invalid:"",
    })
  }

  // copy to clipboard 

  copyMe = () => {
    navigator.clipboard.writeText(this.state.api_data.short_link)
    this.setState({
      copy: true
    })
    this.setState({ msg: "copied!" })
    this.show = setTimeout(() => {
      this.setState({ msg: ""})
    }, 2000);
  }

  render() {
    const { status } = this.state;
    const { api_data } = this.state;
    return (

      <div className="main" >
        <div className="txt">
          <span className="spanOne">S</span>
          <span className="spanTwo">horten/<span className="spanThree">url</span></span>
        </div>
        <form onSubmit={this.ShortMe}>
          {!status ?
            (<>
              <input type="input" className="input" value={this.state.data} placeholder="example.xyz" onChange={this.userInput} />
              <input type="submit" className={this.state.btnTxt === "Fetching..." ? "btn-f" : "btn"} onClick={this.ShortMe} value={this.state.btnTxt} />
            </>)
            :
            (<>
              <input type="input" className="input" value={api_data.short_link} onChange={this.userInput} />
              <input type="submit" className="btn" onClick={this.copyMe} value="Copy URL" />
            </>)
          }
        </form>
        <br />
        <span className="copied">{this.state.msg}</span>
        {!this.state.invalid=="" ? (
        <span className="error"> <span className="q1">" </span>{this.state.invalid}<span className="q2"> "</span></span>) : (<></>)}
        {/* <span>{api_data.short_link}</span> */}
      </div>

    )
  }
}