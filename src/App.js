import React, {Component} from 'react';
import copy from 'copy-to-clipboard';
import Favicon from 'react-favicon';
import SuperSecretSettings from './sss';

class App extends Component {

    constructor() {
        super();
        this.sss = new SuperSecretSettings({ masterPassword: '' });
        this.state = {
            hexSeed: this.sss.getMasterPasswordHash().substring(0, 8),
            secret: '',
            service: '',
        };
    }

    copyToClipboard = () => {
        console.log('Copied to clipboard');
        const password = this.sss.generatePassword({serviceName: this.state.service});
        copy(password);
    };

    onSecretChange = (event) => {
        this.sss = new SuperSecretSettings({ masterPassword: event.target.value });
        this.setState({
            secret: event.target.value,
            hexSeed: this.sss.getMasterPasswordHash().substring(0,8)
        });
    };

    onServiceChange = (event) => {
        this.setState({
            service: event.target.value
        })
    };

    render() {
        return (
            <div className="robot">
                <label className="noselect" id="hexadecimalSeed">{this.state.hexSeed}</label>
                <div className="bubble" id="bocata">click to copy</div>
                <div className="inputs">
                    <input id="secret" placeholder="secret" type="password" autoFocus="autofocus" value={this.state.secret} onChange={this.onSecretChange} />
                    <input id="service" placeholder="service" value={this.state.service} onChange={this.onServiceChange}/>
                </div>
                <img id="robotRock" src={'https://robohash.org/' + this.state.hexSeed} alt="robot" />
                <button className="password" id="password" onClick={this.copyToClipboard}/>
                <Favicon url={'https://robohash.org/' + this.state.hexSeed} />
            </div>
        );
    }
}

export default App;
