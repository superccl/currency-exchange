import Image from 'next/image'
import { CurrencyInfo } from './CurrencyRow'


type CurrencyItemProps = {
  item: CurrencyInfo
  onItemClick: (item:CurrencyInfo) => void
}

const CurrencyItem = ({ item, onItemClick }: CurrencyItemProps) => {
  return (
    <button 
    className='flex px-4 py-2 gap-2 items-center hover:bg-gray-300 w-full'
    onClick={() => onItemClick(item)}
    >
      <div className='relative h-5 aspect-video'>
        <Image fill src={`/assets/flags/${item.code}.png`} alt={`${item.country} flag`} />
      </div>
      <span>{item.code}</span>
      <span className='opacity-50'>{item.fullName}</span>
  </button>
  )
}

export default CurrencyItem