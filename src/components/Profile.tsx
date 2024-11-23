import useAuthRedirect from "../hooks/useAuthRedirect";
import useFetchPosts from "../hooks/useFetchPosts";
import { useUserContext } from "../hooks/useUserContext";
import Avatar from "./Avatar";
import Post from "./Post";

export default function Profile() {
  const { loggedUser } = useUserContext();
  const { posts, loading } = useFetchPosts();
  const { currentUser } = useAuthRedirect();
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#e6f7ff] pt-5">
      {/* User Profile Card */}
      <div className="bg-white/70 w-[45%] p-3 rounded-lg shadow-md mb-5">
        <div className="flex items-center">
          <Avatar
            width="w-24"
            url={
              loggedUser?.profilePic
                ? loggedUser.profilePic
                : "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
            }
          />
          <div className="ml-3">
            <h1 className="text-xl font-semibold">
              {loggedUser?.username || "User"}
            </h1>
            <p className="text-sm text-gray-400">
              <span className="mr-1">{loggedUser?.followers?.length || 0}</span>
              <span className="font-semibold">followers</span>
            </p>
          </div>
        </div>
      </div>

      {/* User Posts Card */}
      <div className="flex pt-2 bg-[#e6f7ff]">
        <div className="mb-3">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <Post
                description={post.description}
                imageUrl={post.imageUrl}
                postedTime={post.postedTime}
                userId={post.userId}
                key={index}
              />
            ))
          ) : (
            <div className="w-[45vw]">
              <div className="bg-white shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                  You don’t have any Posts
                </h1>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
