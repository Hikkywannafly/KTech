import { useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

const LikeButton = () => {
    const [liked, setLiked] = useState(false);

    const handleClick = () => setLiked(!liked);      // bấm lần nữa đảo trạng thái

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold">LikeButton</h1>

            <button
                onClick={handleClick}
                className="mt-2 flex items-center gap-2 text-sm hover:underline"
            >

                <FaThumbsUp
                    className={`text-xl transition ${liked ? "text-blue-600" : "text-gray-600"
                        }`}
                />

                <span>
                    {liked
                        ? "Thank you!"
                        : "Click like if this post is useful to you !"}
                </span>
            </button>
        </div>
    );
};

export default LikeButton;
