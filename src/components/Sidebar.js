const Sidebar = (props) => {
    console.log(props);
    const { characters } = props;
    const chars = characters && characters.map(({name}) => <li key={name}>{name}</li>);
    return (<aside>
        <h2>Main Characters</h2>
        <ul>
            {chars}
        </ul>
    </aside>);
};

export default Sidebar;