import translate from '../utils/translate'
import Tilt from 'react-parallax-tilt'

export default function CardGrid({ alfaUsers }) {

    return (
        <div className='p-8'>
            <div className={`grid lg:grid-cols-7 lg:h-auto overflow-auto justify-center items-center border-4 border-[#dddddd29] bg-[#2a2a2a1f] p-6 rounded-md shadow-black shadow-md md:grid-cols-3 md:h-[500px]`}>
                {
                    alfaUsers.map((player) => (
                        <div className='hover:z-[9999]'>
                            <Tilt>
                                <div
                                    style={{
                                        borderColor: player.card?.color,
                                    }}
                                    className={`border-4 h-[400px] w-[260px] md:h-[300px] md:w-[220px] rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none cursor-pointer relative transition hover:scale-[1.04] hover:top-[-80px] hover:left-[-90px] md:hover:top-[-10px] md:hover:left-[-40px] flex justify-center items-center shadow-lg bg-[#101010] card card__glare my-4`}
                                >
                                    <div
                                        style={{ borderColor: player.card?.color }}
                                        className={`absolute top-6 left-6 border-2 p-2 px-3 md:p-1 md:px-2 rounded-sm rounded-s-xl rounded-e-xl rounded-tr-none rounded-es-none transition hover:scale-[1.1]`}>
                                        <b className='text-xl md:text-md'>{player?.card?.overall}</b>
                                    </div>
                                    <div className='absolute top-6 right-6 rounded-sm transition hover:scale-[1.1]'>
                                        <img
                                            src={`/images/${player?.rank?.iconId}.png`}
                                            className='w-[45px] shadow-lg'
                                            alt="ranking do jogador"
                                        />
                                    </div>
                                    <div>
                                        <div className='flex justify-center items-center'>
                                            <img
                                                src={player.agent?.agent?.imageUrl}
                                                alt=""
                                                className='w-[160px] mb-4 mt-14 transition hover:scale-[1.1] rounded-xl md:w-[100px]'
                                            />
                                        </div>
                                        <h2 className='text-center font-semibold flex justify-center items-center'>
                                            <img src="/flag.png" className='w-[22px] mr-1' alt="" />
                                            {player.name}
                                        </h2>
                                        <div className='flex justify-center items-center mt-1'>
                                            <h3 className='text-center font-light text-sm border border-[#ffffff2a] rounded-sm bg-[#ffffff2a] w-[100px]'>
                                                {translate.translateRole(player.agent?.agent?.role)}
                                            </h3>
                                        </div>
                                        <h2 className='text-center font-semibold flex justify-center items-center text-[#f2e801] italic mt-2'>
                                            <img src="/vc-icon.png" className='w-[15px] mr-1' alt="" />
                                            {player.card?.value}
                                        </h2>
                                        <div className='md:hidden'>
                                            <ul className='list-none grid grid-cols-2 justify-center items-center text-center relative top-[15px]'>
                                                <li className='mx-2 my-1 px-4 w-[130px] flex items-center' id="rw-tooltip">
                                                    <p className='mr-2'>RW</p>
                                                    <b>{player.card?.RW}%</b>
                                                </li>
                                                <li className='mx-2 my-1 px-4 w-[130px] flex items-center'>
                                                    <p className='mr-2'>KAST</p>
                                                    <b>{player.card?.KAST}%</b>
                                                </li>
                                                <li className='mx-2 my-1 px-4 w-[130px] flex items-center'>
                                                    <p className='mr-2'>ACS</p>
                                                    <b>{player.card?.ACS}</b>
                                                </li>
                                                <li className='mx-2 my-1 px-4 w-[130px] flex items-center'>
                                                    <p className='mr-2'>DDΔ</p>
                                                    <b>{player.card?.DDA}</b>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </Tilt>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}