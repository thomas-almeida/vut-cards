
import Tilt from 'react-parallax-tilt'
import axios from 'axios'
import baseUrl from './utils/baseUrl.js'
import { useState, useEffect, useRef } from 'react'
import Modal from './components/Modal.jsx'
import html2canvas from 'html2canvas'
import CardGrid from './components/cardGrid.jsx'
import Footer from './components/Footer.jsx'

function App() {

  const [cardStats, setCardStats] = useState({})
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [currentColor, setCurrentColor] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [alfaUsers, setAlfaUsers] = useState([])

  const cardRef = useRef(null)

  async function getCardStats() {

    if (name === '' || code === '') {
      alert('insira os dados corretamente')
      return
    }

    try {

      setIsFetching(true)

      if (code.includes('#')) {
        alert('Retire a #')
        return
      }

      const response = await axios.get(`${baseUrl.localhost}/mvp/get-card-data/${name}/${code}`)
      setIsFetching(true)
      setCode('')
      setName('')

      if (!response.data?.playerCard) {
        setIsModalVisible(true)
        return
      }

      setCardStats(response.data?.playerCard)
      setIsFetching(false)
      getAlfaUsers()


    } catch (error) {
      console.error(error)
      setIsFetching(false)
    } finally {
      setIsFetching(false)
    }

  }

  function closeModal() {
    setIsModalVisible(false)
  }

  async function getAlfaUsers() {
    const response = await axios.get(`${baseUrl.localhost}/mvp/get-alfa-testers`)
    setAlfaUsers(response.data?.players)
  }

  async function saveCard() {

    const element = cardRef.current

    html2canvas(element).then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = imgData
      link.download = 'vut-card.png'
      link.click()
    })
  }


  useEffect(() => {

    getAlfaUsers()

  }, [])

  return (
    <>
      <main className='flex justify-center flex-col items-center bg-[#141414] text-white'>
        <div className='lg:w-[80%] mt-28 md:w-[90%]'>
          <h1 className='font-extrabold italic text-md text-center mb-12'>VUT</h1>
          <div className='flex justify-center items-center flex-wrap'>
            <div>
              <h1 className='lg:text-7xl font-bold italic lg:w-[600px] py-4 md:w-[400px] md:text-5xl'>VALORANT ULTIMATE TEAM</h1>
              <p className='w-[400px] mb-4'>
                Crie sua carta com base no seu desenpenho nas ranqueadas! Evolua sua carta e aumente ainda mais o valor dela no servidor! Crie seu time, participe de ligas ao vivo e evolua cada vez mais
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
                className={`p-1 py-3 border border-[#f53c3d] w-[85%] my-2 rounded-md font-semibold text-lg bg-[#f53c3d] text-white transition hover:scale-[1.08] hover:italic ${isFetching ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => getCardStats()}
                disabled={isFetching}
              >
                {isFetching ? 'Gerando Carta...' : 'Criar minha carta'}
              </button>
              <br />
              <a
                href="https://discord.gg/dZeBA4e5BY"
                target='_blank'
              >
                <button className='flex justify-center items-center p-1 py-3 border w-[85%] my-2 rounded-md font-semibold text-lg transition hover:scale-[1.035] hover:border-[#5865f2] hover:bg-[#5865f2] hover:italic'>
                  <p>
                    Juntar-se á Lista de Espera
                  </p>
                  <img src="/arrow.png" className='w-[12px] ml-2' alt="" />
                </button>
              </a>
            </div>
            <div className='ml-24'>
              <Tilt>
                <div
                  ref={cardRef}
                  style={{
                    borderColor: !cardStats?.card?.color ? '#f53c3d' : cardStats?.card?.color,
                    WebkitBoxShadow: '0px 0px 136px 1px rgba(187,240,224,0.21)',
                    MozBoxShadow: '0px 0px 136px 1px 0px 0px 136px 1px',
                    boxShadow: '0px 0px 136px 1px rgba(187,240,224,0.21)'
                  }}
                  className={`border-4 h-[460px] w-[300px] rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none cursor-pointer transition hover:scale-[1.08] relative flex justify-center items-center shadow-lg bg-[#10101091] card card__glare`}
                >
                  <div
                    style={{ borderColor: !cardStats?.card?.color ? '#f53c3d' : cardStats?.card?.color }}
                    className={`absolute top-6 left-6 border-2 p-2 px-3 rounded-sm rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none transition hover:scale-[1.1]`}>
                    <b className='text-xl'>{!cardStats?.card?.overall ? ' ?? ' : cardStats?.card?.overall}</b>
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
                    <h2 className='text-center font-semibold flex justify-center items-center'>
                      <img src="/flag.png" className='w-[22px] mr-1' alt="" />
                      {!cardStats?.name ? 'Seu Nome Aqui' : cardStats?.name}
                    </h2>
                    <div className='flex justify-center items-center mt-1'>
                      <h3 className='text-center font-light text-sm border border-[#ffffff2a] rounded-sm bg-[#ffffff2a] w-[30%]'>
                        {!cardStats?.rank?.metadata?.tierName ? 'Rank' : cardStats?.rank?.metadata?.tierName}
                      </h3>
                    </div>
                    <div className={!cardStats?.card ? 'hidden' : ''}>
                      <ul className='list-none grid grid-cols-2 justify-center items-center text-center relative top-[15px]'>
                        <li className='mx-2 my-1 px-4 w-[130px] flex items-center' id="rw-tooltip">
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
              <p
                className={cardStats?.card ? `font-bold py-2 cursor-pointer transition hover:scale-[1.03] mt-5 text-center rounded-md border-2 border-[#ffffff54] bg-[#ffffff54] text-[#ffffff] ` : 'hidden'}
                onClick={() => saveCard()}
              >
                Salvar Carta
              </p>
            </div>
          </div>
        </div>
        <div className='p-6 mt-14 w-[80%] md:w-[90%]'>
          <div className='text-center flex justify-center pb-4 relative top-14'>
            <h2 className='w-[25%] border rounded-md border-[#ffffff54] bg-[#151515ce] text-[#ffffff] font-semibold py-1 md:w-[50%]'>
              Crie sua carta assim como:
            </h2>
          </div>

          <CardGrid alfaUsers={alfaUsers} />

          <div
            className='py-24 mt-6 flex justify-center items-center flex-col'
          >

            <div className='p-2 w-[80%]'>
              <div className=''>
                <div className='flex justify-center items-center'>
                  <div>
                    <h2 className='text-6xl font-bold italic py-4 w-[600px]'>CRIE O SEU ULTIMATE TEAM</h2>
                    <p className='text-xl w-[600px]'>Evolua sua carta e aumente ainda mais o valor dela no servidor! Crie seu time, participe de ligas ao vivo e evolua cada vez mais. Desbloqueie ou compre pacotes de novos jogadores baseados no mundo real de VALORANT</p>
                  </div>
                  <div>
                    <img
                      src="/packs.png"
                      className='h-[300px]'
                      alt="" />
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  <div className='flex justify-center items-center'>
                    <Tilt>
                      <img src="/screen-1.png" className='lg:h-[550px]' alt="" />
                    </Tilt>
                  </div>
                  <div className='flex items-center justify-center flex-col'>
                    <div className='p-1 border-4 border-[#3d3a4d] text-center w-[200px] rounded-md mx-1 m-2 flex items-center justify-center flex-col'>
                      <div className='grid grid-cols-1 grid-flow-dense gap-3'>
                        <img className='w-[80px] h-[70px]' src="/emblema-loud.png" alt="" />
                      </div>
                      <p className='font-semibold italic text-lg mt-4'>Colecione Emblemas</p>
                    </div>
                    <div className='p-1 border-4 border-[#3d3a4d] text-center w-[200px] rounded-md mx-1 m-2 grid grid-cols-1 items-center'>
                      <div className='flex justify-center'>
                        <img className='w-[80px] h-[70px]' src="/emblema-league.png" alt="" />
                      </div>
                      <p className='font-semibold italic text-lg mt-4'>Jogue Ligas Ao Vivo</p>
                    </div>
                    <div className='p-1 border-4 border-[#3d3a4d] text-center w-[200px] rounded-md mx-1 m-2 grid grid-cols-1 items-center'>
                      <div className='flex justify-center'>
                        <img className='w-[80px] h-[70px]' src="/coins.png" alt="" />
                      </div>
                      <p className='font-semibold italic text-lg mt-4'>Melhore suas Cartas</p>
                    </div>
                  </div>
                </div>
                <div className='flex justify-center items-center'>
                  <a
                    href="https://discord.gg/dZeBA4e5BY"
                    target='_blank'
                  >
                    <button className='flex justify-center items-center p-1 px-4 py-3 border w-[100%] my-2 rounded-md font-semibold text-lg transition hover:scale-[1.035] hover:border-[#5865f2] hover:bg-[#5865f2] hover:italic'>
                      <p>
                        Juntar-se á Lista de Espera
                      </p>
                      <img src="/arrow.png" className='w-[12px] ml-2' alt="" />
                    </button>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
        <Modal
          isVisible={isModalVisible}
          closeModal={closeModal}
        />
      </main>
      <Footer />
    </>
  )
}

export default App
