import React from 'react';
import Popup from 'reactjs-popup';

export const CoursePopup = (open, setOpen, course) => {

  const closeModal = () => { setOpen }

  return (
    <div>
      {/* <button type="button" className="button" onClick={() => setOpen(o => !o)}>
        Controlled Popup
      </button> */}
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className=".modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          {console.log(course)}
          <div>
            {course ? <h1 style={{color: 'white'}}>{course.name}</h1> : <h1>"hello"</h1>}
          </div>
        </div>
      </Popup>
    </div>
  );
};