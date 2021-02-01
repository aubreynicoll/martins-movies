import React, { useState, useEffect } from 'react'
import Pagination from 'react-bootstrap/Pagination'

const MyPagination = ({ items, onChangePage, pageSize = 6}) => {
  const MIN_PAGE = 1
  const MAX_PAGE = Math.ceil(items.length / pageSize)

  const [active, setActive] = useState()
  console.log(MAX_PAGE)

  useEffect(() => {
    setActive(1)
  }, [])

  useEffect(() => {
    const pageStartElement = (active - 1) * pageSize
    const pageEndElement = Math.min(pageStartElement + pageSize, items.length)

    onChangePage(
      items.slice(pageStartElement, pageEndElement)
    )
  }, [active])

  let pages = []
  for (let i = Math.max(active - 3, MIN_PAGE); i <= Math.min(active + 4, MAX_PAGE); i++) {
    pages.push(
      <Pagination.Item key={i} active={i === active} onClick={() => setActive(i)}>
        {i}
      </Pagination.Item>
    )
  }
  return (
    <Pagination>
      <Pagination.First onClick={() => setActive(MIN_PAGE)} />
      {pages}
      <Pagination.Last onClick={() => setActive(MAX_PAGE)} />
    </Pagination>
  )
}

export default MyPagination