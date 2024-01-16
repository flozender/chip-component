import { User } from "../../users";
import Avatar from "../Avatar/Avatar";
import Fuse from 'fuse.js';

import './Search.css';

type SearchProps = {
    input: string,
    availableUsers: User[],
    visible: boolean,
    fn: Function
}


const Search = (props: SearchProps) => {
    const { input, availableUsers, visible, fn } = props;

    const fuse = new Fuse<User>(availableUsers, {
        keys: ['name', 'email'],
    });
    let matchedUsers: User[] = [];
    if (input !== '') {
        const fuseResult = fuse.search(input);
        matchedUsers = fuseResult.map(({ item }) => item);
    } else {
        matchedUsers = availableUsers;
    }


    return (
        <div className={`dropdown ${visible ? '' : 'hidden'}`}>
            {matchedUsers.map((user, id) => (<Item user={user} key={id} fn={fn} />))}
        </div>
    )
}

const Item = (props: { user: User, fn: Function }) => {
    const { user, fn } = props;
    const { name, email } = user;
    return (
        <div className="item" onClick={() => { fn(user) }}>
            <Avatar size="40px" user={user} />
            <div>
                {name}
            </div>
            <div className="email">
                {email}
            </div>
        </div>
    );
}

export default Search;