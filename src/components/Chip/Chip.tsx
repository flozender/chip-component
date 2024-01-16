import './Chip.css'
import {ReactComponent as XIcon} from '../../icons/close.svg';
import { sha256 } from 'js-sha256';

type ChipProps = {
    name: string,
    email: string
}

const Chip = (props:ChipProps) => {
    const {name, email} = props;
    return (
        <div className='chip-container'>
            <div className='flex'>
                <img alt={name} className='avatar' src={getGravatarURL(email)}/>
                <div className='chip-body'>
                    <div className='name'>
                        {name}
                    </div>
                    <XIcon className='icon'/>
                </div>

            </div>
        </div>
    );
}

const getGravatarURL = (email: string) => {
    const emailHash = sha256(email);
    return 'https://gravatar.com/avatar/' + emailHash + '?s=30&d=retro';
};

export default Chip;