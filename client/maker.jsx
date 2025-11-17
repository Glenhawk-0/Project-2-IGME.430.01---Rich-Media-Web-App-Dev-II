//35
const helper = require('./helper.js');
const React = require('react');
const {useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleThisObject = (e, onThisObjectAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#thisobjectName').value;
    const age = e.target.querySelector('#thisobjectAge').value;

    if(!name || !age){ 
        helper.handleError('All fields are required');
        return false;
    }

    helper.sendPost(e.target.action, {name, age}, onThisObjectAdded);
    return false;
}

//36
const ThisObjectForm = (props) => {
    return(
        <form id="thisobjectForm"
        onSubmit={(e) => handleThisObject(e, props.triggerReload)}
        name="thisobjectForm"
        action="/maker"
        method="POST"
        className="thisobjectForm"
>
        <label htmlFor="name">Name:  </label>
        <input id="thisobjectName" type="text" name="name" placeholder="ThisObject Name" />
        <label htmlFor="age">Age:  </label>
        <input id="thisobjectAge" type="number" min="0" name="age" />
        <input className="makeThisObjectSubmit" type="submit" value="Make ThisObject" />
</form>

    );
};

//37 
const ThisObjectList = (props) => {
    const [thisobjects, setThisObjects] = useState(props.thisobjects); 

    useEffect(() => {
        const loadThisObjectsFromServer = async () => {
            const response = await fetch ('/getThisObjects');
            const data = await response.json();
            setThisObjects(data.thisobjects);

        };
        loadThisObjectsFromServer();
    }, [props.reloadThisObjects]);

    if (thisobjects.length === 0) {
        return (
            <div className="thisobjectList">
                <h3 className="emptyThisObject">No ThisObjects Yet!</h3>
            </div>
        );
    }

    const thisobjectNodes = thisobjects.map(thisobject => {
        return(
            <div key={thisobject.id} className="thisobject">
                <img src="/assets/img/thisobjectface.jpeg" alt="thisobject face" className="thisobjectFace" />
                <h3 className="thisobjectName">Name: {thisobject.name}</h3>
                <h3 className="thisobjectAge">Age: {thisobject.age}</h3>
            </div>
        );
    });
    
    return(
        <div className="thisobjectList">
            {thisobjectNodes}
        </div>
    );

};//end of ThisObjectList


//ThisObjectMakerE
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
    const [reloadThisObjects, setReloadThisObjects] = useState(false);
    return(
        
        <div>
            <div id="changePassword">
            <ChangePasswordForm />
            </div>
            <div id="makeThisObject">
                <ThisObjectForm triggerReload={() => setReloadThisObjects(!reloadThisObjects)} />
            </div>
            <div id="thisobjects">
                <ThisObjectList thisobjects={[]} reloadThisObjects={reloadThisObjects} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App />);
};

window.onload = init;