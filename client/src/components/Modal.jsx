export default function Modal({
  isVisible,
  closeModal
}) {
  return (
    <>
      <div className={isVisible ? 'flex justify-center items-center absolute z-999 bg-[#000000b3] w-full h-full' : 'hidden'}>
        <div className="w-[35%] bg-white text-black p-8 text-center rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold mb-4">Ops...</h1>
          <p className="font-semibold px-6">
            Parece que esta conta não foi encontrada ou está privada, e ainda não está pública para análises e criação da sua carta, <a href="#" className="text-red-500 hover:underline"
            >saiba como deixar seu perfil público aqui</a> e tente novamente
          </p>
          <button
            className="mt-4 bg-red-500 w-[70%] p-2 text-white font-semibold rounded-md cursor-pointer transition hover:scale-[1.02]"
            onClick={() => closeModal()}
          >
            Entendi
          </button>
        </div>
      </div>
    </>
  )
}