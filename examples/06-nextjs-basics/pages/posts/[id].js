import {useRouter} from 'next/router';

import Header from '../../components/header';

const Post = () => {
    const router = useRouter();
    const {id, sortBy} = router.query;
    console.log(router.query)

    return (
        <>
            <Header />
            <h1>Post: {id} - sortBy: {sortBy}</h1>
        </>
    );
};

export default Post;
