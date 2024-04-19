

const generarId = () => Math.random().toString(32).substr(2) + Date.now().toString(32);

export { generarId };