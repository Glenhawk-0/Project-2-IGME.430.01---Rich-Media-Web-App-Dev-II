//35
const helper = require('./helper.js');
const React = require('react');
const {useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleDomo = (e, onDomoAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;

    if(!name || !age){ 
        helper.handleError('All fields are required');
        return false;
    }

    helper.sendPost(e.target.action, {name, age}, onDomoAdded);
    return false;
}

//36
const DomoForm = (props) => {
    return(
        <form id="domoForm"
        onSubmit={(e) => handleDomo(e, props.triggerReload)}
        name="domoForm"
        action="/maker"
        method="POST"
        className="domoForm"
>
        <label htmlFor="name">Name:  </label>
        <input id="domoName" type="text" name="name" placeholder="Domo Name" />
        <label htmlFor="age">Age:  </label>
        <input id="domoAge" type="number" min="0" name="age" />
        <input className="makeDomoSubmit" type="submit" value="Make Domo" />
</form>

    );
};

//37 
const DomoList = (props) => {
    const [domos, setDomos] = useState(props.domos); 

    useEffect(() => {
        const loadDomosFromServer = async () => {
            const response = await fetch ('/getDomos');
            const data = await response.json();
            setDomos(data.domos);

        };
        loadDomosFromServer();
    }, [props.reloadDomos]);

    if (domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = domos.map(domo => {
        return(
            <div key={domo.id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" className="domoFace" />
                <h3 className="domoName">Name: {domo.name}</h3>
                <h3 className="domoAge">Age: {domo.age}</h3>
            </div>
        );
    });
    
    return(
        <div className="domoList">
            {domoNodes}
        </div>
    );

};//end of DomoList


//DomoMakerE
const handlePasswordChange = (e) => {
  e.preventDefault();
  helper.hideError();

  const currentPass = e.target.querySelector('#currentPass').value;
  const newPass = e.target.querySelector('#newPass').value;
  const newPass2 = e.target.querySelector('#newPass2').value;

  if (!currentPass || !newPass || !newPass2) {
    helper.handleError('All fields are required!');
    return false;
  }

  if (newPass !== newPass2) {
    helper.handleError('New passwords do not match!');
    return false;
  }

  helper.sendPost(e.target.action, { currentPass, newPass, newPass2 });
  return false;
};


const ChangePasswordForm = () => {
  return (
    <form id="changePassForm"
      onSubmit={handlePasswordChange}
      name="changePassForm"
      action="/changePassword"
      method="POST"
      className="changePassForm">

      <label htmlFor="currentPass">Current Password: </label>
      <input id="currentPass" type="password" name="currentPass" placeholder="Current Password" />
      <label htmlFor="newPass">New Password: </label>
      <input id="newPass" type="password" name="newPass" placeholder="New Password" />
      <label htmlFor="newPass2">Confirm New Password: </label>
      <input id="newPass2" type="password" name="newPass2" placeholder="Confirm New Password" />
      <input className="formSubmit" type="submit" value="Change Password" />
    </form>
  );
};

//


//38 
const App = () => {
    const [reloadDomos, setReloadDomos] = useState(false);
    return(
        
        <div>
            <div id="changePassword">
            <ChangePasswordForm />
            </div>
            <div id="makeDomo">
                <DomoForm triggerReload={() => setReloadDomos(!reloadDomos)} />
            </div>
            <div id="domos">
                <DomoList domos={[]} reloadDomos={reloadDomos} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App />);
};

window.onload = init;