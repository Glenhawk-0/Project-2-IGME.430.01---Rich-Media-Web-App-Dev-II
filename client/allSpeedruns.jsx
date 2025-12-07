//35
const helper = require('./helper.js');
const React = require('react');
const {useState, useEffect } = React;
const { createRoot } = require('react-dom/client');




//37 
const AllSpeedrunsList  = (props) => {
        const [speedruns, setSpeedruns] = useState([]);

    useEffect(() => {
        const loadSpeedrunsFromServer = async () => {
            const response = await fetch ('/getAllThisObjects');
            const data = await response.json();
            setSpeedruns(data.speedruns);

        };
         loadSpeedrunsFromServer();
    }, [props.reloadSpeedruns]);

         if (speedruns.length === 0) {
        return (
            <div className="speedrunList">
                <h3 className="emptySpeedrun">No Speedruns Found Yet!</h3>
            </div>
        );
    }

    const speedrunNodes  = speedruns.map(speedrun => {
        return (
            <div key={speedrun._id} className="speedrun">
                <img src="/assets/img/thisObjectface.jpeg" alt="speedrun icon"  className="speedrunIcon"/>
                <h3 className="speedrunGame">Game: {speedrun.game}</h3>
                <h3 className="speedrunTime">Time: {speedrun.time}</h3>
                    
                    
                   {
                   speedrun.video && (
                    <h3 className="speedrunVideo">
                    Video: <a href={speedrun.video} target="_blank" rel="noopener noreferrer">{speedrun.video}</a>
                    </h3>
                )}

                {speedrun.owner && speedrun.owner.username && (
                    <h3 className="speedrunOwner">User: {speedrun.owner.username}</h3>
                )}

                <h3 className="speedrunDate">Submitted:{' '}
                    {new Date(speedrun.createdDate).toLocaleDateString()}</h3>


            </div>
        );
    });
    
    return(
        <div className="speedrunList">
            {speedrunNodes}
        </div>
    );

};//end of ThisObjectList

//38 
const App = () => {
    const [reloadSpeedruns, setReloadSpeedruns] = useState(false);
    return(
        <div id="allSpeedrunsPage">
            <AllSpeedrunsList reloadSpeedruns={reloadSpeedruns} />
             <AdBanner />
        </div>
    );
};

//ad
const AdBanner = () => {
    return (
        <div  className="adBanner">
            <img src="/assets/img/adPlaceholder.jpg" alt="Advertisement" />
        </div>
    );
};
//


const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App />);
};


// needed the assistance of AI for this. i apologize. 
const  refreshPremiumUI =  async  () => {
    const res = await fetch('/getAccount');
    const { account } = await res.json();
    if (!account) return;

 
    const logo = document.getElementById('logo');
    if (account.premium) {
      logo.src = '/assets/img/face2.png';
    } else {
      logo.src = '/assets/img/face.png';
    }

 
    const btn = document.getElementById('premiumToggle');
    btn.textContent = account.premium ? "Premium: ON" : "Premium: OFF";

    const ad = document.querySelector('.adBanner');
    if (ad) ad.style.display = account.premium ? 'none' : 'flex';
  }

  async function togglePremium() {
    await fetch('/togglePremium', { method: 'POST' });
    refreshPremiumUI();
  }

  window.addEventListener('DOMContentLoaded', () => {
    refreshPremiumUI();
    document.getElementById('premiumToggle')
      .addEventListener('click', togglePremium);
  });
// AI CODE OVER. sources.

window.onload = init;