export default function Result(props) {
  return (
    <div className='bg-lightpink mt-2 rounded-lg px-3 py-1 md:px-5 md:py-2'>
      <p className='text-base md:text-lg'>{props.name}</p>
    </div>
  )
}