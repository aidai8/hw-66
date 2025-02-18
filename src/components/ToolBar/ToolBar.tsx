import {NavLink} from "react-router-dom";


const ToolBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-success-subtle">
            <div className="container">
                <NavLink className="navbar-brand" to="/">Calorie Tracker</NavLink>
            </div>
        </nav>
    );
};

export default ToolBar;