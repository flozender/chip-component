import { User } from "../../users";
import { sha256 } from 'js-sha256';

const Avatar = (props: {user: User, size: string}) => {
    const {name, email} = props.user;
    const {size} = props;
    return (
        <img alt={name} src={getGravatarURL(email)} style={{
            minHeight: size,
            maxHeight: size,
            borderRadius: size,
            marginRight: "5px",
        }}/>
    )
}

const getGravatarURL = (email: string) => {
    const emailHash = sha256(email);
    return 'https://gravatar.com/avatar/' + emailHash + '?s=30&d=retro';
};

export default Avatar;