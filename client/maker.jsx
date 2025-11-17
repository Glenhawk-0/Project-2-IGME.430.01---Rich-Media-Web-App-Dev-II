//35
const helper = require('./helper.js');
const React = require('react');
const {useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleThis_object = (e, onThis_objectAdded) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#this_objectName').value;
    const age = e.target.querySelector('#this_objectAge').value;

    if(!name || !age){ 
        helper.handleError('All fields are required');
        return false;
    }

    helper.sendPost(e.target.action, {name, age}, onThis_objectAdded);
    return false;
}

//36
const This_objectForm = (props) => {
    return(
        <form id="this_objectForm"
        onSubmit={(e) => handleThis_object(e, props.triggerReload)}
        name="this_objectForm"
        action="/maker"
        method="POST"
        className="this_objectForm"
>
        <label htmlFor="name">Name:  </label>
        <input id="this_objectName" type="text" name="name" placeholder="This_object Name" />
        <label htmlFor="age">Age:  </label>
        <input id="this_objectAge" type="number" min="0" name="age" />
        <input className="makeThis_objectSubmit" type="submit" value="Make This_object" />
</form>

    );
};

//37 
const This_objectList = (props) => {
    const [this_objects, setThis_objects] = useState(props.this_objects); 

    useEffect(() => {
        const loadThis_objectsFromServer = async () => {
            const response = await fetch ('/getThis_objects');
            const data = await response.json();
            setThis_objects(data.this_objects);

        };
        loadThis_objectsFromServer();
    }, [props.reloadThis_objects]);

    if (this_objects.length === 0) {
        return (
            <div className="this_objectList">
                <h3 className="emptyThis_object">No This_objects Yet!</h3>
            </div>
        );
    }

    const this_objectNodes = this_objects.map(this_object => {
        return(
            <div key={this_object.id} className="this_object">
                <img src="/assets/img/this_objectface.jpeg" alt="this_object face" className="this_objectFace" />
                <h3 className="this_objectName">Name: {this_object.name}</h3>
                <h3 className="this_objectAge">Age: {this_object.age}</h3>
            </div>
        );
    });
    
    return(
        <div className="this_objectList">
            {this_objectNodes}
        </div>
    );

};//end of This_objectList


//This_objectMakerE
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
    const [reloadThis_objects, setReloadThis_objects] = useState(false);
    return(
        
        <div>
            <div id="changePassword">
            <ChangePasswordForm />
            </div>
            <div id="makeThis_object">
                <This_objectForm triggerReload={() => setReloadThis_objects(!reloadThis_objects)} />
            </div>
            <div id="this_objects">
                <This_objectList this_objects={[]} reloadThis_objects={reloadThis_objects} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App />);
};

window.onload = init;