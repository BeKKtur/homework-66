import {NavLink} from "react-router-dom";

const Tracker = () => {
    return (
        <div>
            <h3>Calories</h3>
            <button className="btn btn-primary"><NavLink to='add'>Add new meal</NavLink> </button>
            {/*<NavLink to='/add' className='btn btn-primary'>Add new meal</NavLink>*/}
        </div>
    );
};

export default Tracker;