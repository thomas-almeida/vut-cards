
import axios from 'axios'
import Tilt from 'react-parallax-tilt'
import baseUrl from './utils/baseUrl.js'
import { useState, useEffect } from 'react'
import Modal from './components/Modal.jsx'

function App() {

  const [cardStats, setCardStats] = useState({})
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [currentColor, setCurrentColor] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)

  async function getCardStats() {

    if (name === '' || code === '') {
      alert('insira os dados corretamente')
      return
    }

    try {

      if (code.includes('#')) {
        alert('retire a #')
        return
      }

      const response = await axios.get(`${baseUrl.localhost}/mvp/get-card-data/${name}/${code}`)
      setCode('')
      setName('')

      if (response.data?.message) {
        setIsModalVisible(true)
        return
      }

      setCardStats(response.data?.playerCard)
      
    } catch (error) {
      console.error(error)
    }

  }

  function closeModal() {
    setIsModalVisible(false)
  }

  useEffect(() => {

    function colorizeCard(overall) {

      console.log(overall, currentColor)

      if (overall === undefined) {
        setCurrentColor('#f53c3d')
      } else if (overall <= 30) {
        setCurrentColor('#bf868f')
      } else if (overall > 30 && overall <= 50) {
        setCurrentColor('#a7c6cc')
      } else if (overall > 50 && overall <= 75) {
        setCurrentColor('#e6bc5c')
      } else if (overall > 75 && overall <= 85) {
        setCurrentColor('#5ee790')
      } else if (overall > 85 && overall <= 88) {
        setCurrentColor('#3ecbff')
      } else if (overall > 88) {
        setCurrentColor('#f53c3d')
      }
    }

    colorizeCard(cardStats?.card?.overall)

  }, [cardStats])

  return (
    <>
      <main className='flex justify-center items-center bg-[#141414] h-screen text-white'>
        <div className='w-[70%]'>
          <h1 className='font-extrabold italic text-md text-center mb-12'>VUT</h1>
          <div className='flex justify-center items-center'>
            <div>
              <h1 className='text-6xl font-bold italic w-[500px] py-4'>VALORANT ULTIMATE TEAM</h1>
              <p className='w-[400px] mb-4'>
                Crie sua carta com base no seu desenpenho nas ranqueadas! Evolua sua carta e aumente ainda mais o valor dela no servidor! Crie seu time de cartas e evolua cada vez mais
              </p>
              <div className='p-1 flex justify-start items-center my-6'>
                <div>
                  <label htmlFor="" className='italic font-bold'>Nome da conta</label>
                  <br />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: LOUD Aspas"
                    className='p-2 rounded-sm my-2 text-white outline-none font-bold bg-[#efefef2e]'
                  />
                </div>
                <div className='ml-2'>
                  <label htmlFor="" className='italic font-bold'>Riot ID</label>
                  <br />
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="#"
                    className='w-[100px] p-2 rounded-sm my-2 text-white outline-none font-bold bg-[#efefef2e]'
                  />
                </div>
              </div>
              <button
                className='p-1 py-3 border border-[#f53c3d] w-[100%] my-2 rounded-md font-semibold text-lg bg-[#f53c3d] text-white transition hover:scale-[1.035]'
                onClick={() => getCardStats()}
              >
                Criar minha carta
              </button>
              <br />
              <button className='p-1 py-3 border w-[100%] my-2 rounded-md font-semibold text-lg transition hover:scale-[1.035]'>
                Já Tenho Conta
              </button>
            </div>
            <div className='ml-16'>
              <Tilt>
                <div
                  style={{
                    borderColor: currentColor,
                    WebkitBoxShadow: '0px 0px 136px 1px rgba(187,240,224,0.21)',
                    MozBoxShadow: '0px 0px 136px 1px 0px 0px 136px 1px',
                    boxShadow: '0px 0px 136px 1px rgba(187,240,224,0.21)'
                  }}
                  className={`border-4 h-[460px] w-[300px] rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none cursor-pointer transition hover:scale-[1.08] relative flex justify-center items-center shadow-lg bg-[#10101091] card card__glare`}
                >
                  <div
                    style={{ borderColor: currentColor }}
                    className={`absolute top-6 left-6 border-2 p-2 px-3 rounded-sm rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none transition hover:scale-[1.1]`}>
                    <b className='text-xl'>{!cardStats?.card?.overall ? '???' : cardStats?.card?.overall}</b>
                  </div>
                  <div className='absolute top-6 right-6 rounded-sm transition hover:scale-[1.1]'>
                    <img
                      src={!cardStats?.rank?.metadata?.iconUrl ? '/rank-radiant.png' : cardStats?.rank?.metadata?.iconUrl}
                      className='w-[45px] shadow-lg'
                      alt="ranking do jogador"
                    />
                  </div>
                  <div>
                    <div className='flex justify-center items-center'>
                      <img
                        src={!cardStats?.agent?.agent?.imageUrl ? '/placeholder.png' : cardStats?.agent?.agent?.imageUrl}
                        alt=""
                        className='w-[160px] mb-4 mt-14 transition hover:scale-[1.1] rounded-xl'
                      />
                    </div>
                    <h2 className='text-center font-semibold'>{!cardStats?.name ? 'Seu Nome Aqui' : cardStats?.name}</h2>
                    <h3 className='text-center font-light text-sm'>
                      {!cardStats?.rank?.metadata?.tierName ? 'Seu ELo' : cardStats?.rank?.metadata?.tierName}
                    </h3>
                    <div className={!cardStats?.card ? 'hidden' : ''}>
                      <ul className='list-none grid grid-cols-2 justify-center items-center text-center relative top-[15px]'>
                        <li className='mx-2 my-1 px-4 w-[130px] flex items-center'>
                          <p className='mr-2'>RW</p>
                          <b>{cardStats?.card?.RW}%</b>
                        </li>
                        <li className='mx-2 my-1 px-4 w-[130px] flex items-center'>
                          <p className='mr-2'>KAST</p>
                          <b>{cardStats?.card?.KAST}%</b>
                        </li>
                        <li className='mx-2 my-1 px-4 w-[130px] flex items-center'>
                          <p className='mr-2'>ACS</p>
                          <b>{cardStats?.card?.ACS}</b>
                        </li>
                        <li className='mx-2 my-1 px-4 w-[130px] flex items-center'>
                          <p className='mr-2'>DDΔ</p>
                          <b>{cardStats?.card?.DDA}</b>
                        </li>
                      </ul>

                    </div>
                    <div className='absolute bottom-[5px] left-0 right-0 flex justify-center items-center text-center'>
                      <h1 className='font-bold italic'>VUT</h1>
                    </div>
                  </div>
                </div>
              </Tilt>
              <p className='italic font-bold py-4 cursor-pointer hover:underline'>
                Começar a Evoluir minha carta
              </p>
            </div>
          </div>
        </div>
        <Modal
          isVisible={isModalVisible}
          closeModal={closeModal}
        />
      </main>
    </>
  )
}

export default App
