import logo from "/assets/logo.png";

const Header = () => {
  return (
    <header className="flex bg-primary items-center gap-4 px-6 py-2 justify-center">
      <img className="size-[25px] md:size-[40px]" src={logo} alt="" />
      <h1 className="text-sm md:text-xl">Smart attendance system using QR code</h1>
    </header>
  )
}

export default Header