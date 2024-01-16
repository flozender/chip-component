import Select from "../../components/Select/Select";
import {USERS} from "../../users";

const Home = () => {
    return (
        <div >
            <Select allUsers={USERS} />
        </div>
    );
}

export default Home;