import ProfileInfo from "../cards/ProfileInfo"

const Navbar = ({userInfo}) => {
  // const [searchQuery, setSearchQuery] = useState("")

  // const handleSearch = () => {}
  // const onClearSearch = () => {
  //   setSearchQuery("")
  // }
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">Handala</h2>
     <ProfileInfo userInfo={userInfo}/>
    </div>
  )
}

export default Navbar
