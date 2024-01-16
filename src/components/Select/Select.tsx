import { useState, useEffect, useRef } from 'react';
import { User } from '../../users';
import Chip from '../Chip/Chip';
import './Select.css';
import Search from '../Search/Search';

type SelectProps = {
    allUsers: User[];
}

const Select = (props: SelectProps) => {
    const {allUsers} = props;
    const [availableUsers, setAvailableUsers] = useState<User[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
    const [isHighlighted, setIsHighlighted] = useState<boolean>(false);
    const [showSearch, setShowSearch] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>('');
    const editableDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
          if (editableDivRef.current && !editableDivRef.current.contains(event.target)) {
            setShowSearch(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    useEffect(() => {
        setAvailableUsers(allUsers);
    }, [allUsers]);

    const addUser = (user: User) => {
        console.log(user);
        setSelectedUsers(selectedUsers => [...selectedUsers, user]);
        const remainingUsers = availableUsers.filter(availableUser => availableUser.email !== user.email);
        setAvailableUsers(remainingUsers);
        setSearchString("");
        document.getElementById("search-item")!.innerHTML="<br/>";
    }

    const removeUser = (user: User, highlighted: boolean, setIsHighlighted: Function) => {
        if (highlighted){
            setIsHighlighted(false);
        }
        const newUsers = selectedUsers.filter(selectedUser => selectedUser.email !== user.email);
        setSelectedUsers(newUsers);
        setAvailableUsers(availableUsers => [...availableUsers, user])
    }


    const handleBlur = () => {
        // setShowSearch(false);
    }

    const handleFocus = () => {
        setShowSearch(true);
    }
  
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
            if (event.code !== `Key${key.toUpperCase()}` && 
                key !== " " && 
                key !== "@" &&
                key !== "." &&
                key !== "-" &&
                key !== "_") {
                event.preventDefault();
                return;
            }
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
        <>
        <div className='select-box' contentEditable='true' ref={editableDivRef} onClick={handleDivClick} onKeyDown={handleKeyDown} onBlur={handleBlur} onFocus={handleFocus}>
            <div className='select-box-list'>
                {selectedUsers.map((user, id) => 
                    <div className='list-item' contentEditable='false'>
                        <Chip user={user} key={id} fn={removeUser} highlight={isHighlighted ? (id === selectedUsers.length-1 ? true : false) : false} setIsHighlighted={setIsHighlighted}/>
                    </div>
                )}
                <div className="list-item" id="search-item" contentEditable='true'><br/></div>
            </div>
        </div>
        <Search input={searchString} availableUsers={availableUsers} visible={showSearch} fn={addUser}/>
        </>
    );
}


export default Select;