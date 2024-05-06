import React from "react";

const DetailedProfile = () => {
  return (
    <div className="bg-yellow-100 p-8">
      <h1 className="text-center text-3xl font-bold text-gray-700">
        User Profile <span className="text-blue-500">UI</span>
      </h1>
      <div className="user-profile flex items-center justify-center mt-8">
        <img
          className="avatar w-24 h-24 rounded-full"
          src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTF_erFD1SeUnxEpvFjzBCCDxLvf-wlh9ZuPMqi02qGnyyBtPWdE-3KoH3s"
          alt="Ash"
        />
        <div className="ml-6">
          <div className="username text-gray-600 font-bold text-xl">
            Will Smith
          </div>
          <div className="bio text-orange-500 font-semibold">Senior UI Designer</div>
          <div className="description text-gray-500 mt-2">
            I use to design websites and applications for the web.
          </div>
        </div>
      </div>
      <ul className="data flex justify-center items-center mt-4">
        <li className="flex-1">
          <span className="text-white font-semibold">127</span>
          <span className="text-gray-500">Likes</span>
        </li>
        <li className="flex-1">
          <span className="text-white font-semibold">853</span>
          <span className="text-gray-500">Views</span>
        </li>
        <li className="flex-1">
          <span className="text-white font-semibold">311</span>
          <span className="text-gray-500">Followers</span>
        </li>
      </ul>
      <footer className="mt-8 text-center">
        <h1 className="font-bold text-gray-700">
          inspired by{" "}
          <a
            href="https://dribbble.com/shots/1033074-User-Profile"
            className="text-pink-600 hover:underline"
          >
            <span className="entypo-dribbble"></span> shot
          </a>
        </h1>
      </footer>
    </div>
  );
};

export default DetailedProfile;
