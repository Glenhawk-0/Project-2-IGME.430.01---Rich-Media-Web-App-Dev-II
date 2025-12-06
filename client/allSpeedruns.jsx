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

    
    //this too absolutely make sure its boolean
  const isPremium = !!window.accountPremium;
 console.log ("isPremium: " , window.accountPremium);
        if (isPremium == true ){
            return null;
        }else{
    
    
    return (  
        <div id="adBanner" className="adBanner">
            <img src="/assets/img/adPlaceholder.jpg" alt="Advertisement" />
            <h1><isPremium/></h1>
        </div>
        
    );
 }
};
//


const init = () => {
    const root = createRoot(document.getElementById('app'));
    document.getElementById('premiumToggle').addEventListener('change', handlePremiumToggle);
    const premiumDiv = document.getElementById("premiumData");
window.accountPremium = premiumDiv?.dataset?.premium === "true";

    root.render( <App />);
};

window.onload = init;