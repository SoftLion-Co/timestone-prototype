//! ?email=${email}
const Unsubscribe = () => {
  //const email = new URLSearchParams(window.location.search).get("email");

  const handleUnsubscribe = async () => {
    try {
      // const response = await fetch(`/api/unsubscribe?email=${email}`, { method: "POST" });
     
    } catch (error) {
      // setStatus("Сталася помилка. Спробуйте пізніше.");
    }
  };

  return (
    <div>
      {/* <h1>Відписатися від розсилки</h1>
      {email ? (
        <div>
          <p>Ви бажаєте відписатися від розсилки для {email}?</p>
          <button onClick={handleUnsubscribe}>Відписатися</button>
        </div>
      ) : (
        <p>Невірний запит.</p>
      )} */}
    </div>
  );
};

export default Unsubscribe;