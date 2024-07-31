import { Helmet } from 'react-helmet-async';
import FollowView from '../follow/view/follow-view';


// ----------------------------------------------------------------------

export default function FollowPage({ onLogin }) {
    return (
        <>
        <Helmet>
            <title> Follow</title>
        </Helmet>

        <FollowView onLogin={onLogin} />;
        </>
    );
}
