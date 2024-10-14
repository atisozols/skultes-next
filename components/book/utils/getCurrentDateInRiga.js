const getCurrentDateInRiga = () => {
  const rigaTime = new Date().toLocaleString('en-CA', {
    timeZone: 'Europe/Riga',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return rigaTime.split(',')[0];
};

export default getCurrentDateInRiga;
