const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div className={notification.success ? 'success' : 'error'}>
      {notification.message}
    </div>
  )
}

export default Notification;