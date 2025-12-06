const helper = require('./helper.js');
const React = require('react');
const {createRoot} = require('react-dom/client');


//18
const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if(!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, {username, pass});
    return false;
}

// 19 

const handleSignup = (e) => {
    e.preventDefault();
    helper.handleError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if(!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, {username,pass,pass2});

    return false;

}


//
const handlePremiumToggle = async () => {
    const response = await fetch ('/togglePremium', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
    });

    const data = await response.json();

    window.accountPremium = data.premium;

    window.location.reload();
}
//


// 20
const LoginWindow = (props) => {
    return(
        <form id="loginForm"
        name="loginForm"
        onSubmit={handleLogin}
        action="/login"
        method="POST"
        className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};

//21
const SignupWindow = (props) => {
    return(
    <form id="signupForm"
        name="signupForm"
        onSubmit={handleSignup}
        action="/signup"
        method="POST"
        className="mainForm"
    >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input className="formSubmit" type="submit" value="Sign in" />
    </form>

    );
};

//22
const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
const premiumDiv = document.getElementById("premiumData");
window.accountPremium = premiumDiv?.dataset?.premium === "true";

    const root = createRoot(document.getElementById('content'));

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<div>  <LoginWindow />  <AdBanner /> </div>);
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<div>     <SignupWindow />  <AdBanner /></div>);
        return false;
    });
    document.getElementById('premiumToggle').addEventListener('change', handlePremiumToggle);

    root.render(<div> <LoginWindow />  <AdBanner /> </div>);
};

const AdBanner = () => {
    
    //this too absolutely make sure its boolean
  const isPremium = !!window.accountPremium;

        if (isPremium){
            return null;
        }else{
    
    
    return (  
        <div id="adBanner" className="adBanner">
            <img src="/assets/img/adPlaceholder.jpg" alt="Advertisement" />
        </div>
    );
 }
};

window.onload = init;

