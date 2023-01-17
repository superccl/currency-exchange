import CurrencyRow from '@/components/CurrencyRow'
import Head from 'next/head'
import { ChangeEvent, useEffect, useState } from 'react'

type ConversionData = {
  [key:string]: number
}
export default function Home() {
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://api.exchangerate.host/latest?base=USD')
      const data = await res.json()
      setData(data.rates!)
    }
    fetchData()
  }, [])

  const [data, setData] = useState<ConversionData>({} as ConversionData)
  const [topCode, setTopCode] = useState<string>('USD')
  const [bottomCode, setBottomCode] = useState<string>('HKD')
  const [conversionRate, setConversionRate] = useState<number>(100)
  const [topValue, setTopValue] = useState<number>(1)
  const [bottomValue, setBottomValue] = useState<number>(1)
  const [inputFromTop, setInputFromTop] = useState<boolean>(true)

  useEffect(() => {
    const rate = data[bottomCode] / data[topCode]
    setConversionRate(rate)
    inputFromTop ? 
    setBottomValue(topValue * rate) : 
    setTopValue(bottomValue / rate)
  }, [data, topCode, bottomCode])

  function handleTopValueChange(e:ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value)
    setInputFromTop(true)
    setTopValue(value)
    setBottomValue(value * conversionRate)
  }
  function handleBottomValueChange(e:ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(e.target.value)
    setInputFromTop(false)
    setBottomValue(value)
    setTopValue(value / conversionRate)
  }

  function handleTopCodeChange(code:string) {
    setInputFromTop(true)
    setTopCode(code)
  }

  function handleBottomCodeChange(code:string) {
    setInputFromTop(false)
    setBottomCode(code)
  }

  return (
    <>
      <Head>
        <title>Currency Conversion</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='shadow-lg bg-white flex flex-col justify-center items-center w-full'>
        <CurrencyRow 
        defaultCode={topCode} 
        value={topValue} 
        onValueChange={handleTopValueChange}
        onCodeChange={handleTopCodeChange}
        />
        <CurrencyRow 
        defaultCode={bottomCode} 
        value={bottomValue} 
        onValueChange={handleBottomValueChange}
        onCodeChange={handleBottomCodeChange}
        />
      </main>
    </>
  )
}
