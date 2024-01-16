import { useState, useEffect, useRef } from 'react';
import { User } from '../../users';
import Chip from '../Chip/Chip';
import './Select.css';

type SelectProps = {
    allUsers: User[];
}

const Select = (props: SelectProps) => {
    const {allUsers} = props;
    const [availableUsers, setAvailableUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>('');

    useEffect(() => {
        setAvailableUsers(allUsers);
        setSelectedUsers(allUsers);
    }, [allUsers]);

    const removeUser = (email: string, highlighted: boolean, setIsHighlighted: Function) => {
        if (highlighted){
            setIsHighlighted(false);
        }
        const newUsers = selectedUsers.filter(user => user.email !== email);
        setSelectedUsers(newUsers);
    }

    const editableDivRef = useRef(null);
  
    const handleDivClick = () => {
      if (editableDivRef.current) {
        placeCaretAtEnd(editableDivRef.current);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const key = event.key;
        if (key === "Backspace" || key === "Delete"){
            if (searchString.length === 0){
                event.preventDefault();
                console.log("back");
                if (isHighlighted){
                    const updatedUsers = selectedUsers.slice(0, -1);
                    setSelectedUsers(updatedUsers);
                    setIsHighlighted(false);
                } else {
                    setIsHighlighted(true);
                }
            } else {
                setSearchString((state) => (state.substring(0, state.length-1)))
            }
        } else {
            setSearchString((state) => (state+event.key.valueOf()));
        }
    }
  
    const placeCaretAtEnd = (el:HTMLElement) => {
      const range = document.createRange();
      const sel = window.getSelection()!;
      range.selectNodeContents(el);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      el.focus();
    };

    
    return (
        <div className='select-box' contentEditable='true' ref={editableDivRef} onClick={handleDivClick} onKeyDown={handleKeyDown}>
            <div className='select-box-list'>
                {selectedUsers.map((user, id) => 
                    <div className='list-item' contentEditable='false'>
                        <Chip user={user} key={id} fn={removeUser} highlight={isHighlighted ? (id === selectedUsers.length-1 ? true : false) : false} setIsHighlighted={setIsHighlighted}/>
                    </div>
                )}
                <div className="list-item" id="search-item" contentEditable='true'><br/></div>
            </div>
        </div>
    );
}


export default Select;