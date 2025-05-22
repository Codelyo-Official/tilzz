import React from 'react';
import { AiOutlineCalendar, AiOutlineShoppingCart, AiOutlineAreaChart, AiOutlineBarChart, AiOutlineStock } from 'react-icons/ai';
import { FiShoppingBag, FiEdit, FiPieChart, FiBarChart, FiCreditCard, FiStar, FiShoppingCart } from 'react-icons/fi';
import { BsKanban, BsBarChart, BsBoxSeam, BsCurrencyDollar, BsShield, BsChatLeft } from 'react-icons/bs';
import { FaRegHeart ,FaRegFlag} from "react-icons/fa";
import { SlUserFollowing } from "react-icons/sl";

import { BiColorFill } from 'react-icons/bi';
import { IoMdContacts } from 'react-icons/io';
import { RiContactsLine, RiStockLine } from 'react-icons/ri';

import { IoExitOutline } from "react-icons/io5";


// Define types
interface LinkItem {
  name: string;
  slug: string;
  icon: React.JSX.Element; // JSX.Element type for React icons
}

interface LinkCategory {
  title: string;
  links: LinkItem[];
}

export const links: LinkCategory[]  = [
  {
    title: 'Dashboard',
    links: [
      {
        name: 'Stories Feed',
        slug:'stories-feed',
        icon: <IoMdContacts style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      },
      {
        name: 'My Stories',
        slug:'my-stories',
        icon: <RiContactsLine style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      },
      {
        name: 'Following',
        slug:'following-stories',
        icon: <FaRegHeart style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      },
      // {
      //   name: 'Favourites',
      //   slug:'fav-stories',
      //   icon: <FaRegHeart style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      // },
      {
        name: 'Quarantine',
        slug:'reports',
        icon: <FaRegFlag style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      }
    ],
  },

  {
    title: 'Actions',
    links: [
      {
        name: 'Create New Story',
        slug:'create-story',
        icon: <FiEdit style={{height:"14px", width:"14px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      },
    ],
  },
  {
    title: 'Account',
    links: [
      {
        name: 'logout',
        slug:'user-logout',
        icon: <IoExitOutline style={{height:"16px", width:"16px", display:"inline-block", margin:"0", color:"black", marginRight:"5px", marginTop:"-2px"}}/>,
      },
    ],
  },
];