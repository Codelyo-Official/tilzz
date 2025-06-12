import HomeNavbar from "../../components/HomeNavbar";
import PublicStoriesFeed from "../../components/PublicStories";
import Footer from "../../components/Footer";

function PublicStories() {

    return (
        <>
            <HomeNavbar />
            <div>
                <PublicStoriesFeed />
            </div>
            <Footer />
        </>
    );
}

export default PublicStories;
