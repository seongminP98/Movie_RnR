import React from 'react';
import ActivityIndicator from '../../components/ActivityIndicator';

type ProfileProps = {
  user: any;
};

const Profile = ({ user }: ProfileProps) => {
  return (
    <div className="w-full relative mt-10 rounded my-24 overflow-hidden bg-gray">
      <div className="top h-64 w-full bg-blue-600 overflow-hidden relative">
        <img
          src="https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
          alt=""
          className="bg w-full h-full object-cover object-center absolute z-0"
        />
        <div className="flex flex-col justify-center items-center relative h-full bg-gray-darker bg-opacity-50 text-white">
          <img
            src="https://images.unsplash.com/photo-1605722625766-a4c989c747a4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80"
            className="h-24 w-24 object-cover rounded-full"
          />
          <h1 className="text-2xl font-semibold">{user.nickname}</h1>
          <h4 className="text-sm font-semibold">Joined Since '19</h4>
        </div>
      </div>
      <div className="grid grid-cols-12 bg-gray ">
        <div className="col-span-12 w-full px-3 py-6 justify-center flex space-x-4 border-gray border-solid md:space-x-0 md:space-y-4 md:flex-col md:col-span-2 md:justify-start ">
          <a href="#" className="text-sm p-2 bg-indigo-900 text-white text-center rounded font-bold">
            Basic Information
          </a>

          <a href="#" className="text-sm p-2 bg-indigo-200 text-center rounded font-semibold hover:bg-indigo-700 hover:text-gray-200">
            Another Information
          </a>

          <a href="#" className="text-sm p-2 bg-indigo-200 text-center rounded font-semibold hover:bg-indigo-700 hover:text-gray-200">
            Another Something
          </a>
        </div>

        <div className="col-span-12 md:border-solid md:border-l md:border-black md:border-opacity-25 h-full pb-12 md:col-span-10">
          <div className="px-4 pt-4">
            <form action="#" className="flex flex-col space-y-8">
              <div>
                <h3 className="text-2xl font-semibold">Basic Information</h3>
              </div>

              <div className="form-item">
                <label className="text-xl ">ID</label>
                <input
                  type="text"
                  value={user.user_id}
                  className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
                  disabled
                />
              </div>

              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4">
                <div className="form-item w-full">
                  <label className="text-xl ">Nickname</label>
                  <input
                    type="text"
                    value={user.nickname}
                    className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                    disabled
                  />
                </div>

                <div className="form-item w-full">
                  <label className="text-xl ">Gender</label>
                  <input
                    type="text"
                    value={user.gender}
                    className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                    disabled
                  />
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold ">More About Me</h3>
              </div>

              <div className="form-item w-full">
                <label className="text-xl ">Biography</label>
                <textarea
                  cols={30}
                  rows={10}
                  className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  disabled
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem natus nobis odio. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Accusantium, eveniet fugiat? Explicabo assumenda dignissimos quisquam perspiciatis corporis sint commodi
                  cumque rem tempora!
                </textarea>
              </div>

              <div>
                <h3 className="text-2xl font-semibold">My Social Media</h3>
              </div>

              <div className="form-item">
                <label className="text-xl ">Instagram</label>
                <input
                  type="text"
                  value="https://instagram.com/"
                  className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  disabled
                />
              </div>
              <div className="form-item">
                <label className="text-xl ">Facebook</label>
                <input
                  type="text"
                  value="https://facebook.com/"
                  className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 "
                  disabled
                />
              </div>
              <div className="form-item">
                <label className="text-xl ">Twitter</label>
                <input
                  type="text"
                  value="https://twitter.com/"
                  className="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200  "
                  disabled
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;