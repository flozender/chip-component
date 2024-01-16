import Select from "../../components/Select/Select";
import {USERS} from "../../users";

const Home = () => {
    return (
        <Select allUsers={USERS} />
    );
}

export default Home;