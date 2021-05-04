export default function Result(props) {
  return (
    <div className='bg-mediumpink even:bg-lightpink mt-2 rounded-lg px-3 py-1 md:px-5 md:py-2'>
      <p className='text-sm md:text-lg'><span className='font-bold'>{props.main}</span>{props.album ? <span>,&nbsp;{props.album}</span> : null}</p>
    </div>
  )
}