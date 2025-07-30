import React, { useEffect } from 'react'
import { CircleUser, LayoutDashboard, Moon, NotebookTabs, NotebookText, Sun } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom';
import { getUserData } from '../../api/userAuth/auth';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../Redux/userSlicer';
import Dashboard from '../Pages/Dashboard/Dashboard';
import LogOut from '../Auth/LogOut';
import ThemeToggle from './ThemeToggle';

function Sidebar() {

    const dispatch = useDispatch()
    const userData = useSelector((state) => state?.user?.userInfo)
    const userRefresh = useSelector((state) => state?.admin?.userPageRefresh)
    const theme = useSelector((state) => state?.theme)

    async function getUser(){
        try {
            const res = await getUserData()
            console.log(res)
            if(res?.data?.userInfo){
               dispatch(userLogin(res?.data?.userInfo))
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(userData)

    const sidebarLinks = [
        { name: "Dashboard", path: "/", icon: <LayoutDashboard /> },
        { name: "Members", path: "/member", icon: <NotebookTabs /> },
        { name: "Admin", path: "/admin", icon: <NotebookText /> },
        { name: "Profile", path: "/profile", icon: <CircleUser /> },
    ];

    useEffect(() => {
          getUser()
    },[userRefresh])

    return (
        <>
        <div className={`w-[100vw] h-[100vh] overflow-hidden`}>
            <div className={`flex sticky z-50 top-0 items-center justify-between px-4 md:px-8 border-b ${theme?.borderColor} py-3 ${theme?.bgColor} transition-all duration-300`}>
                <a href="https://prebuiltui.com">
                    <img className="h-9" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/dummyLogo/dummyLogoColored.svg" alt="dummyLogoColored" />
                
                </a>
                <div className={`flex items-center gap-5 ${theme?.secondaryTextColor}`}>
                  <ThemeToggle />
                    <p>Hi! {userData?.fullname}</p>
                    <LogOut />
                </div>
            </div>
            <div className='top-0 flex h-full'>
  {/* Sidebar */}
  <div className={`md:w-64 w-16 border-r h-[700px] ${theme?.bgColor} text-base ${theme?.primaryTextColor} ${theme?.borderColor} pt-4 flex flex-col gap-4 transition-all duration-300`}>
    {sidebarLinks.map((item, index) => (
      <NavLink
        to={item.path}
        key={index}
        className={({ isActive }) =>
          `${isActive
            ? 'border-r-4 md:border-r-[6px] bg-indigo-500/10 border-indigo-400 text-indigo-500'
            : 'hover:bg-gray-100/90 border-white '} 
           flex items-center py-3 px-4 gap-3 relative group`
        }
      >
        {item.icon}
        {/* Hidden on small screen, shown on md+, or hover */}
        <p className="md:block hidden">{item.name}</p>

        {/* Hover Tooltip for small screens */}
        <span className={`absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:inline-block md:hidden whitespace-nowrap ${theme?.bgColor} ${theme?.primaryTextColor} text-xs px-2 py-1 rounded shadow border z-50`}>
          {item.name}
        </span>
      </NavLink>
    ))}
  </div>

  {/* Page Content */}
  <Outlet />
</div>
            </div>
        </>
    )
}

export default Sidebar