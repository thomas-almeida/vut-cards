export default function Footer() {
  return (
    <>
      <div className="p-10 flex justify-center items-center bg-[#141414] text-white">
        <div className="text-center">
          <h3 className="font-bold italic">VUT - VALORANT ULTIMATE TEAM</h3>
          <ul className="p-4 flex justify-center items-center">
            <li className="px-4 flex justify-center items-center">
              <img src="/instagram.png" className="w-[18px] mr-1" alt="" />
              <p>
                <a
                  href="https://www.instagram.com/vut.game/"
                  target="_blank"
                  className="text-[#cb35a6]"
                >
                  @vut.game</a>
              </p>
            </li>
            <li className="px-4 flex justify-center items-center">
              <img src="/twitter.png" className="w-[18px] mr-1" alt="" />
              <p>
                <a
                  href="https://x.com/dev_microsaas"
                  target="_blank"
                  className="text-[#179cf0]"
                >
                  @dev_microsaas</a>
              </p>
            </li>
            <li className="px-4 flex justify-center items-center">
              <img src="/discord.svg" className="w-[18px] mr-1" alt="" />
              <p>
                <a
                  href="https://discord.gg/dZeBA4e5BY"
                  target='_blank'
                  className="text-[#5865f2]"
                >
                  Acesse a Comunidade</a>
              </p>
            </li>
            <li className="px-4 flex justify-center items-center">
              <p className="mr-1">📄</p>
              <p>
                <a
                  href="#"
                  className=""
                >
                  Termos de Uso e Privacidade
                </a>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}