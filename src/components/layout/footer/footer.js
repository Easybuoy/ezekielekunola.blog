/* Vendor imports */
import React from 'react'
/* App imports */
import style from './footer.module.less'

const Footer = () => (
  <div className={style.container}>
    <p>&copy; {new Date().getFullYear()}; 👨🏾‍💻 by Ezekiel Ekunola </p>
    <p> Powered by <a href="https://www.gatsbyjs.org/">Gatsby</a></p>
  </div>
)

export default Footer
