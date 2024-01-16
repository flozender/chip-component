import './Chip.css'
import {ReactComponent as XIcon} from '../../icons/close.svg';
import { User } from '../../users';
import Avatar from '../Avatar/Avatar';

type ChipProps = {
    user: User,
    fn: Function,
    highlight: boolean,
    setIsHighlighted: Function
}

const Chip = (props:ChipProps) => {
    const {fn, user, highlight, setIsHighlighted} = props;
    const {name} = user;
    return (
        <div className={`chip-container ${highlight ? 'highlight' : ''}`} contentEditable='false'>
            <div className='flex'>
                <Avatar size='30px' user={user}/>
                <div className='chip-body'>
                    <div className='name'>
                        {name}
                    </div>
                    <XIcon className='icon' onClick={()=>{fn(user, highlight, setIsHighlighted)}}/>
                </div>

            </div>
        </div>
    );
}



export default Chip;