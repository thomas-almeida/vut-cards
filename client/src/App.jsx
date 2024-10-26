
import Tilt from 'react-parallax-tilt'
import axios from 'axios'
import baseUrl from './utils/baseUrl.js'
import translate from './utils/translate.js'
import { useState, useEffect, useRef, useCallback } from 'react'
import Modal from './components/Modal.jsx'
import LazyLoad from 'react-lazyload'
import domtoimage from 'dom-to-image'
import CardGrid from './components/cardGrid.jsx'
import Footer from './components/Footer.jsx'

function App() {

  const [cardStats, setCardStats] = useState({})
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
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


  const saveCard = useCallback(() => {

    domtoimage.toPng(cardRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = 'vut-card.png'
        link.click()
      })
      .catch((err) => {
        console.log(err)
      })

  }, [cardRef])


  useEffect(() => {

    getAlfaUsers()

  }, [])

  return (
    <>
      <main className='flex justify-center flex-col items-center bg-[#141414] text-white'>
        <div className='lg:w-[80%] mt-28 md:w-[90%]'>
          <h1 className='font-extrabold italic text-md text-center mb-12'>VUT</h1>
          <div className='flex justify-center items-center'>
            <div>
              <h1 className='lg:text-7xl font-bold italic lg:w-[600px] py-4 md:w-[400px] md:text-5xl'>VALORANT ULTIMATE TEAM</h1>
              <p className='w-[400px] mb-4'>
                Crie sua carta com base no seu <b>desenpenho nas ranqueadas</b>. Evolua sua carta e aumente ainda mais o valor dela no servidor! <b>Crie seu time</b>, participe de <b>Ligas ao vivo</b> e evolua cada vez mais
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
                    Fique por dentro das atualizações
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
                    boxShadow: '0px 0px 136px 1px rgba(187,240,224,0.21)',
                  }}
                  className={`border-4 h-[460px] w-[300px] rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none cursor-pointer transition hover:scale-[1.08] relative flex justify-center items-center shadow-lg bg-[#101010] card card__glare`}
                >
                  <div
                    style={{ borderColor: !cardStats?.card?.color ? '#f53c3d' : cardStats?.card?.color }}
                    className={`absolute top-6 left-6 border-4 p-2 px-3 rounded-sm rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none transition hover:scale-[1.1] flex justify-center items-center`}>
                    <p className='text-xl font-bold'>{!cardStats?.card?.overall ? ' 98 ' : cardStats?.card?.overall}</p>
                  </div>
                  <div className='absolute top-6 right-6 rounded-sm transition hover:scale-[1.1]'>
                    <LazyLoad>
                      <img
                        src={!cardStats?.rank?.iconId ? '/rank-radiant.png' : `/images/${cardStats?.rank?.iconId}.png`}
                        className='w-[45px] shadow-lg'
                        alt="ranking do jogador"
                      />
                    </LazyLoad>
                    <img
                      src={!cardStats?.agent?.agent?.imageUrl ? '/jett.png' : cardStats?.agent?.agent?.imageUrl}
                      alt=""
                      className='w-[45px] mt-4 transition hover:scale-[1.1] rounded-xl'
                    />
                  </div>
                  <div>
                    <div className='flex justify-center items-center'>
                      <img
                        src={!cardStats?.agent?.agent?.imageUrl ? '/aspas.png' : '/default-player.png'}
                        alt=""
                        className='w-[160px] mb-4 mt-14 transition hover:scale-[1.1] rounded-xl'
                      />
                      <p 
                        className={!cardStats?.card ? 'hidden' : `absolute top-[53%] left-[60%] shadow-xl rounded-sm`}>⭐</p>
                    </div>
                    <h2 className='text-center font-semibold flex justify-center items-center'>
                      <img src="/flag.png" className='w-[22px] mr-1' alt="" />
                      <p>{!cardStats?.name ? 'Aspas' : cardStats?.name}</p>
                      <div className='flex justify-center items-center ml-2'>
                        <img src="/vc-icon.png" className='w-[15px] mr-1' alt="" />
                        <p className='text-[#f2e801] italic'>{!cardStats?.card?.value ? '9999' : cardStats?.card?.value}</p>
                      </div>
                    </h2>
                    <div className='flex justify-center items-center mt-1'>
                      <h3 className='text-center font-light text-sm border border-[#ffffff2a] rounded-sm bg-[#ffffff2a] w-[40%] px-2'>
                        {!cardStats?.agent?.agent?.role ? 'Duelista' : translate.translateRole(cardStats?.agent?.agent?.role)}
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
                className={cardStats?.card ? `font-bold py-2 cursor-pointer transition hover:scale-[1.03] mt-5 text-center rounded-md border-4 bg-[#FFF] text-[#1A1A1A] hover:text-[${cardStats?.card?.color}] ` : 'hidden'}
                onClick={saveCard}
              >
                Criar Minha Carta
              </p>
            </div>
          </div>
        </div>
        <div className='p-6 mt-14 w-[80%] md:w-[90%]'>
          <div className='text-center flex justify-center pb-4 relative top-14'>
            <h2 className='w-[25%] border rounded-md border-[#ffffff54] bg-[#151515ce] text-[#ffffff] font-semibold py-1 md:w-[50%]'>
              Seja também um dos nossos Apoiadores ⭐
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
