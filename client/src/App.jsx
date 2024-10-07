
import Tilt from 'react-parallax-tilt'

function App() {

  return (
    <>
      <main className='flex justify-center items-center bg-[#141414] h-screen text-white'>
        <div className='w-[60%]'>
          <h1 className='font-extrabold italic text-md text-center mb-12'>VUT</h1>
          <div className='flex justify-center items-center'>
            <div>
              <h1 className='text-5xl font-bold italic w-[450px] py-2'>VALORANT ULTIMATE TEAM</h1>
              <p className='w-[400px] mb-4'>
                Crie sua carta com base no seu desenpenho nas ranqueadas! Evolua sua carta e aumente ainda mais o valor dela no servidor! Crie seu time de cartas e evolua cada vez mais
              </p>
              <div className='p-1 flex justify-start items-center my-6'>
                <div>
                  <label htmlFor="" className='italic font-bold'>Nome da conta</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Ex: LOUD Aspas"
                    className='p-2 rounded-sm my-2 text-black outline-none'
                  />
                </div>
                <div className='ml-2'>
                  <label htmlFor="" className='italic font-bold'>Riot ID</label>
                  <br />
                  <input
                    type="text"
                    placeholder="#"
                    className='w-[100px] p-2 rounded-sm my-2 text-black outline-none'
                  />
                </div>
              </div>
              <button className='p-1 py-3 border w-[100%] my-2 rounded-md font-semibold text-lg bg-white text-black'>
                Criar minha carta
              </button>
              <br />
              <button className='p-1 py-3 border w-[100%] my-2 rounded-md font-semibold text-lg'>
                Já Tenho Conta
              </button>
            </div>
            <div className='ml-16'>
              <Tilt>
                <div
                  className='border border-[#FFF500] h-[460px] w-[300px] rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none cursor-pointer transition hover:scale-[1.05] relative flex justify-center items-center shadow-lg bg-[#0d0d0d]'
                >
                  <div className='absolute top-6 left-6 border border-[#FFF500] p-2 px-3 rounded-sm rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none'>
                    <b className='text-xl'>99</b>
                  </div>
                  <div className='absolute top-6 right-6 rounded-sm'>
                    <img src="/rank-radiant.png" alt="" />
                  </div>
                  <div>

                    <img
                      src="/placeholder.png"
                      alt=""
                      className='w-[120px] mb-4'
                    />
                    <h2 className='text-center font-semibold'>Seu Nome</h2>
                    <h3 className='text-center font-light text-sm'>Elo III</h3>
                  </div>
                </div>
              </Tilt>
              <p className='italic font-bold py-4 cursor-pointer hover:underline'>Evoluir minha carta</p>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App
