import SideBar from "./components/SideBar.tsx"

function App() {

  return (
    <div className="flex">
      <SideBar/>
      <div className="flex-grow p-3 text-xl text-gray-900 font-semibold bg-teal-100">
        REACT TAILWIND
      </div>
    </div>
  )
}

export default App
