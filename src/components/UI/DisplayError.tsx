
const DisplayError = ({ error }: {error: string} ) => {
  return (
   <div className="text-3xl h-80">
      <div className="bg-white p-3 rounded-3xl w-full h-full flex items-center justify-center bg-opacity-15">
         {error}
      </div>
   </div>
  )
}

export default DisplayError