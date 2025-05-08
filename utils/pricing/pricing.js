const pricing = {
  standard: {
    3: 2250, // 45min = 0.75h * 30 = 22.50 euros
    4: 3000, // 60min = 1h * 30 = 30 euros
    5: 3750, // 75min = 1.25h * 30 = 37.50 euros
    6: 4500, // 90min = 1.5h * 30 = 45 euros
    7: 5250, // 105min = 1.75h * 30 = 52.50 euros
    8: 6000, // 120min = 2h * 30 = 60 euros
  },
  half: {
    3: 1125, // Half of standard
    4: 1500,
    5: 1875,
    6: 2250,
    7: 2625,
    8: 3000,
  },
};

export default pricing;
