export const MobileNavbar = () => {
  return (
    <nav className='bg-white p-5 flex justify-between'>
    <div className='flex space-x-5 w-3/5'>
      <img src='/assets/logo-mobile.svg' alt='Mobile' />
      <div className='flex items-center'>
        <h1 className='headingL'>Platform launch</h1>
        <img src='/assets/icon-chevron-down.svg' alt='' className='scale-110' />
      </div>
    </div>
    <div className='flex space-x-3'>
      <button className='bg-MainPurple w-12 h-8 flex justify-center items-center  rounded-full'>
        <img src='/assets/icon-add-task-mobile.svg' alt='' />
      </button>
      <img src='/assets/icon-vertical-ellipsis.svg' alt='' className='object-contain' />
    </div>
  </nav>
  )
}