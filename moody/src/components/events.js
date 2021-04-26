const events= [
    {
      id: 0,
      title: "Journal1: Im feeling very sad",
      start: new Date(2021, 3, 1), //the dates are wrong, they a month behind
      end: new Date(2021, 3, 1)
    },
    {
      id: 1,
      title: "Journal2:I want to dance",
      start: new Date(2021, 3, 15),
      end: new Date(2021, 3, 15)
    },
  
    {
      id: 2,
      title: "Journal3:Im super angry with life",
      start: new Date(2021, 3, 20),
      end: new Date(2021, 3, 20)
    },
   
    {
      id: 3,
      title: "Journal4:Im exhausted, please give me a vacay",
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() - 3))
    }
  ];

  export default events;