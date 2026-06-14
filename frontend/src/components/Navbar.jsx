import { useAuthStore } from "../store/useAuthStore"

const Navbar = () => {

  const {authUser,logout} = useAuthStore;

  return (
    <header>
    {authUser &&
<button onClick={logout}>
  Logout
</button>
}
    </header>
  )
}

export default Navbar
