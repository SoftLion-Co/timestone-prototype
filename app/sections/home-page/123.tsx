
"use client"
const Section = () => {
    const handleSubmitPassword = () => {
      throw new Error("Виникла помилка на сервері");
    };
  
    return (
      <div onClick={handleSubmitPassword}>
        Натисніть тут, щоб викликати помилку
      </div>
    );
  };
  
  export default Section;
  
