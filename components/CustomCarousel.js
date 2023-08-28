import React, { useEffect, useState } from 'react'
const CustomCarousel = ({
  value,
  rows,
  columns,
  scrollColumns,
  responsiveOptions,
  itemTemplate,
  interval = 15000,
  nextPrevButton = true,
}) => {
  const [currentColumn, setCurrentColumn] = useState(0)
  const [column, setColumn] = useState(columns)
  const uniqueId = `custom-carousel-content-${column}`
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width <= responsiveOptions[3].breakpoint) {
        setColumn(responsiveOptions[3].columnNumber)
      } else if (
        width <= responsiveOptions[2].breakpoint &&
        width > responsiveOptions[3].breakpoint
      ) {
        setColumn(responsiveOptions[2].columnNumber)
      } else if (
        width <= responsiveOptions[1].breakpoint &&
        width > responsiveOptions[2].breakpoint
      )
        setColumn(responsiveOptions[1].columnNumber)
      else if (
        width <= responsiveOptions[0].breakpoint &&
        width > responsiveOptions[1].breakpoint
      )
        setColumn(responsiveOptions[0].columnNumber)
      else {
        setColumn(columns)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Để thiết lập giá trị ban đầu

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const itemsPerPage = rows
  const [paginatedBrands, setPaginatedBrands] = useState([])
  for (let i = 0; i < value.length; i += itemsPerPage) {
    paginatedBrands.push(value.slice(i, i + itemsPerPage))
  }

  const nextSlide = () => {
    if (currentColumn + column < paginatedBrands.length / scrollColumns) {
      setCurrentColumn(currentColumn + scrollColumns)
    }
  }

  const prevSlide = () => {
    if (currentColumn > 0) {
      setCurrentColumn(currentColumn - scrollColumns)
    }
  }

  const displayedItems = paginatedBrands.slice(
    currentColumn * scrollColumns,
    currentColumn * scrollColumns + scrollColumns * column
  )
  console.log('dis', displayedItems)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      if (currentColumn + scrollColumns < paginatedBrands.length) {
        setCurrentColumn((prevColumn) => prevColumn + scrollColumns)
      } else {
        setCurrentColumn(0)
      }
    }, interval)

    return () => clearInterval(slideInterval)
  }, [interval, currentColumn, paginatedBrands.length, scrollColumns])
  useEffect(() => {
    const carouselElement = document.getElementById(uniqueId)
    if (carouselElement) {
      carouselElement.style.setProperty('--num-columns', column)
    }
  }, [column, uniqueId])

  return (
    <div id='custom-carousel'>
      {nextPrevButton ? (
        <button
          onClick={prevSlide}
          type='button'
          class={
            currentColumn === 0
              ? 'p-carousel-prev p-link p-disabled'
              : 'p-carousel-prev p-link'
          }
          disabled={currentColumn === 0 ? true : false}
          aria-label='Previous Page'
          data-pc-section='previousbutton'
        >
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            class='p-icon p-carousel-prev-icon'
            aria-hidden='true'
            data-pc-section='previousbuttonicon'
          >
            <path
              d='M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z'
              fill='currentColor'
            ></path>
          </svg>
        </button>
      ) : null}
      <div id={uniqueId} className='custom-carousel-content'>
        {displayedItems.map((item) => itemTemplate(item))}
      </div>
      {nextPrevButton ? (
        <button
          onClick={nextSlide}
          type='button'
          class={
            currentColumn + column >= paginatedBrands.length / scrollColumns
              ? 'p-carousel-next p-link p-disabled'
              : 'p-carousel-next p-link'
          }
          disabled={
            currentColumn + column >= paginatedBrands.length / scrollColumns
              ? true
              : false
          }
          aria-label='Next Page'
          data-pc-section='nextbutton'
        >
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            class='p-icon p-carousel-next-icon'
            aria-hidden='true'
            data-pc-section='nextbuttonicon'
          >
            <path
              d='M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z'
              fill='currentColor'
            ></path>
          </svg>
        </button>
      ) : null}
    </div>
  )
}

export default CustomCarousel
