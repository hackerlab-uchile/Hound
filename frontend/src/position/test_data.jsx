  /////// MOCK DATA GENERATOR ///////
  function newRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;  
  }

  function generateRandomNumber(){
    setTimeout(() => {
      setMockX(newRandomNumber(-10, 10));
      setMockY(newRandomNumber(-10, 10));
      setMockZ(newRandomNumber(-10, 10));
    }, 5000)
  }
  /////// MOCK DATA GENERATOR ///////

  // console.log("x, y, z:", mockX, mockY, mockZ);

  