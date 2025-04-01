"use client"
import styled from "styled-components"
import Link from 'next/link';
import {usePathname } from 'next/navigation';
import { AiFillHome } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { SiTheodinproject } from "react-icons/si";
import { IoMdContact } from 'react-icons/io';
import {motion} from 'framer-motion';



const NavbarSection = () => {
    
    
    const pathname = usePathname()
   const navText = [
    {title : "home", path : "/", icon: <AiFillHome/> },
    {title : "About", path : "/about", icon: <SiTheodinproject/> },
    {title : "Academics", path : "/academics", icon: <BsFillPersonFill/> },
    // {title : "contact", path : "/contact", icon: <IoMdContact/> }
   ]

   

    return (
       <motion.div 
       initial={{opacity:0}}
       animate={{opacity:1}}
       >
         <NavSection>
            <ListContent>
                {navText.map((text, index) => (
                    <Li key={index}>
                        <Eleme>
                        <Link href={text.path}>
                        <span 
                            className={`
                            ${pathname === text.path ? "active" : ""}
                        icon`}>{text.icon}</span>
                        <span 
                            className={`
                            ${pathname === text.path ? "textActive" : ""}  
                        text`}>{text.title}</span>
                        </Link>
                        </Eleme>
                    </Li>
                ))}
            </ListContent>
        </NavSection>
       </motion.div>
    )
    
}



export default NavbarSection

const NavSection = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 25px;
    z-index: 999;
    left: 50%;
    backdrop-filter: blur(10px);
    transform: translate(-50%, -30%);
    border-radius: 25px;
    width: 400px;
    font-size:0.9rem;
    text-align:center;
    font-family: Georgia, 'Times New Roman', Times, serif;
    letter-spacing: 1px;
    height: 75px;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(10px);
    color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    @media(max-width:780px){
    width:350px;
    padding: 0 10px;
    }
`
const ListContent = styled.ul`
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 10px;
        width: 100%;
        text-transform: capitalize;
    `
const Li = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    margin-left:-15px;
    padding:0 10px;
    // background: red;
    position: relative;
    // overflow-x: hidden;
    transition: all 0.3s ease-in-out;
    a{
        width: 100%;
        position: relative;
        z-index: 99;
        text-decoration:none;
        bottom: 0;
        color:#fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: auto;
        .icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            color: var(--foreground);
            text-align: center;
            position: relative;
            z-index: 2;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding-bottom: 20px;

            svg {
                position: relative;
                z-index: 2;
            }

            &::after {
                content: "";
                position: absolute;
                width: 75%;
                height: 75%;
                top: 50%;
                left: 50%;
                opacity: 0;
                box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.2);
                border-radius: 50%;
                background-color: #fff;
                z-index: 1;
                transform: translate(-50%, -50%) scale(1);
                transition: all 0.3s ease-in-out;
            }
        }

        .active {
            width: 45px;
            height: 45px;
            color: var(--background);
            opacity: 1;
            background: rgba(${()=>  Math.random() * 255},${()=>  Math.random() * 255},${()=>  Math.random() * 255},${()=>  Math.random() * 0.9});
            color: #000;
            display: flex;
            font-size: 25px;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding-bottom: 0;
            overflow: hidden;
            position: relative;
            z-index: 9;
            box-shadow: 0 8px 10px rgba(0, 0, 0, 0.5);
            transform: translate(0px, -30px);
            transition: transform 0.3s linear;

            &::after {
                opacity: 1;
            }
        }

        .text {
            color: var(--foreground);
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            margin-top: -15px;
            transform: translate(0px, 20px);

            &::after {
                content: "";
                position: absolute;
                width: 8px;
                height: 8px;
                bottom: -40%;
                border-radius: 50%;
                // background: red;
                z-index: 0;
                left: 40%;
                transform: scale(0);
                // transition: all 0.3s ease-in-out;
            }
        }

        .textActive {
            transform: translate(0px, -10px);
            position: relative;
            font-weight: 700;
            font-size: 20px;
            transition: all 0.3s ease-in-out;
            font-size:1rem;
            &::after {
                content: "";
                position: absolute;
                width: 5px;
                height: 6px;
                bottom: -40%;
                border-radius: 50%;
                background: green;
                z-index: 0;
                left: 40%;
                box-shadow: 1px 1px 5px rgba(0, 0, 0, 1);
                transform: scale(1);
                transition: transform 0.3s ease-in-out;
            }
        }
    }
`
const Eleme = styled.a`
        position: relative;
        z-index: 1;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin: auto;
        
    }`