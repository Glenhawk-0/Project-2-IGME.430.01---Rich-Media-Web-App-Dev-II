//35
const helper = require('./helper.js');
const React = require('react');
const {useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const handleSubmitSpeedrun = (e, onSpeedrunAdded) => {
    e.preventDefault();
    helper.hideError();

        const game = e.target.querySelector('#speedrunGame').value;
        const time = e.target.querySelector('#speedrunTime').value;
        const video = e.target.querySelector('#speedrunVideo').value;
    
    if(!game || !time){ 
        helper.handleError('Game and Time are required');
        return false;
    }

    helper.sendPost(e.target.action, { game, time, video }, onSpeedrunAdded);
    return false;
};

//36
const ThisObjectForm = (props) => {
    return (
        <form id="speedrunForm"
            onSubmit={(e) => handleSubmitSpeedrun(e, props.triggerReload)}
            name="speedrunForm"
            action="/maker"
            method="POST"
            className="barForm">

            <label htmlFor="game">Game: </label>
            <input id="speedrunGame" type="text" name="game" placeholder="Game Name" />
            <label htmlFor="time">Time: </label>
            <input id="speedrunTime" type="number" min="0" name="time" placeholder="Time in seconds" />
            <label htmlFor="video">Video Link (optional): </label>
            <input id="speedrunVideo" type="text" name="video" placeholder="URL..." />
            <input className="submitSpeedrun" type="submit" value="Submit Speedrun" />
        </form>
    );
};

//37 
const ThisObjectList = (props) => {
        const [speedruns, setSpeedruns] = useState(props.thisobjects);

    useEffect(() => {
        const loadSpeedrunsFromServer = async () => {
            const response = await fetch ('/getThisObjects');
            const data = await response.json();
            setSpeedruns(data.thisobjects);

        };
         loadSpeedrunsFromServer();
    }, [props.reloadThisObjects]);

         if (speedruns.length === 0) {
        return (
            <div className="speedrunList">
                <h3 className="emptySpeedrun">No Speedruns Submitted Yet!</h3>
            </div>
        );
    }

    const speedrunNodes = speedruns.map(run => {
        return (
            <div key={run._id} className="speedrun">
                <img src="/assets/img/thisObjectface.jpeg" alt="speedrun icon"  className="speedrunIcon"/>
                <h3 className="speedrunGame">Game: {run.game}</h3>
                <h3 className="speedrunTime">Time: {run.time}</h3>
                    
                    
                   {
                   run.video && (
                    <h3 className="speedrunVideo">
                    Video: <a href={run.video} target="_blank" rel="noopener noreferrer">{run.video}</a>
                    </h3>
                )}
            </div>
        );
    });
    
    return(
        <div className="speedrunList">
            {speedrunNodes}
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

 helper.sendPost(e.target.action, { currentPass, newPass, newPass2 }, () => {
    // success
    helper.handleError("Password updated successfully!", true);

 
    
    setTimeout(() => {
      onPasswordChanged();
    }, 1000);
  });

  return false;
};


const ChangePasswordForm = (props) => {
  return (
    <form id="changePassForm"
   onSubmit={(e) => handlePasswordChange(e, props.triggerReload)}
      name="changePassForm"
      action="/changePassword"
      method="POST"
      className="barForm">

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
        
            <div id="changePassword" className="barContainer">
           <ChangePasswordForm triggerReload={() => setReloadThisObjects(!reloadThisObjects)} />
            </div>
            
            <div id="makeSpeedrun" className="barContainer">
                <ThisObjectForm triggerReload={() => setReloadThisObjects(!reloadThisObjects)} />
            </div>
            <div id="speedruns">
                <ThisObjectList thisobjects={[]} reloadThisObjects={reloadThisObjects} />
            </div>

                <AdBanner />
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App />);
};

const AdBanner = () => {
    return (
        <div id="adBanner" className="adBanner">
            <img src="/assets/img/adPlaceholder.jpg" alt="Advertisement" />
        </div>
    );
};

window.onload = init;