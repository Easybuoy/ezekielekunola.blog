/* Vendor imports */
import React from 'react'
/* App imports */
import style from './footer.module.less'

const Footer = () => (
  <div className={style.container}>
    <p>&copy; {new Date().getFullYear()} Ezekiel Ekunola; 👨🏾‍💻 by <a href="">Gatsby</a></p>
  </div>
)

export default Footer
