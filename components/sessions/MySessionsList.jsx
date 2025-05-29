'use client';

import MySession from './MySession';

const MySessionsList = ({ sessions }) => {
  return (
    <>
      {sessions.map((session, index) => (
        <div
          key={session._id}
          style={{ borderBottomWidth: `${index < sessions.length - 1 ? '0.5px' : '0'}` }}
          className={`w-full border-alternate px-3.5 py-3 ${index < sessions.length - 1 ? 'border-b' : ''}`}
        >
          <MySession session={session} />
        </div>
      ))}
    </>
  );
};

export default MySessionsList;
