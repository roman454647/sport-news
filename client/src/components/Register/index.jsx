import React ,{ Component } from 'react';
import sign_up_bg from '../../assets/img/signup-bg.jpg';
import FormValidator from '../FormValidator';
import {rules} from '../FormValidator/rules';
import { userActions } from '../../_actions';
import { alertActions } from '../../_actions';
import { connect } from 'react-redux';


class Register extends Component {
    constructor(props){
        super(props);
      
       this.validator = new FormValidator(rules);
      
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            password:'',
             validation: this.validator.createValidObj(),
             submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(e){
        e.preventDefault();

        const newUser = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        };

        this.props.register(newUser);
         const validation = this.validator.validate(this.state);
         this.setState({ validation });
         this.setState({submitted:true});
         if (validation.isValid) {
           // handle actual form submission here
         }
    }

    render() {
       const validation = this.submitted ?                         // if the form has been submitted at least once
                       this.validator.validate(this.state) :   // then check validity every time we render
                       this.state.validation;
        const { alert } = this.props;
        return (
          <div className="register-container ">
                <div className="container-fluid">
                    <div className="bg-img">
                        <div className="logo-in-sign-up">
                            <h1>Sport News</h1>

                        </div>
                        <img src={sign_up_bg} alt="signup_bg"/>
                    </div>
                    <div className="create-account-form" onSubmit={this.handleSubmit}>
                        <div className="log-in">
                            <h3>Already have an account?</h3>
                            <a href="#" className="btn btn-primary login">Log In</a>
                        </div>
                        <div className="create-account-wrapper">
                            <h2>Create Account</h2>
                            <a href="#" className="btn fb-icon"></a>
                            <a href="#" className="btn gplus-icon"></a>
                            <p>Or use your email for registration</p>
                            {alert.message &&
                                <div className={`alert ${alert.type}`} onClick={this.props.clearAlerts}>{alert.message}</div>
                            }
                            <div className="user-info">
                                <div className={validation.first_name.isInvalid ?   'has-error': 'first_name'}>
                                    <label htmlFor="first-name-input">First name</label>
                                    <input type="text" id="first-name-input" 
                                      placeholder="John" 
                                      name="first_name" 
                                      value={this.state.first_name} 
                                      onChange={this.handleChange}/>
                                    <span className="help-block">{validation.first_name.message}</span>
                                </div>
                                <div className={validation.last_name.isInvalid ?   'has-error': 'last_name'}>
                                    <label htmlFor="last-name-input">Last name</label>
                                    <input type="text" id="last-name" 
                                      placeholder="Doe" 
                                      name="last_name" 
                                      value={this.state.last_name} 
                                      onChange={this.handleChange}/>
                                      <span className="help-block">{validation.last_name.message}</span>
                                </div>
                            </div>
                          <div className="email-wrapper">
                            <div className={validation.email.isInvalid ? 'has-error' : 'undefined'}>
                                <label htmlFor="email-input">Email</label>
                                <input type="email" id="email-input" 
                                  placeholder="johndoe@gmail.com" 
                                  name="email" 
                                  value={this.state.email} 
                                  onChange={this.handleChange}/>
                                  <span className="help-block">{validation.email.message}</span>
                              </div>
                              <div className={validation.password.isInvalid ? 'has-error' : 'undefined'}>
                                <label htmlFor="password-input">Password</label>
                                <input type="password" id="password-input" 
                                  placeholder="4+ characters" 
                                  name="password" 
                                  value={this.state.password} 
                                  onChange={this.handleChange}/>
                                <span className="help-block">{validation.password.message}</span>
                               </div>
                            </div>
                            <button onClick={this.handleSubmit } className="btn btn-primary sing-up" >sign up</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapState(state) {
    return {
        alert : state.alert
    }
}

const actionCreators = {
    register: userActions.register,
    clearAlerts: alertActions.clear
};

const connectedRegisterPage = connect(mapState, actionCreators)(Register);
export { connectedRegisterPage as Register };


