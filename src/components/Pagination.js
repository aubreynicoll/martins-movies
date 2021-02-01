import React, { useState, useEffect } from 'react'
import Pagination from 'react-bootstrap/Pagination'

const MyPagination = ({ items, onChangePage, searchQuery, pageSize = 6}) => {
  const minPage = 1
  const maxPage = Math.ceil(items.length / pageSize)

  const [active, setActive] = useState()
  
  useEffect(() => {
    setActive(1)
  }, [])

  useEffect(() => {
    const pageStartElement = (active - 1) * pageSize
    const pageEndElement = Math.min(pageStartElement + pageSize, items.length)

    onChangePage(
      items.slice(pageStartElement, pageEndElement)
    )
  }, [active, searchQuery])

  let pages = []
  for (let i = Math.max(active - 3, minPage); i <= Math.min(active + 4, maxPage); i++) {
    pages.push(
      <Pagination.Item key={i} active={i === active} onClick={() => setActive(i)}>
        {i}
      </Pagination.Item>
    )
  }
  return (
    <Pagination>
      <Pagination.First onClick={() => setActive(minPage)} />
      {pages}
      <Pagination.Last onClick={() => setActive(maxPage)} />
    </Pagination>
  )
}

export default MyPagination