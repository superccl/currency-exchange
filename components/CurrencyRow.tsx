import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { AiOutlineDown } from 'react-icons/ai'
import Modal from './ui/Modal';
import data from '../currency_info.json'
import CurrencyItem from './CurrencyItem';
import SearchBar from './ui/SearchBar';

export type CurrencyInfo = {
  country: string;
  currency: string;
  code: string;
  symbol: string;
  fullName: string;
  img: string;
  id: number;
}

type CurrencyRowProps = {
  defaultCode: string,
  onCodeChange: (code: string) => void
  value: number,
  onValueChange: (e:ChangeEvent<HTMLInputElement>) => void
}

const CurrencyRow = ({ defaultCode, onCodeChange, value, onValueChange }:CurrencyRowProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currency, setCurrency] = useState<CurrencyInfo>(data.find(item => item.code === defaultCode)!)
  const [defaultOtherData, _] = useState(data)
  const [otherData, setOtherData] = useState<CurrencyInfo[]>(defaultOtherData)
  function handleItemClick(item:CurrencyInfo) {
    setCurrency(item)
    setIsOpen(false)
    onCodeChange(item.code)
  }

  return (
    <>
      <div className="my-4">
        <div className="grid grid-cols-[5fr_2fr]">
          <input type="number" className="border" value={value} onChange={onValueChange}></input>
          <div className="bg-blue-700 flex items-center px-2 py-4 gap-1">
            <div className='relative h-5 aspect-video'>
              <Image fill src={`/assets/flags/${currency.code}.png`} alt={`${currency.country} flag`} />
            </div>
            <div className='text-white text-lg'>{currency.code}</div>
            <button onClick={() => setIsOpen(true)}>
              <AiOutlineDown />
            </button>
          </div>
        </div>   
      </div>

      <Modal 
      open={isOpen} 
      onClose={() => setIsOpen(false)}
      portalStyle='flex justify-center items-center'
      style='w-full h-full bg-white sm:w-[450px] sm:right-0'
      >
        <div className='w-full h-full flex flex-col'>
          <header className='sticky flex flex-row items-center p-4 shadow'>
            <button className='text-3xl' onClick={() => setIsOpen(false)}>&times;</button>
            <h2 className='text-xl ml-4'>Select a currency</h2>
          </header>
          <SearchBar defaultData={defaultOtherData} setData={setOtherData} matchKeys={['code', 'fullName']}/>
          <div className='overflow-y-auto'>
            {otherData.map(item => (
              <CurrencyItem item={item} onItemClick={handleItemClick}/>
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}

export default CurrencyRow