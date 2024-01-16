import './Chip.css'
import {ReactComponent as XIcon} from '../../icons/close.svg';
import { sha256 } from 'js-sha256';
import { User } from '../../users';

type ChipProps = {
    user: User,
    fn: Function,
    highlight: boolean,
    setIsHighlighted: Function
}

const Chip = (props:ChipProps) => {
    const {fn, user, highlight, setIsHighlighted} = props;
    const {name, email} = user;
    return (
        <div className={`chip-container ${highlight ? 'highlight' : ''}`} contentEditable='false'>
            <div className='flex'>
                <img alt={name} className='avatar' src={getGravatarURL(email)}/>
                <div className='chip-body'>
                    <div className='name'>
                        {name}
                    </div>
                    <XIcon className='icon' onClick={()=>{fn(email, highlight, setIsHighlighted)}}/>
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