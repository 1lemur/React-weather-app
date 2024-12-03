import { RiLoader2Fill } from 'react-icons/ri'

const Loader = () => {
   return (
      <div className="flex flex-col items-center min-h-96 justify-center text-3xl">
         <RiLoader2Fill size={82} className="loading-icon" />
         <p>Loading...</p>
      </div>
  )
}

export default Loader