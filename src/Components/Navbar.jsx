import Clock from "./Clock";
function Navbar()
{

    return (
        <nav className="navbar">
            <ul>
                <li>Pomodoro</li>
                <li><Clock /></li>
            </ul>
        </nav>
    )
}

export default Navbar;