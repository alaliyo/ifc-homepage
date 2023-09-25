import { useState } from "react";
import { ChildTitle } from "../../style/CommonStyled";

function AdminYoutube() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [bible, setBible] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");

    return(
        <div>
            <ChildTitle>유튜브</ChildTitle>
        </div>
    );
}

export default AdminYoutube;