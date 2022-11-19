export default useSocketIO = () => {
    const socket = io('https://3a15-89-236-248-70.eu.ngrok.io/Testhub')
    return {
        socket,
    }
  }