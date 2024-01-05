import Link from 'next/link'
import React, { useState } from 'react'

const Menu = ({
    items = [
      {
        name: 'Home',
        image: 'pi pi-fw pi-home',
        child_items: [
          {
            name: 'Home',
            image: 'pi pi-fw pi-home',
          },
          {
            name: 'Flash Sale',
            image: 'pi pi-fw pi-bolt',
          },
          {
            name: 'Product',
            image: 'pi pi-fw pi-home',
          },
        ],
      },
      {
        name: 'Calendar',
        image: 'pi pi-fw pi-calendar',
        child_items: [
          {
            name: 'Calendar',
            image: 'pi pi-fw pi-calendar',
          },
          {
            name: 'Schedule',
            image: 'pi pi-fw pi-calendar-plus',
          },
          {
            name: 'Reports',
            image: 'pi pi-fw pi-calendar-minus',
          },
        ],
      },
      {
        name: 'Documentation',
        image: 'pi pi-fw pi-question',
      },
      {
        name: 'Support',
        image: 'pi pi-fw pi-cog',
      },
    ],
    onTabChange,
  }) => {
    const [activeIndex, setActiveIndex] = useState(null);
  
    const renderChildItems = (child_items, parentIndex) => {
      return child_items.map((item, indexChild) => {
        const combinedIndex = `${parentIndex}.${indexChild}`;
        return (
          <li key={combinedIndex} className='li-items'>
            <a
              id={combinedIndex === activeIndex ? 'active' : 'items'}
              onClick={(e) => {
                setActiveIndex(combinedIndex);
                onTabChange({ originalEvent: e, index: combinedIndex });
              }}
            >
              <i className={item.image}></i>
              {item.name}
            </a>
          </li>
        );
      });
    };
  
    const renderItems = () => {
      return items.map((item, index) => {
        const [hide, setHide] = useState(false);
        const combinedIndex = `${index}`;
        return (
          <li className='li-items' key={combinedIndex}>
            <a
              id={combinedIndex === activeIndex ? 'active' : 'items'}
              onClick={(e) => {
                if (item.child_items) {
                  setHide(!hide);
                } else {
                  setActiveIndex(combinedIndex);
                  onTabChange({ originalEvent: e, index: combinedIndex });
                }
              }}
            >
              <i className={item.image}></i>
              {item.name}
            </a>
            {item.child_items && hide && (
              <a id='child-menu-bar'>{renderChildItems(item.child_items, combinedIndex)}</a>
            )}
          </li>
        );
      });
    };
  
    return (
      <div id='menu-left'>
        <a id='menu-bar'>{renderItems()}</a>
      </div>
    );
  };
  

export default Menu
