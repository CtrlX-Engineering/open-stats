import './Home.css';
import Covidstats from '../covid/covidstats/Covidstats';

function Home(){
    return (
        <div>
            {/*ToDo: Add React Router to naviate from home screen to various stats*/}
            <Covidstats />
        </div>
    );
}

export default Home;